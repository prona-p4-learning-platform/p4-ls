import ASTNode from "./ASTNode";

export default class AssignmentStatement extends ASTNode {
  constructor(public readonly lhs: ASTNode, public readonly rhs: ASTNode) {
    super();
  }
}
