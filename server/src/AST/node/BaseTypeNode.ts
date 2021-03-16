import ASTNode from "./ASTNode";

export default class BaseTypeNode extends ASTNode {
  public readonly kind = "BaseType";
  constructor(
    public readonly type: string,
    public readonly width: ASTNode | null
  ) {
    super();
  }
}
