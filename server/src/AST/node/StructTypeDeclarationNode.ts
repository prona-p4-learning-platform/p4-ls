import ASTNode from "./ASTNode";
import TypeDeclarationNode from "./TypeDeclarationNode";

export default class StructTypeDeclaration extends TypeDeclarationNode {
  public constructor(
    public readonly identifier: string,
    public properties: { [key: string]: ASTNode }
  ) {
    super("StructTypeDeclaration", identifier);
  }
}
