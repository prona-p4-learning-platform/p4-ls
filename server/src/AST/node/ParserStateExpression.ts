import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class ParserStateExpression extends ASTNode {
  public readonly kind = "ParserStateExpression";
  constructor(subtree: SyntaxNode) {
    super(subtree);
  }
}
