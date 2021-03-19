import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class AssignmentStatement extends ASTNode {
  constructor(
    subtree: SyntaxNode,
    public readonly lhs: ASTNode,
    public readonly rhs: ASTNode
  ) {
    super(subtree);
  }
}
