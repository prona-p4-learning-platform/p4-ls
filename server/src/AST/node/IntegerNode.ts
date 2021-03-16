import ASTNode from "./ASTNode";

export default class IntegerNode extends ASTNode {
  public readonly kind = "Integer";
  constructor(public readonly value: string) {
    super();
  }
  inferType(): string {
    return "";
  }
}
