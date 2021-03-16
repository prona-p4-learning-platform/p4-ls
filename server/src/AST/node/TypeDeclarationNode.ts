import ASTNode from "./ASTNode";

export default abstract class TypeDeclarationNode extends ASTNode {
  constructor(
    public readonly kind: string,
    public readonly identifier: string
  ) {
    super();
  }
}
