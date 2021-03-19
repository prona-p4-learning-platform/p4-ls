import {
  CompletionItem,
  Definition,
  Diagnostic,
  Hover,
  Position,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import ScopeNode from "./AST/node/ScopeNode";
import { parseSource } from "./Parser";
import Parser, { SyntaxNode } from "tree-sitter";
import TypeDeclarationNode from "./AST/node/TypeDeclarationNode";
import VariableDeclarationNode from "./AST/node/VariableDeclarationNode";

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
    const node = this.getNodeAtPosition(
      _textDocumentPosition.position,
      _textDocumentPosition.textDocument.uri
    );
    if (node) {
      const sibling = node.previousNamedSibling;
    }
    return [];
  }
}
