import { SyntaxNode } from "tree-sitter";
import { Position } from "vscode-languageserver";

type DeclaredConstantType = {
  type: "constant";
  identifier: string;
  node: SyntaxNode;
};

type DeclaredHeaderOrStructType = {
  type: "header" | "struct";
  identifier: string;
  structFields: { [key: string]: string };
  node: SyntaxNode;
};

export type DeclaredType = DeclaredHeaderOrStructType | DeclaredConstantType;

export default class ScopeNode {
  private declaredTypes = new Map<string, DeclaredType>();
  private childScopeNodes: ScopeNode[] = [];
  public type: string = "";
  constructor(
    private parentScopeNode: ScopeNode | null,
    private syntaxSubtree: SyntaxNode
  ) {}

  addDeclaredType(type: DeclaredType) {
    this.declaredTypes.set(type.identifier, type);
  }

  addDeclaredVariable(identifier: string, type: DeclaredType) {}

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

  resolveType(identifier: string): DeclaredType | null {
    if (this.declaredTypes.has(identifier)) {
      return this.declaredTypes.get(identifier) as DeclaredType;
    }
    if (this.parentScopeNode) {
      return this.parentScopeNode.resolveType(identifier);
    }
    return null;
  }

  getParentScopeNode() {
    return this.parentScopeNode;
  }

  addChildScopeNode(child: ScopeNode) {
    this.childScopeNodes.push(child);
  }

  findClosestDefinitionForIdentifier(
    identifier: string,
    position: Position
  ): SyntaxNode | null {
    let currentCandidate: SyntaxNode | null = null;
    const scopes = this.childScopeNodes.filter((node) =>
      node.containsPosition(position)
    );

    if (scopes.length > 0) {
      const resolvedType = scopes[0].resolveType(identifier);
      currentCandidate = resolvedType === null ? null : resolvedType.node;
    } else {
      const resolvedType = this.resolveType(identifier);
      if (resolvedType) {
        currentCandidate = resolvedType.node;
      }
    }

    return currentCandidate;
  }

  toJSON(): any {
    return {
      declaredTypes: [...this.declaredTypes.entries()].map((entry) => entry[0]),
      children: this.childScopeNodes.map((node) => node.toJSON()),
    };
  }
}
