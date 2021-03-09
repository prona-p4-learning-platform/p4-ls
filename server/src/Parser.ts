import Parser, { SyntaxNode } from "tree-sitter";
import { Diagnostic } from "vscode-languageserver";
import ScopeNode, { DeclaredType } from "./node/ScopeNode";
import parse from "./tree-sitter-p4/parse";
import { logInfo } from "./utils/Logger"

const BlockScopeNodeTypes = new Set<string>()
  .add("blockStatement")
  .add("controlDeclaration");

const isBlockScopeNode = (type: string) => BlockScopeNodeTypes.has(type);

type ConstantDeclaration = {
  type: "constantDeclaration";
  declaredType: ASTNode;
  identifier: ASTNode;
  value: ASTNode;
};

type ScopeNode2 = {
  type: "scope";
  syntaxNode: SyntaxNode;
  statements: Array<any>;
};

type Expression = {
  type: "expression";
  value: string;
};

type Identifier = {
  type: "identifier";
  value: string;
};

type BaseType = {
  type: "basetype";
  value: string;
};

type File = {
  type: "file";
  statements: ASTNode[];
};

type ASTNode =
  | ScopeNode2
  | ConstantDeclaration
  | Expression
  | Identifier
  | BaseType
  | File;

export const createAST = (rootNode: Parser.SyntaxNode): ASTNode => {
  function recurse(tree: Parser.SyntaxNode): ASTNode {
    if (tree.type === "constantDeclaration") {
      const child0 = tree.namedChild(0);
      const child1 = tree.namedChild(1);
      const child2 = tree.namedChild(2);
      const returnVal: ConstantDeclaration = {
        type: "constantDeclaration",
        declaredType: recurse(child0!),
        identifier: recurse(child1!),
        value: recurse(child2!),
      };
      return returnVal;
    } else if (tree.type === "source_file") {
      return {
        type: "file",
        statements: tree.namedChildren.map((child) => recurse(child)),
      };
    } else if (tree.type === "baseType") {
      return {
        type: "basetype",
        value: tree.text,
      };
    } else if (tree.type === "name") {
      return {
        type: "identifier",
        value: tree.text,
      };
    } else if (tree.type === "expression") {
      return {
        type: "expression",
        value: tree.text,
      };
    }
    return tree.namedChildren.map((child) => recurse(child))[0];
  }
  return recurse(rootNode);
};

const collectTypesInScopeNodes = (rootNode: Parser.SyntaxNode): ScopeNode => {
  let currentBlockScope = new ScopeNode(null, rootNode);
  currentBlockScope.type = "root";
  function recurse(tree: Parser.SyntaxNode) {
    let updatedScope = false;
    if (isBlockScopeNode(tree.type)) {
      const oldBlockScopeNode = currentBlockScope;
      currentBlockScope = new ScopeNode(currentBlockScope, tree);
      currentBlockScope.type = tree.type;
      oldBlockScopeNode.addChildScopeNode(currentBlockScope);
      updatedScope = true;
    }

    if (tree.type === "constantDeclaration") {
      const child0 = tree.namedChild(0);
      const child1 = tree.namedChild(1);
      if (child1) {
        logInfo(child1.text + "(type: " + currentBlockScope.type + ")");
        currentBlockScope.addDeclaredType({
          type: "constant",
          identifier: child1.text,
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
  logInfo(JSON.stringify(createAST(parseTreeRoot.rootNode)));
  return {
    scopeTreeRoot,
    parseTreeRoot: parseTreeRoot.rootNode,
  };
}
