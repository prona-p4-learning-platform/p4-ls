import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class BaseTypeNode extends ASTNode {
  public readonly kind = "BaseType";
  constructor(
    syntaxNode: SyntaxNode,
    public readonly type: string,
    public readonly width: ASTNode | null
  ) {
    super(syntaxNode);
  }
}
