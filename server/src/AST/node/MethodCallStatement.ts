import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class MethodCallStatement extends ASTNode {
  public readonly kind = "MethodCallStatement";
  constructor(
    subtree: SyntaxNode,
    public readonly callee: ASTNode,
    public readonly parameters: ASTNode[]
  ) {
    super(subtree);
  }
  inferType(): string {
    return "";
  }
}
