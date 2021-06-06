import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class CommentNode extends ASTNode {
  public readonly kind = "CommentNode";
  constructor(syntaxNode: SyntaxNode, public readonly comment: string) {
    super(syntaxNode);
  }
}
