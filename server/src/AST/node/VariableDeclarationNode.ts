import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class VariableDeclarationNode extends ASTNode {
  constructor(
    subtree: SyntaxNode,
    public identifier: string,
    public type: string
  ) {
    super(subtree);
  }
}
