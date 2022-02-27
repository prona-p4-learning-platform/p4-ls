import Parser from "tree-sitter";
import parse from "../parse";
import { TreeCursor, SyntaxType, SyntaxNode } from "../tree-sitter-p4";
import { BitType } from "./types/BitType";
import { HeaderType } from "./types/HeaderType";
import { Type } from "./types/Type";
import { TypeRef } from "./types/TypeRef";
import { Diagnostic } from "vscode-languageserver";

function* walk(
  cursor: TreeCursor
): Generator<{ retracing: boolean; node: SyntaxNode }> {
  let reachedRoot = false;
  let retracing = false;
  while (reachedRoot === false) {
    yield { retracing, node: cursor.currentNode };

    if (cursor.gotoFirstChild()) {
      continue;
    }
    if (cursor.gotoNextSibling()) {
      continue;
    }
    retracing = true;
    while (retracing) {
      if (!cursor.gotoParent()) {
        retracing = false;
        reachedRoot = true;
      }
      if (cursor.gotoNextSibling()) {
        retracing = false;
      }
    }
  }
}

function analyse(rootNode: Parser.Tree, diagnostics: Diagnostic[]) {
  let knownTypes = new Map<string, Type>();
  let currentType: Type | undefined = undefined;
  let currentTypeName: string = "";
  for (const node of walk(rootNode.walk() as TreeCursor)) {
    if (node.isNamed) {
      console.log(node.type);
    }
    switch (node.type) {
      case SyntaxType.TypedefDeclaration:
        currentTypeName = node.namedChild(1)!.text;
        break;
      case SyntaxType.BitWithIntegerWidth:
        const type = new BitType(Number.parseInt(node.widthNode.text, 10));
        if (currentType instanceof HeaderType) {
          currentType.setNextFieldType(type);
        } else {
          knownTypes.set(currentTypeName, type);
        }
        break;
      case SyntaxType.HeaderTypeDeclaration:
        const header = new HeaderType();
        currentType = header;
        knownTypes.set(node.nameNode.text, currentType);
        break;
      case SyntaxType.StructTypeDeclaration:
        break;
      case SyntaxType.TypeName:
        if (currentType && currentType instanceof HeaderType) {
          const referencedType = knownTypes.get(node.text);
          if (referencedType) {
            currentType.setNextFieldType(new TypeRef(referencedType));
          }
        }
        break;
      case SyntaxType.StructField:
        if (currentType && currentType instanceof HeaderType) {
          currentType.setNextFieldName(node.nameNode.text);
        }
        break;
      case SyntaxType.ERROR:
        diagnostics.push({
          range: {
            start: {
              line: node.startPosition.row,
              character: node.startPosition.column,
            },
            end: { line: 2, character: 4 },
          },
          message: "Syntax error",
        });
        break;
      case SyntaxType.TypeName: {
        break;
      }
      default:
        break;
    }
  }
  return { rootNode };
}

export const walker = (code: string): { diagnostics: []; tree: object } => {
  const rootNode = parse(code);

  analyse(rootNode, []);
  return { diagnostics: [], tree: rootNode };
};
