import { SyntaxNode } from "tree-sitter";
import ASTNode from "./ASTNode";

export default class ParserStateNode extends ASTNode {
  public statements: ASTNode[] = [];
  constructor(public readonly name: string, subtree: SyntaxNode) {
    super(subtree);
  }

  public setStatements(statements: ASTNode[]) {
    this.statements = statements;
    this.children = statements;
  }

  toJSON(): object {
    return {
      name: this.name,
      kind: this.kind,
      children: this.children,
    };
  }
}
