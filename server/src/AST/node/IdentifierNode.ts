import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class IdentifierNode extends ASTNode {
  public readonly kind = "Identifier";
  constructor(subtree: SyntaxNode, public readonly identifier: string) {
    super(subtree);
  }
}
