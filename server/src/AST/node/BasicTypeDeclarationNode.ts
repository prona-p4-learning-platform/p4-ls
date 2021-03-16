import ASTNode from "./ASTNode";

export default class BasicTypeDeclarationNode extends ASTNode {
  public readonly kind = "BasicTypeDeclarationNode";
  constructor(public readonly identifier: string) {
    super();
  }
}
