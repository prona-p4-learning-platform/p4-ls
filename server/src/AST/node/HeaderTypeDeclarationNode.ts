import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import TypeDeclarationNode from "./TypeDeclarationNode";

export default class HeaderTypeDeclaration extends TypeDeclarationNode {
  public constructor(
    subtree: SyntaxNode,
    public readonly identifier: string,
    public properties: { [key: string]: ASTNode }
  ) {
    super(subtree, "HeaderTypeDeclaration", identifier);
  }
}
