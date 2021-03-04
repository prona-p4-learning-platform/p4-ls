import { Hover, HoverParams } from "vscode-languageserver";
import type TextDocumentManager from "./TextDocumentManager";

export default (docManager: TextDocumentManager) => (
  _textDocumentPosition: HoverParams
): Hover => {
  const result = docManager.provideHover(_textDocumentPosition);
  return result;
};
