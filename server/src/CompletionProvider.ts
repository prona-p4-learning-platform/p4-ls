import {
  CompletionItem,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import type TextDocumentManager from "./TextDocumentManager";

export default (docManager: TextDocumentManager) => (
  _textDocumentPosition: TextDocumentPositionParams
): CompletionItem[] => {
  return docManager.provideCompletion(_textDocumentPosition);
  //return docManager.provideCompletion(_textDocumentPosition);
};
