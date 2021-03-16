import ASTNode from "./ASTNode";

export default class ConstantDeclaration extends ASTNode {
  public readonly kind = "ConstantDeclaration";
  constructor(
    public readonly type: ASTNode,
    public readonly identifier: string,
    public readonly value: ASTNode
  ) {
    super();
  }
}
