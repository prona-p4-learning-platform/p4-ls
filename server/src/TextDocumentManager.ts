import {
  Definition,
  Position,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import ScopeNode from "./node/ScopeNode";
import { parseSource } from "./Parser";
import Parser from "tree-sitter";
export default class TextDocumentManager {
  private documents = new Map<string, TextDocument>();
  private scopeRepresentation = new Map<string, ScopeNode>();
  private parseTree = new Map<string, Parser.SyntaxNode>();

  update(textDocument: TextDocument) {
    const { uri } = textDocument;
    const { parseTreeRoot, scopeTreeRoot } = parseSource(
      textDocument.getText()
    );
    this.scopeRepresentation.set(uri, scopeTreeRoot);
    this.parseTree.set(uri, parseTreeRoot);
    if (this.documents.has(uri) === false) {
      this.documents.set(uri, textDocument);
    }
  }

  private rangeFromNode(node: Parser.SyntaxNode): Range {
    return {
      start: {
        line: node.startPosition.row,
        character: node.startPosition.column,
      },
      end: {
        line: node.startPosition.row,
        character: node.startPosition.column,
      },
    };
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

  provideDefinition(
    _textDocumentPosition: TextDocumentPositionParams
  ): Definition {
    const doc = this.documents.get(_textDocumentPosition.textDocument.uri);
    const node = this.getNodeAtPosition(
      _textDocumentPosition.position,
      _textDocumentPosition.textDocument.uri
    );
    if (node) {
      console.log("Found identifier to provide definition for: " + node.text);
      const rootScope = this.scopeRepresentation.get(
        _textDocumentPosition.textDocument.uri
      );
      const definitionNode = rootScope!.findClosestDefinitionForIdentifier(
        node.text,
        _textDocumentPosition.position
      );
      if (definitionNode) {
        return {
          uri: doc!.uri,
          range: {
            start: {
              line: definitionNode.startPosition.row,
              character: definitionNode.endPosition.column,
            },
            end: {
              line: definitionNode.endPosition.row,
              character: definitionNode.endPosition.column,
            },
          },
        };
      }
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
}