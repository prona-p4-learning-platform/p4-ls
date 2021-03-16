import { SyntaxNode } from "tree-sitter";
import { Position } from "vscode-languageserver";
import ConstantDeclarationNode from "./ConstantDeclarationNode";
import ASTNode from "./ASTNode";
import TypeDeclarationNode from "./TypeDeclarationNode";

export type DeclaredVariable = ConstantDeclarationNode;

export default abstract class ScopeNode extends ASTNode {
  private declaredTypes = new Map<string, TypeDeclarationNode>();
  private declaredVariables = new Map<string, DeclaredVariable>();
  private childScopeNodes: ScopeNode[] = [];
  constructor(
    public kind: string,
    private parentScopeNode: ScopeNode | null,
    private syntaxSubtree: SyntaxNode
  ) {
    super();
  }

  addDeclaredType(type: TypeDeclarationNode) {
    this.declaredTypes.set(type.identifier, type);
  }

  addDeclaredVariable(variable: DeclaredVariable) {
    this.declaredVariables.set(variable.identifier, variable);
  }

  getDeclaredType(identifier: string) {
    return this.declaredTypes.get(identifier);
  }

  containsPosition(position: Position): boolean {
    const { startPosition, endPosition } = this.syntaxSubtree;
    if (
      startPosition.row <= position.line &&
      endPosition.row >= position.line
    ) {
      if (
        startPosition.row === position.line &&
        startPosition.column > position.character
      ) {
        return false;
      }
      if (
        endPosition.row === position.line &&
        endPosition.column < position.character
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  getParentScopeNode() {
    return this.parentScopeNode;
  }

  addChildScopeNode(child: ScopeNode) {
    this.childScopeNodes.push(child);
  }

  toJSON(): object {
    return { kind: this.kind, children: this.children };
  }
}
