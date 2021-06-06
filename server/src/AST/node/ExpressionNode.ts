import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class ExpressionNode extends ASTNode {
  public readonly kind = "Expression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}

export class SubstrationExpression extends ASTNode {
  public readonly kind = "SubstrationExpression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}

export class MultiplicationExpression extends ASTNode {
  public readonly kind = "MultiplicationExpression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}

export class AdditionExpression extends ASTNode {
  public readonly kind = "AdditionExpression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}

export class DivisionExpression extends ASTNode {
  public readonly kind = "DivisionExpression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}
export class PropertyAccessExpression extends ASTNode {
  public readonly kind = "PropertyAccessExpression";
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}
