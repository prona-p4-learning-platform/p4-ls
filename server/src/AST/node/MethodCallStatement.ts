import ASTNode from "./ASTNode";

export default class MethodCallStatement extends ASTNode {
  public readonly kind = "MethodCallStatement";
  constructor(
    public readonly callee: ASTNode,
    public readonly parameters: ASTNode[]
  ) {
    super();
  }
  inferType(): string {
    return "";
  }
}
