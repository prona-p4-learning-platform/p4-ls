import { SyntaxNode } from "tree-sitter";
import { Position } from "vscode-languageserver-textdocument";

export default class ASTNode {
  public children: ASTNode[] = [];
  public parent: ASTNode = this;
  public kind: string = this.constructor.name;
  public startPosition: Position;
  public endPosition: Position;

  constructor(private syntaxNode: SyntaxNode) {
    this.startPosition = {
      line: syntaxNode.startPosition.row,
      character: syntaxNode.startPosition.column,
    };
    this.endPosition = {
      line: syntaxNode.endPosition.row,
      character: syntaxNode.endPosition.column,
    };
  }

  addChildren(children: ASTNode[]) {
    this.children = [...this.children, ...children];
  }

  toJSON(): object {
    const { parent, syntaxNode, ...rest } = this;
    return rest;
  }

  text(): string {
    return this.syntaxNode.text;
  }
}
