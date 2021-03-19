import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import ParameterNode from "./ParameterNode";
import ScopeNode from "./ScopeNode";

export default class ControlDeclarationNode extends ScopeNode {
  public statements: ASTNode[] = [];
  constructor(
    public readonly name: string,
    public readonly parameters: ParameterNode[],
    parentScopeNode: ScopeNode,
    subtree: SyntaxNode
  ) {
    super(subtree, "ControlDeclaration", parentScopeNode);
  }

  public setStatements(statements: ASTNode[]) {
    this.statements = statements;
    this.children = statements;
  }

  toJSON(): object {
    return {
      kind: this.kind,
      children: this.children,
      parameters: this.parameters,
    };
  }
}
