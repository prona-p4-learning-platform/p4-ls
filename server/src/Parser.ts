import Parser from "tree-sitter";
import ScopeNode from "./AST/node/ScopeNode";
import parse from "./tree-sitter-p4/parse";
import { createAST } from "./AST/ParseTreeToAST";

export function parseSource(
  source: string
): { scopeTreeRoot: ScopeNode; parseTreeRoot: Parser.SyntaxNode } {
  const parseTreeRoot = parse(source);
  const scopeTreeRoot = createAST(parseTreeRoot.rootNode);
  return {
    scopeTreeRoot: scopeTreeRoot as ScopeNode,
    parseTreeRoot: parseTreeRoot.rootNode,
  };
}
