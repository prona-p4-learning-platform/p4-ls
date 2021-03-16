import ASTNode from "./ASTNode";

export default class IdentifierNode extends ASTNode {
  public readonly kind = "Identifier";
  constructor(public readonly identifier: string) {
    super();
  }
}
