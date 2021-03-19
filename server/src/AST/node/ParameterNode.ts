import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import VariableDeclarationNode from "./VariableDeclarationNode";

export default class ParameterNode extends VariableDeclarationNode {
  public readonly kind = "ParameterNode";
  constructor(
    subtree: SyntaxNode,
    public readonly type: ASTNode,
    public readonly identifier: string
  ) {
    super(subtree, identifier);
  }
}
