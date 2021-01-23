import Parser from "tree-sitter";
import { Diagnostic, Range } from 'vscode-languageserver';
import parse from './tree-sitter-p4/parse'

function rangeFromNode(node: Parser.SyntaxNode): Range {
	return {
	  start: {
		line: node.startPosition.row,
		character: node.startPosition.column,
	  },
	  end: {
		line: node.startPosition.row,
		character: node.startPosition.column,
	  }
	}
  }
  
  const findAllTypes = (tree: Parser.SyntaxNode, diagnostics: Diagnostic[]): Diagnostic[] => {
	if (tree.type === "constantDeclaration") {
	  const child1 = tree.namedChild(1)
	  if (child1) {
		diagnostics.push({
		  message: 'that is a type identifier!',
		  range: rangeFromNode(child1)
		})
	  }
  
	} else if (tree.type === "typedefDeclaration") {
	  const child1 = tree.namedChild(1);
	  if (child1)
		diagnostics.push({
		  message: 'that is a type identifier!',
		  range: rangeFromNode(child1)
		})
	} else if (tree.type === "headerTypeDeclaration"){
	  const structFieldNames = tree.descendantsOfType("name");
	  structFieldNames.forEach((node) => {
		diagnostics.push({
		  message: 'that is a header member name!',
		  range: rangeFromNode(node)
		})
	  })
	}
	tree.namedChildren.forEach((n) => findAllTypes(n, diagnostics));
	return diagnostics
  };

  export function parseSource(source: string): Diagnostic[] {
	const result = parse(source)
	return findAllTypes(result.rootNode, [])
  }