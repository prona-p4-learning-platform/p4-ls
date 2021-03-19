import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";
import ScopeNode from "./ScopeNode";

export default class FileNode extends ScopeNode {
  public statements: ASTNode[] = [];
  constructor(subtree: SyntaxNode) {
    super(subtree, "File", null);
  }

  public setStatements(statements: ASTNode[]) {
    this.statements = statements;
    this.children = statements;
  }
}
