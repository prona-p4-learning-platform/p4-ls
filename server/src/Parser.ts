import Parser from "tree-sitter";
import ScopeNode, { DeclaredType } from "./node/ScopeNode";
import parse from "./tree-sitter-p4/parse";

const BlockScopeNodeTypes = new Set<string>()
  .add("blockStatement")
  .add("controlDeclaration");

const isBlockScopeNode = (type: string) => BlockScopeNodeTypes.has(type);

const collectTypesInScopeNodes = (rootNode: Parser.SyntaxNode): ScopeNode => {
  let currentBlockScope = new ScopeNode(null, rootNode);
  function recurse(tree: Parser.SyntaxNode) {
    let updatedScope = false;
    if (isBlockScopeNode(tree.type)) {
      const oldBlockScopeNode = currentBlockScope;
      currentBlockScope = new ScopeNode(currentBlockScope, tree);
      oldBlockScopeNode.addChildScopeNode(currentBlockScope);
      updatedScope = true;
    }
    if (tree.type === "constantDeclaration") {
      const child0 = tree.namedChild(0);
      const child1 = tree.namedChild(1);
      if (child0 && child1) {
        currentBlockScope.addDeclaredVariable({
          identifier: child1.text,
          type: child0.text,
          node: tree,
        });
      }
    } else if (tree.type === "typedefDeclaration") {
      const child1 = tree.namedChild(1);
      if (child1) {
        currentBlockScope.addDeclaredType({
          type: "constant",
          identifier: child1.text,
          node: tree,
        });
      }
    } else if (tree.type === "headerTypeDeclaration") {
      const child = tree.namedChild(0);
      const structFields = tree.descendantsOfType("structField");
      if (child) {
        const test: DeclaredType = {
          type: "header",
          identifier: child.text,
          structFields: structFields.reduce(
            (obj, node) => ({
              ...obj,
              [node.namedChild(0)!.text]: node.namedChild(1)!.text,
            }),
            {}
          ),
          node: tree,
        };
        currentBlockScope.addDeclaredType(test);
      }
    } else if (tree.type === "structTypeDeclaration") {
      const child = tree.namedChild(0);
      const structFields = tree.descendantsOfType("structField");
      if (child) {
        const test: DeclaredType = {
          type: "struct",
          identifier: child.text,
          structFields: structFields.reduce(
            (obj, node) => ({
              ...obj,
              [node.namedChild(0)!.text]: node.namedChild(1)!.text,
            }),
            {}
          ),
          node: tree,
        };
        currentBlockScope.addDeclaredType(test);
      }
    } else if (tree.type === "ERROR") {
    } else if (tree.type === "parameter") {
      const child0 = tree.namedChild(0);
      const child1 = tree.namedChild(1);
      if (child1) {
        currentBlockScope.addDeclaredType({
          type: "constant",
          identifier: child1.text,
          node: tree,
        });
      }
    }
    tree.namedChildren.forEach((n) => recurse(n));

    if (updatedScope === true) {
      const parent = currentBlockScope.getParentScopeNode();
      if (parent) {
        currentBlockScope = parent;
      }
    }
  }
  recurse(rootNode);

  return currentBlockScope;
};

export function parseSource(
  source: string
): { scopeTreeRoot: ScopeNode; parseTreeRoot: Parser.SyntaxNode } {
  const parseTreeRoot = parse(source);
  const scopeTreeRoot = collectTypesInScopeNodes(parseTreeRoot.rootNode);
  return {
    scopeTreeRoot,
    parseTreeRoot: parseTreeRoot.rootNode,
  };
}
