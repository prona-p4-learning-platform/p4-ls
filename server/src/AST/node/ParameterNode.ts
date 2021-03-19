import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class ParameterNode extends ASTNode {
  public readonly kind = "ParameterNode";
  constructor(
    subtree: SyntaxNode,
    public readonly type: ASTNode,
    public readonly identifier: string
  ) {
    super(subtree);
  }
}
