import Parser from "tree-sitter";
import ActionDeclarationNode from "./node/ActionDeclarationNode";
import AssignmentStatement from "./node/AssignmentStatement";
import ASTNode from "./node/ASTNode";
import BaseTypeNode from "./node/BaseTypeNode";
import ConstantDeclarationNode from "./node/ConstantDeclarationNode";
import ControlDeclarationNode from "./node/ControlDeclarationNode";
import ExpressionNode, {
  AdditionExpression,
  DivisionExpression,
  MultiplicationExpression,
  PropertyAccessExpression,
  SubstrationExpression,
} from "./node/ExpressionNode";
import FileNode from "./node/FileNode";
import HeaderTypeDeclarationNode from "./node/HeaderTypeDeclarationNode";
import IdentifierNode from "./node/IdentifierNode";
import IntegerNode from "./node/IntegerNode";
import MethodCallStatement from "./node/MethodCallStatement";
import ParameterNode from "./node/ParameterNode";
import ParserDeclarationNode from "./node/ParserDeclarationNode";
import ParserStateNode from "./node/ParserStateNode";
import ScopeNode from "./node/ScopeNode";
import StructTypeDeclarationNode from "./node/StructTypeDeclarationNode";
import ParserStateExpression from "./node/ParserStateExpression";
import CommentNode from "./node/CommentNode";

export const createAST = (rootNode: Parser.SyntaxNode): ASTNode => {
  let currentScopeNode: ScopeNode;

  function recurse(tree: Parser.SyntaxNode): ASTNode {
    if (tree === null) {
      return new ASTNode(tree);
    }
    if (tree.type === "constantDeclaration") {
      const child0 = recurse(tree.namedChild(0)!);
      const child1 = tree.namedChild(1);
      const child2 = recurse(tree.namedChild(2)!);
      const returnVal: ConstantDeclarationNode = new ConstantDeclarationNode(
        tree,
        child0.text(),
        child1!.text,
        child2
      );
      returnVal.children = [child0, child2];
      currentScopeNode.addDeclaredVariable(returnVal);
      return returnVal;
    } else if (tree.type === "comment") {
      return new CommentNode(tree, tree.text);
    } else if (tree.type === "source_file") {
      currentScopeNode = new FileNode(tree);
      (currentScopeNode as FileNode).setStatements(
        tree.namedChildren.map((child) => recurse(child))
      );
      return currentScopeNode;
    } else if (tree.type === "baseType") {
      const node = new BaseTypeNode(
        tree,
        tree.child(0)!.text,
        tree.namedChildCount > 0 ? recurse(tree.namedChild(0)!) : null
      );
      return node;
    } else if (tree.type === "name") {
      return new IdentifierNode(tree, tree.text);
    } else if (tree.type === "stateExpression") {
      return new ParserStateExpression(tree);
    } else if (tree.type === "headerTypeDeclaration") {
      const structProps: { [key: string]: ASTNode } = {};
      tree
        .descendantsOfType("structField")
        .forEach(
          (child) =>
            (structProps[child.child(1)!.text] = recurse(child.firstChild!))
        );
      const node = new HeaderTypeDeclarationNode(
        tree,
        tree.namedChild(0)!.text,
        structProps
      );
      currentScopeNode.addDeclaredType(node);
      return node;
    } else if (tree.type === "structTypeDeclaration") {
      const structProps: { [key: string]: ASTNode } = {};
      tree
        .descendantsOfType("structField")
        .forEach(
          (child) =>
            (structProps[child.child(1)!.text] = recurse(child.firstChild!))
        );
      const node = new StructTypeDeclarationNode(
        tree,
        tree.namedChild(0)!.text,
        structProps
      );
      currentScopeNode.addDeclaredType(node);
      return node;
    } else if (tree.type === "typeName") {
      return new IdentifierNode(tree, tree.text);
    } else if (tree.type === "methodCallStatement") {
      const node = new MethodCallStatement(
        tree,
        recurse(tree.namedChild(0)!),
        tree.descendantsOfType("argument").map((child) => recurse(child))
      );
      return node;
    } else if (tree.type === "INTEGER") {
      return new IntegerNode(tree, tree.text);
    } else if (tree.type === "parameter") {
      return new ParameterNode(
        tree,
        recurse(tree.namedChild(0)!).text(),
        tree.namedChild(1)!.text
      );
    } else if (tree.type === "parserDeclaration") {
      const parameters = tree
        .namedChild(0)
        ?.descendantsOfType("parameter")
        .map((child) => recurse(child));
      console.log("params: ", parameters);
      const node = new ParserDeclarationNode(
        tree.namedChild(0)!.text,
        parameters as ParameterNode[],
        currentScopeNode,
        tree
      );
      currentScopeNode = node;
      node.setStatements(
        tree
          .descendantsOfType(["parserLocalElement", "parserState"])
          .map((child) => recurse(child))
      );
      currentScopeNode = node.getParentScopeNode()!;
      return node;
    } else if (tree.type === "parserState") {
      const [firstNamedChild, ...rest] = tree.namedChildren;
      const name = firstNamedChild.text;
      const node = new ParserStateNode(name, tree);
      node.setStatements(rest.map((child) => recurse(child)));
      return node;
    } else if (tree.type === "controlDeclaration") {
      const parameters = tree
        .namedChild(1)
        ?.descendantsOfType("parameter")
        .map((child) => recurse(child));
      console.log("params: ", parameters);
      const node = new ControlDeclarationNode(
        tree.namedChild(0)!.text,
        parameters as ParameterNode[],
        currentScopeNode,
        tree
      );
      currentScopeNode = node;
      node.setStatements(
        tree
          .descendantsOfType("controlLocalDeclaration")
          .map((child) => recurse(child))
      );
      currentScopeNode = node.getParentScopeNode()!;
      return node;
    } else if (tree.type === "lvalue") {
      const node = tree;
      if (node.childCount === 3) {
        if (node.child(1)!.text === ".") {
          const child1 = recurse(tree.namedChild(0)!);
          const child2 = recurse(tree.namedChild(1)!);
          return new PropertyAccessExpression(tree, child1, child2);
        }
        return tree.namedChildren.map((child) => recurse(child))[0];
      } else {
        return tree.namedChildren.map((child) => recurse(child))[0];
      }
    } else if (tree.type === "expression") {
      if (tree.childCount === 3) {
        const child11 = tree.namedChild(0);
        const child22 = tree.namedChild(1);
        if (child11 === null || child22 === null) {
          return new ASTNode(tree);
        }
        const child1 = recurse(child11);
        const child2 = recurse(child22);
        switch (tree.child(1)!.text) {
          case "-":
            return new SubstrationExpression(tree, child1, child2);
          case "+":
            return new AdditionExpression(tree, child1, child2);
          case ".":
            return new PropertyAccessExpression(tree, child1, child2);
          case "*":
            return new MultiplicationExpression(tree, child1, child2);
          case "/":
            return new DivisionExpression(tree, child1, child2);
        }
        return new ExpressionNode(tree, child1, child2);
      }
      return tree.namedChildren.map((child) => recurse(child))[0];
    } else if (tree.type === "IDENTIFIER") {
      return new IdentifierNode(tree, tree.text);
    } else if (tree.type === "assignmentStatement") {
      return new AssignmentStatement(
        tree,
        recurse(tree.namedChild(0)!),
        recurse(tree.namedChild(1)!)
      );
    } else if (tree.type === "actionDeclaration") {
      const node = (currentScopeNode = new ActionDeclarationNode(
        tree.namedChild(1)!.text,
        tree
          .namedChild(1)!
          .descendantsOfType("parameter")
          .map((child) => recurse(child)) as ParameterNode[],
        currentScopeNode,
        tree
      ));
      currentScopeNode.children =
        tree.lastChild?.namedChildren.map((child) => recurse(child)) || [];
      currentScopeNode = currentScopeNode.getParentScopeNode()!;
      return node;
    } else {
      console.log(tree.type);
      return tree.namedChildren.map((child) => recurse(child))[0];
    }
  }
  const tree = recurse(rootNode);
  return tree;
};
