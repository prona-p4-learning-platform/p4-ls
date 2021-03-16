import ASTNode from "./ASTNode";

export default class ExpressionNode extends ASTNode {
  public readonly kind = "Expression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}

export class SubstrationExpression extends ASTNode {
  public readonly kind = "SubstrationExpression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}

export class MultiplicationExpression extends ASTNode {
  public readonly kind = "MultiplicationExpression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}

export class AdditionExpression extends ASTNode {
  public readonly kind = "AdditionExpression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}

export class DivisionExpression extends ASTNode {
  public readonly kind = "DivisionExpression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}
export class PropertyAccessExpression extends ASTNode {
  public readonly kind = "PropertyAccessExpression";
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}
