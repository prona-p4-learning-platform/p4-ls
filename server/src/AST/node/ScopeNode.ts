import { SyntaxNode } from "tree-sitter";
import { Position } from "vscode-languageserver";
import ASTNode from "./ASTNode";
import TypeDeclarationNode from "./TypeDeclarationNode";
import VariableDeclarationNode from "./VariableDeclarationNode";

export default abstract class ScopeNode extends ASTNode {
  private declaredTypes = new Map<string, TypeDeclarationNode>();
  private declaredVariables = new Map<string, VariableDeclarationNode>();
  public childScopeNodes: ScopeNode[] = [];
  constructor(
    private syntaxSubtree: SyntaxNode,
    public kind: string,
    private parentScopeNode: ScopeNode | null
  ) {
    super(syntaxSubtree);
    if (parentScopeNode) {
      parentScopeNode.childScopeNodes.push(this);
    }
  }

  addDeclaredType(type: TypeDeclarationNode) {
    this.declaredTypes.set(type.identifier, type);
  }

  addDeclaredVariable(variable: VariableDeclarationNode) {
    this.declaredVariables.set(variable.identifier, variable);
  }

  getDeclaredType(identifier: string): TypeDeclarationNode | null {
    if (this.declaredTypes.has(identifier)) {
      return this.declaredTypes.get(identifier)!;
    }
    return this.parentScopeNode?.getDeclaredType(identifier) || null;
  }

  getDeclaredVariable(identifier: string): VariableDeclarationNode | null {
    if (this.declaredVariables.has(identifier)) {
      return this.declaredVariables.get(identifier)!;
    }
    return this.parentScopeNode?.getDeclaredVariable(identifier) || null;
  }

  getVariableOrTypeForIdentifierAtPos(
    identifier: string,
    pos: Position
  ): TypeDeclarationNode | VariableDeclarationNode | null {
    if (this.containsPosition(pos)) {
      const c = this.childScopeNodes.filter((node) =>
        node.containsPosition(pos)
      );
      if (c.length > 0) {
        const a = c[0].getVariableOrTypeForIdentifierAtPos(identifier, pos);
        if (a !== null) return a;
      }
    }
    if (this.declaredVariables.has(identifier)) {
      return this.getDeclaredVariable(identifier)!;
    }
    if (this.declaredTypes.has(identifier)) {
      return this.getDeclaredType(identifier)!;
    }
    return null;
  }

  getScopeNodeAtPosition(pos: Position): null | ScopeNode {
    if (this.containsPosition(pos)) {
      const c = this.childScopeNodes.filter((node) =>
        node.containsPosition(pos)
      );
      if (c.length > 0) {
        const a = c[0].getScopeNodeAtPosition(pos);
        if (a !== null) return a;
      } else {
        return this;
      }
    }
    return null;
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
