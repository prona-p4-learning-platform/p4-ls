import ASTNode from "./ASTNode";

export default class ParameterNode extends ASTNode {
  public readonly kind = "ParameterNode";
  constructor(
    public readonly type: ASTNode,
    public readonly identifier: string
  ) {
    super();
  }
}
