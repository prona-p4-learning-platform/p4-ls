import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class IntegerNode extends ASTNode {
  public readonly kind = "Integer";
  constructor(subtree: SyntaxNode, public readonly value: string) {
    super(subtree);
  }
  inferType(): string {
    return "";
  }
}
