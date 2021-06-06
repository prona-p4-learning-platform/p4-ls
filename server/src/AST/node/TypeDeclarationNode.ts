import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default abstract class TypeDeclarationNode extends ASTNode {
  constructor(
    subtree: SyntaxNode,
    public readonly kind: string,
    public readonly identifier: string
  ) {
    super(subtree);
  }
}
