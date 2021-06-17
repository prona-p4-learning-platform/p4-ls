import { Diagnostic } from "vscode-languageserver";
import parse from "../../../tree-sitter-p4/parse";
import * as g from "../tree-sitter-p4";

interface TypeCollector {
  types: Set<string>;
  variables: Set<string>;
  parentScope: TypeCollector | null;
}

interface WalkContext {
  diagnostics: Diagnostic[];
  depth: number;
  types: TypeCollector;
}

function walk(cursor: g.TreeCursor, context: WalkContext): Object {
  if (cursor.nodeIsNamed) {
    console.log(" ".repeat(context.depth) + cursor.nodeType);
  }
  const node = cursor.currentNode;
  if (node.type === g.SyntaxType.ControlDeclaration) {
    context.types = {
      variables: new Set([...context.types.variables]),
      parentScope: context.types,
      types: new Set([...context.types.types]),
    };
    const current = {
      type: "controlDeclaration",
      parameters: node.parameterListNode.children.map((child) =>
        walk(child.walk(), { ...context, depth: context.depth + 2 })
      ),
      actions: node.localDeclarationsNodes.map((child) =>
        walk(child.walk(), { ...context, depth: context.depth + 2 })
      ),
      apply: walk(node.applyBlockNode.walk(), {
        ...context,
        depth: context.depth + 2,
      }),
    };
    if (context.types.parentScope) {
      context.types = context.types.parentScope;
    }
    return current;
  } else if (node.type === g.SyntaxType.Parameter) {
    if (context.types.types.has(node.typeRefNode.text) === false) {
      context.diagnostics.push({
        message: "This type is not defined",
        range: {
          start: {
            line: node.startPosition.row,
            character: node.startPosition.column,
          },
          end: {
            line: node.endPosition.row,
            character: node.endPosition.column,
          },
        },
      });
    }
    return {
      type: "param",
      name: node.nameNode.text,
      typeRef: node.typeRefNode.text,
    };
  } else if (node.type === g.SyntaxType.ActionDeclaration) {
    context.types = {
      variables: new Set([...context.types.variables]),
      parentScope: context.types,
      types: new Set([...context.types.types]),
    };
    const a = {
      type: "action",
      name: node.nameNode.text,
      parameters: node.parameterListNode
        ? node.parameterListNode.children.map((child) =>
            walk(child.walk(), { ...context, depth: context.depth + 2 })
          )
        : [],
    };
    if (context.types.parentScope) {
      context.types = context.types.parentScope;
    }
    return a;
  } else if (node.type === g.SyntaxType.StructTypeDeclaration) {
    context.types.types.add(node.nameNode.text);
    return {
      type: "struct",
      name: node.nameNode.text,
      members: node.structFieldsNodes.map((child) =>
        walk(child.walk(), { ...context, depth: context.depth + 2 })
      ),
    };
  } else if (node.type === g.SyntaxType.StructField) {
    return {
      type: "structField",
      name: node.nameNode.text,
      fieldType: node.typeRefNode.text,
    };
  } else {
    const current: { type: string; children: object[] } = {
      children: [],
      type: "unhandled",
    };
    current.children = [];
    if (cursor.gotoFirstChild()) {
      const node = walk(cursor.currentNode.walk(), {
        ...context,
        depth: context.depth + 2,
      });
      if (node) {
        current.children.push(node);
      }
      while (cursor.gotoNextSibling()) {
        const node = walk(cursor.currentNode.walk(), {
          ...context,
          depth: context.depth + 2,
        });
        if (node) {
          current.children.push(node);
        }
      }
    }
    return current;
  }
}

export const createAST = (
  code: string
): Pick<WalkContext, "diagnostics"> & { tree: object } => {
  const rootNode = parse(code);
  const context = {
    diagnostics: [],
  };
  const tree = walk(rootNode.walk() as g.TreeCursor, {
    depth: 0,
    diagnostics: context.diagnostics,
    types: { types: new Set(), parentScope: null, variables: new Set() },
  });
  return { ...context, tree };
};
