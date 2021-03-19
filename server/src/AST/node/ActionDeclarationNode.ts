import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import ConstantDeclaration from "./ConstantDeclarationNode";
import ParameterNode from "./ParameterNode";
import ScopeNode from "./ScopeNode";

export default class ActionDeclarationNode extends ScopeNode {
  public statements: ASTNode[] = [];
  constructor(
    public readonly name: string,
    public readonly parameters: ParameterNode[],
    parentScopeNode: ScopeNode,
    subtree: SyntaxNode
  ) {
    super(subtree, "ActionDeclarationNode", parentScopeNode);
    parameters.forEach((param) => this.addDeclaredVariable(param));
  }

  public setStatements(statements: ASTNode[]) {
    this.statements = statements;
  }
}
