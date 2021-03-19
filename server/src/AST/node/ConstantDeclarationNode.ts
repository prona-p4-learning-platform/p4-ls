import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import VariableDeclarationNode from "./VariableDeclarationNode";

export default class ConstantDeclaration extends VariableDeclarationNode {
  public readonly kind = "ConstantDeclaration";
  constructor(
    syntaxNode: SyntaxNode,
    public readonly type: ASTNode,
    public readonly identifier: string,
    public readonly value: ASTNode
  ) {
    super(syntaxNode);
  }
}
