import {
  CompletionItem,
  Definition,
  Diagnostic,
  Hover,
  Position,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import ScopeNode from "./AST/node/ScopeNode";
import { parseSource } from "./Parser";
import Parser, { SyntaxNode } from "tree-sitter";
import TypeDeclarationNode from "./AST/node/TypeDeclarationNode";
import VariableDeclarationNode from "./AST/node/VariableDeclarationNode";
import StructTypeDeclaration from "./AST/node/StructTypeDeclarationNode";
import HeaderTypeDeclaration from "./AST/node/HeaderTypeDeclarationNode";
import ASTNode from "./AST/node/ASTNode";

const nodeToDiagnostic = (node: SyntaxNode): Diagnostic => ({
  message: "test",
  range: {
    start: {
      line: node.startPosition.row,
      character: node.startPosition.column,
    },
    end: { line: node.endPosition.row, character: node.endPosition.column },
  },
});

export default class TextDocumentManager {
  private documents = new Map<string, TextDocument>();
  private scopeRepresentation = new Map<string, ScopeNode>();
  private parseTree = new Map<string, Parser.SyntaxNode>();

  update(textDocument: TextDocument): Diagnostic[] {
    const { uri } = textDocument;
    const { parseTreeRoot, scopeTreeRoot } = parseSource(
      textDocument.getText()
    );
    this.scopeRepresentation.set(uri, scopeTreeRoot);
    this.parseTree.set(uri, parseTreeRoot);
    if (this.documents.has(uri) === false) {
      this.documents.set(uri, textDocument);
    }
    const a = [
      ...parseTreeRoot.descendantsOfType("ERROR").map(nodeToDiagnostic),
    ];
    return a;
  }

  private getNodeAtPosition(
    position: Position,
    uri: string
  ): Parser.SyntaxNode | undefined {
    const parseTree = this.parseTree.get(uri);
    return parseTree?.descendantForPosition({
      row: position.line,
      column: position.character,
    });
  }

  private getScopeNodeAtPosition(position: TextDocumentPositionParams) {
    const rootScope = this.scopeRepresentation.get(position.textDocument.uri);
    if (rootScope) {
      const scope = rootScope.getScopeNodeAtPosition(position.position);
      return scope;
    }
    return null;
  }

  private getNodeForIdentifierAtPosition(
    _textDocumentPosition: TextDocumentPositionParams
  ) {
    const node = this.getNodeAtPosition(
      _textDocumentPosition.position,
      _textDocumentPosition.textDocument.uri
    );
    if (node) {
      const rootScope = this.scopeRepresentation.get(
        _textDocumentPosition.textDocument.uri
      );
      const definitionNode = rootScope!.getVariableOrTypeForIdentifierAtPos(
        node.text,
        _textDocumentPosition.position
      );
      if (definitionNode) {
        return definitionNode;
      }
    }
  }

  provideDefinition(
    _textDocumentPosition: TextDocumentPositionParams
  ): Definition {
    const doc = this.documents.get(_textDocumentPosition.textDocument.uri);
    const definitionNode = this.getNodeForIdentifierAtPosition(
      _textDocumentPosition
    );
    if (definitionNode) {
      if (definitionNode instanceof VariableDeclarationNode) {
        return {
          uri: doc!.uri,
          range: {
            start: definitionNode.startPosition,
            end: definitionNode.endPosition,
          },
        };
      }
      return {
        uri: doc!.uri,
        range: {
          start: definitionNode.startPosition,
          end: definitionNode.endPosition,
        },
      };
    }
    const range = {
      start: doc!.positionAt(0),
      end: doc!.positionAt(0),
    };

    return {
      uri: doc!.uri,
      range,
    };
  }

  provideHover(_textDocumentPosition: TextDocumentPositionParams): Hover {
    const definitionNode = this.getNodeForIdentifierAtPosition(
      _textDocumentPosition
    );
    if (definitionNode) {
      if (definitionNode instanceof TypeDeclarationNode) {
        return {
          contents: { language: "P4", value: definitionNode.text() },
        };
      } else if (definitionNode instanceof VariableDeclarationNode) {
        return {
          contents: { language: "P4", value: definitionNode.text() },
        };
      }
    }
    return { contents: "" };
  }

  provideCompletion(
    _textDocumentPosition: TextDocumentPositionParams
  ): CompletionItem[] {
    const posNew: Position = {
      line: _textDocumentPosition.position.line,
      character: _textDocumentPosition.position.character - 1,
    };
    const node = this.getNodeAtPosition(
      posNew,
      _textDocumentPosition.textDocument.uri
    );
    if (node) {
      const closestError = node.closest("ERROR");
      if (closestError) {
        const text = closestError.text;
        const split = text.split(".").reverse();
        const scopeNode = this.getScopeNodeAtPosition(_textDocumentPosition);
        if (scopeNode) {
          let type: ASTNode | null;
          let variable = scopeNode?.getDeclaredVariable(split.pop()!);
          type = scopeNode.getDeclaredType(variable!.type);
          while (split.length > 0) {
            if (
              type instanceof StructTypeDeclaration ||
              type instanceof HeaderTypeDeclaration
            ) {
              const c = split.pop()!;
              if (type.properties[c]) {
                type = scopeNode.getDeclaredType(type.properties[c].text());
              }
            } else {
              split.pop();
            }
          }
          if (
            type instanceof StructTypeDeclaration ||
            type instanceof HeaderTypeDeclaration
          ) {
            return Object.keys(type.properties).map((t) => ({ label: t }));
          }
        }
      }
    }
    return [];
  }
}
