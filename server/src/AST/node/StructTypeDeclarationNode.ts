import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import TypeDeclarationNode from "./TypeDeclarationNode";

export default class StructTypeDeclaration extends TypeDeclarationNode {
  public constructor(
    subtree: SyntaxNode,
    public readonly identifier: string,
    public properties: { [key: string]: ASTNode }
  ) {
    super(subtree, "StructTypeDeclaration", identifier);
  }
}
