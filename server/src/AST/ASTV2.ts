import Parser from "tree-sitter";
import * as P4Parser from "../tree-sitter-p4/P4Parser";
import parse from "../tree-sitter-p4/parse";
import code from "./code";

function gotoPreorderSucc(cursor: P4Parser.TreeCursor): boolean {
  if (cursor.gotoFirstChild()) return true;
  while (!cursor.gotoNextSibling()) {
    if (!cursor.gotoParent()) {
      return false;
    }
  }
  return true;
}

const tree = parse(code) as P4Parser.Tree;

function printDeclaredNames() {
  let cursor = tree.walk();

  do {
    const c = cursor as P4Parser.TypedTreeCursor;
    switch (c.nodeType) {
      case P4Parser.SyntaxType.ConstantDeclaration: {
        let node = c.currentNode;
        break;
      }
      case P4Parser.SyntaxType.StructTypeDeclaration:
        break;
    }
  } while (gotoPreorderSucc(cursor));
}
printDeclaredNames();
