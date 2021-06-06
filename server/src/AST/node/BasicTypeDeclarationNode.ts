import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class BasicTypeDeclarationNode extends ASTNode {
  public readonly kind = "BasicTypeDeclarationNode";
  constructor(syntaxNode: SyntaxNode, public readonly identifier: string) {
    super(syntaxNode);
  }
}
