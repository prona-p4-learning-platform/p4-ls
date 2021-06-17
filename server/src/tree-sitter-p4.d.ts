export interface Parser {
  parse(input: string | Input, previousTree?: Tree, options?: {bufferSize?: number, includedRanges?: Range[]}): Tree;
  getLanguage(): any;
  setLanguage(language: any): void;
  getLogger(): Logger;
  setLogger(logFunc: Logger): void;
}

export type Point = {
  row: number;
  column: number;
};

export type Range = {
  startIndex: number,
  endIndex: number,
  startPosition: Point,
  endPosition: Point
};

export type Edit = {
  startIndex: number;
  oldEndIndex: number;
  newEndIndex: number;
  startPosition: Point;
  oldEndPosition: Point;
  newEndPosition: Point;
};

export type Logger = (
  message: string,
  params: {[param: string]: string},
  type: "parse" | "lex"
) => void;

export interface Input {
  seek(index: number): void;
  read(): any;
}

interface SyntaxNodeBase {
  tree: Tree;
  type: string;
  isNamed: boolean;
  text: string;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  parent: SyntaxNode | null;
  children: Array<SyntaxNode>;
  namedChildren: Array<SyntaxNode>;
  childCount: number;
  namedChildCount: number;
  firstChild: SyntaxNode | null;
  firstNamedChild: SyntaxNode | null;
  lastChild: SyntaxNode | null;
  lastNamedChild: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  nextNamedSibling: SyntaxNode | null;
  previousSibling: SyntaxNode | null;
  previousNamedSibling: SyntaxNode | null;

  hasChanges(): boolean;
  hasError(): boolean;
  isMissing(): boolean;
  toString(): string;
  child(index: number): SyntaxNode | null;
  namedChild(index: number): SyntaxNode | null;
  firstChildForIndex(index: number): SyntaxNode | null;
  firstNamedChildForIndex(index: number): SyntaxNode | null;

  descendantForIndex(index: number): SyntaxNode;
  descendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  namedDescendantForIndex(index: number): SyntaxNode;
  namedDescendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  descendantForPosition(position: Point): SyntaxNode;
  descendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  namedDescendantForPosition(position: Point): SyntaxNode;
  namedDescendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  descendantsOfType<T extends TypeString>(types: T | readonly T[], startPosition?: Point, endPosition?: Point): NodeOfType<T>[];

  closest<T extends SyntaxType>(types: T | readonly T[]): NamedNode<T> | null;
  walk(): TreeCursor;
}

export interface TreeCursor {
  nodeType: string;
  nodeText: string;
  nodeIsNamed: boolean;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  readonly currentNode: SyntaxNode

  reset(node: SyntaxNode): void
  gotoParent(): boolean;
  gotoFirstChild(): boolean;
  gotoFirstChildForIndex(index: number): boolean;
  gotoNextSibling(): boolean;
}

export interface Tree {
  readonly rootNode: SyntaxNode;

  edit(delta: Edit): Tree;
  walk(): TreeCursor;
  getChangedRanges(other: Tree): Range[];
  getEditedRange(other: Tree): Range;
}

interface NamedNodeBase extends SyntaxNodeBase {
    isNamed: true;
}

/** An unnamed node with the given type string. */
export interface UnnamedNode<T extends string = string> extends SyntaxNodeBase {
  type: T;
  isNamed: false;
}

type PickNamedType<Node, T extends string> = Node extends { type: T; isNamed: true } ? Node : never;

type PickType<Node, T extends string> = Node extends { type: T } ? Node : never;

/** A named node with the given `type` string. */
export type NamedNode<T extends SyntaxType = SyntaxType> = PickNamedType<SyntaxNode, T>;

/**
 * A node with the given `type` string.
 *
 * Note that this matches both named and unnamed nodes. Use `NamedNode<T>` to pick only named nodes.
 */
export type NodeOfType<T extends string> = PickType<SyntaxNode, T>;

interface TreeCursorOfType<S extends string, T extends SyntaxNodeBase> {
  nodeType: S;
  currentNode: T;
}

type TreeCursorRecord = { [K in TypeString]: TreeCursorOfType<K, NodeOfType<K>> };

/**
 * A tree cursor whose `nodeType` correlates with `currentNode`.
 *
 * The typing becomes invalid once the underlying cursor is mutated.
 *
 * The intention is to cast a `TreeCursor` to `TypedTreeCursor` before
 * switching on `nodeType`.
 *
 * For example:
 * ```ts
 * let cursor = root.walk();
 * while (cursor.gotoNextSibling()) {
 *   const c = cursor as TypedTreeCursor;
 *   switch (c.nodeType) {
 *     case SyntaxType.Foo: {
 *       let node = c.currentNode; // Typed as FooNode.
 *       break;
 *     }
 *   }
 * }
 * ```
 */
export type TypedTreeCursor = TreeCursorRecord[keyof TreeCursorRecord];

export interface ErrorNode extends NamedNodeBase {
    type: SyntaxType.ERROR;
    hasError(): true;
}

export const enum SyntaxType {
  ERROR = "ERROR",
  AdditionExpression = "AdditionExpression",
  DivisionExpression = "DivisionExpression",
  GreaterThanExpression = "GreaterThanExpression",
  GreaterThanOrEqualExpression = "GreaterThanOrEqualExpression",
  LessThanExpression = "LessThanExpression",
  LessThanOrEqualExpression = "LessThanOrEqualExpression",
  MultiplicationExpression = "MultiplicationExpression",
  RemainderExpression = "RemainderExpression",
  ActionDeclaration = "actionDeclaration",
  ActionListElement = "actionListElement",
  ActionRef = "actionRef",
  AnnotationBody = "annotationBody",
  AnnotationToken = "annotationToken",
  Argument = "argument",
  ArgumentList = "argumentList",
  AssignmentOrMethodCallStatement = "assignmentOrMethodCallStatement",
  AssignmentStatement = "assignmentStatement",
  BaseType = "baseType",
  BlockStatement = "blockStatement",
  ConditionalStatement = "conditionalStatement",
  ConstantDeclaration = "constantDeclaration",
  ControlDeclaration = "controlDeclaration",
  ControlLocalDeclaration = "controlLocalDeclaration",
  DerivedTypeDeclaration = "derivedTypeDeclaration",
  DirectApplication = "directApplication",
  Entry = "entry",
  ErrorDeclaration = "errorDeclaration",
  ExpressionList = "expressionList",
  ExternDeclaration = "externDeclaration",
  FunctionDeclaration = "functionDeclaration",
  FunctionPrototype = "functionPrototype",
  HeaderStackType = "headerStackType",
  HeaderTypeDeclaration = "headerTypeDeclaration",
  IdentifierList = "identifierList",
  Initializer = "initializer",
  Instantiation = "instantiation",
  KeyElement = "keyElement",
  KeysetExpression = "keysetExpression",
  KvList = "kvList",
  KvPair = "kvPair",
  Lvalue = "lvalue",
  MatchKindDeclaration = "matchKindDeclaration",
  MethodCallStatement = "methodCallStatement",
  MethodPrototype = "methodPrototype",
  Name = "name",
  NonTableKwName = "nonTableKwName",
  NonTypeName = "nonTypeName",
  Parameter = "parameter",
  ParameterList = "parameterList",
  ParserDeclaration = "parserDeclaration",
  ParserLocalElement = "parserLocalElement",
  ParserState = "parserState",
  ParserStatement = "parserStatement",
  ParserTypeDeclaration = "parserTypeDeclaration",
  PrefixedNonType = "prefixedNonType",
  PrefixedType = "prefixedType",
  PreprocInclude = "preproc_include",
  RealTypeArg = "realTypeArg",
  RealTypeArgumentList = "realTypeArgumentList",
  SelectCase = "selectCase",
  SelectExpression = "selectExpression",
  SimpleExpressionList = "simpleExpressionList",
  SimpleKeysetExpression = "simpleKeysetExpression",
  SourceFile = "source_file",
  SpecializedType = "specializedType",
  StateExpression = "stateExpression",
  StructField = "structField",
  StructTypeDeclaration = "structTypeDeclaration",
  StructuredAnnotationBody = "structuredAnnotationBody",
  SwitchCase = "switchCase",
  SwitchLabel = "switchLabel",
  SwitchStatement = "switchStatement",
  TableDeclaration = "tableDeclaration",
  TableProperty = "tableProperty",
  TupleKeysetExpression = "tupleKeysetExpression",
  TupleType = "tupleType",
  TypeArg = "typeArg",
  TypeArgumentList = "typeArgumentList",
  TypeName = "typeName",
  TypeOrVoid = "typeOrVoid",
  TypeParameterList = "typeParameterList",
  TypeParameters = "typeParameters",
  TypeRef = "typeRef",
  TypedefDeclaration = "typedefDeclaration",
  VariableDeclaration = "variableDeclaration",
  FALSE = "FALSE",
  IDENTIFIER = "IDENTIFIER",
  INTEGER = "INTEGER",
  STRINGLITERAL = "STRING_LITERAL",
  SYSTEMLIBSTRING = "SYSTEM_LIB_STRING",
  TRUE = "TRUE",
  Comment = "comment",
}

export type UnnamedType =
  | "\n"
  | "!"
  | "!="
  | "#"
  | "&"
  | "&&"
  | "("
  | ")"
  | "+"
  | "++"
  | ","
  | "-"
  | "."
  | ":"
  | ";"
  | "<"
  | "<<"
  | "="
  | "=="
  | ">"
  | ">>"
  | "?"
  | "@"
  | "["
  | "]"
  | "^"
  | "_"
  | "abstract"
  | "action"
  | "actions"
  | "apply"
  | "bit"
  | "bool"
  | "const"
  | "control"
  | "default"
  | "dontcare"
  | "else"
  | "entries"
  | "enum"
  | "error"
  | "exit"
  | "extern"
  | "false"
  | "header"
  | "header_union"
  | "if"
  | "in"
  | "inout"
  | "int"
  | "key"
  | "mask"
  | "match_kind"
  | "out"
  | "package"
  | "parser"
  | "pragma"
  | "range"
  | "return"
  | "select"
  | "state"
  | "struct"
  | "switch"
  | "table"
  | "this"
  | "transition"
  | "true"
  | "tuple"
  | "type"
  | "typedef"
  | "valueset"
  | "varbit"
  | "void"
  | "{"
  | "|"
  | "|+|"
  | "|-|"
  | "||"
  | "}"
  | "~"
  ;

export type TypeString = SyntaxType | UnnamedType;

export type SyntaxNode = 
  | AdditionExpressionNode
  | DivisionExpressionNode
  | GreaterThanExpressionNode
  | GreaterThanOrEqualExpressionNode
  | LessThanExpressionNode
  | LessThanOrEqualExpressionNode
  | MultiplicationExpressionNode
  | RemainderExpressionNode
  | ActionDeclarationNode
  | ActionListElementNode
  | ActionRefNode
  | AnnotationBodyNode
  | AnnotationTokenNode
  | ArgumentNode
  | ArgumentListNode
  | AssignmentOrMethodCallStatementNode
  | AssignmentStatementNode
  | BaseTypeNode
  | BlockStatementNode
  | ConditionalStatementNode
  | ConstantDeclarationNode
  | ControlDeclarationNode
  | ControlLocalDeclarationNode
  | DerivedTypeDeclarationNode
  | DirectApplicationNode
  | EntryNode
  | ErrorDeclarationNode
  | ExpressionListNode
  | ExternDeclarationNode
  | FunctionDeclarationNode
  | FunctionPrototypeNode
  | HeaderStackTypeNode
  | HeaderTypeDeclarationNode
  | IdentifierListNode
  | InitializerNode
  | InstantiationNode
  | KeyElementNode
  | KeysetExpressionNode
  | KvListNode
  | KvPairNode
  | LvalueNode
  | MatchKindDeclarationNode
  | MethodCallStatementNode
  | MethodPrototypeNode
  | NameNode
  | NonTableKwNameNode
  | NonTypeNameNode
  | ParameterNode
  | ParameterListNode
  | ParserDeclarationNode
  | ParserLocalElementNode
  | ParserStateNode
  | ParserStatementNode
  | ParserTypeDeclarationNode
  | PrefixedNonTypeNode
  | PrefixedTypeNode
  | PreprocIncludeNode
  | RealTypeArgNode
  | RealTypeArgumentListNode
  | SelectCaseNode
  | SelectExpressionNode
  | SimpleExpressionListNode
  | SimpleKeysetExpressionNode
  | SourceFileNode
  | SpecializedTypeNode
  | StateExpressionNode
  | StructFieldNode
  | StructTypeDeclarationNode
  | StructuredAnnotationBodyNode
  | SwitchCaseNode
  | SwitchLabelNode
  | SwitchStatementNode
  | TableDeclarationNode
  | TablePropertyNode
  | TupleKeysetExpressionNode
  | TupleTypeNode
  | TypeArgNode
  | TypeArgumentListNode
  | TypeNameNode
  | TypeOrVoidNode
  | TypeParameterListNode
  | TypeParametersNode
  | TypeRefNode
  | TypedefDeclarationNode
  | VariableDeclarationNode
  | UnnamedNode<"\n">
  | UnnamedNode<"!">
  | UnnamedNode<"!=">
  | UnnamedNode<"#">
  | UnnamedNode<"&">
  | UnnamedNode<"&&">
  | UnnamedNode<"(">
  | UnnamedNode<")">
  | UnnamedNode<"+">
  | UnnamedNode<"++">
  | UnnamedNode<",">
  | UnnamedNode<"-">
  | UnnamedNode<".">
  | UnnamedNode<":">
  | UnnamedNode<";">
  | UnnamedNode<"<">
  | UnnamedNode<"<<">
  | UnnamedNode<"=">
  | UnnamedNode<"==">
  | UnnamedNode<">">
  | UnnamedNode<">>">
  | UnnamedNode<"?">
  | UnnamedNode<"@">
  | FALSENode
  | IDENTIFIERNode
  | INTEGERNode
  | STRINGLITERALNode
  | SYSTEMLIBSTRINGNode
  | TRUENode
  | UnnamedNode<"[">
  | UnnamedNode<"]">
  | UnnamedNode<"^">
  | UnnamedNode<"_">
  | UnnamedNode<"abstract">
  | UnnamedNode<"action">
  | UnnamedNode<"actions">
  | UnnamedNode<"apply">
  | UnnamedNode<"bit">
  | UnnamedNode<"bool">
  | CommentNode
  | UnnamedNode<"const">
  | UnnamedNode<"control">
  | UnnamedNode<"default">
  | UnnamedNode<"dontcare">
  | UnnamedNode<"else">
  | UnnamedNode<"entries">
  | UnnamedNode<"enum">
  | UnnamedNode<"error">
  | UnnamedNode<"exit">
  | UnnamedNode<"extern">
  | UnnamedNode<"false">
  | UnnamedNode<"header">
  | UnnamedNode<"header_union">
  | UnnamedNode<"if">
  | UnnamedNode<"in">
  | UnnamedNode<"inout">
  | UnnamedNode<"int">
  | UnnamedNode<"key">
  | UnnamedNode<"mask">
  | UnnamedNode<"match_kind">
  | UnnamedNode<"out">
  | UnnamedNode<"package">
  | UnnamedNode<"parser">
  | UnnamedNode<"pragma">
  | UnnamedNode<"range">
  | UnnamedNode<"return">
  | UnnamedNode<"select">
  | UnnamedNode<"state">
  | UnnamedNode<"struct">
  | UnnamedNode<"switch">
  | UnnamedNode<"table">
  | UnnamedNode<"this">
  | UnnamedNode<"transition">
  | UnnamedNode<"true">
  | UnnamedNode<"tuple">
  | UnnamedNode<"type">
  | UnnamedNode<"typedef">
  | UnnamedNode<"valueset">
  | UnnamedNode<"varbit">
  | UnnamedNode<"void">
  | UnnamedNode<"{">
  | UnnamedNode<"|">
  | UnnamedNode<"|+|">
  | UnnamedNode<"|-|">
  | UnnamedNode<"||">
  | UnnamedNode<"}">
  | UnnamedNode<"~">
  | ErrorNode
  ;

export interface AdditionExpressionNode extends NamedNodeBase {
  type: SyntaxType.AdditionExpression;
}

export interface DivisionExpressionNode extends NamedNodeBase {
  type: SyntaxType.DivisionExpression;
}

export interface GreaterThanExpressionNode extends NamedNodeBase {
  type: SyntaxType.GreaterThanExpression;
}

export interface GreaterThanOrEqualExpressionNode extends NamedNodeBase {
  type: SyntaxType.GreaterThanOrEqualExpression;
}

export interface LessThanExpressionNode extends NamedNodeBase {
  type: SyntaxType.LessThanExpression;
}

export interface LessThanOrEqualExpressionNode extends NamedNodeBase {
  type: SyntaxType.LessThanOrEqualExpression;
}

export interface MultiplicationExpressionNode extends NamedNodeBase {
  type: SyntaxType.MultiplicationExpression;
}

export interface RemainderExpressionNode extends NamedNodeBase {
  type: SyntaxType.RemainderExpression;
}

export interface ActionDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ActionDeclaration;
  actionBlockNode: BlockStatementNode;
  nameNode: NameNode;
  parameterListNode?: ParameterListNode;
}

export interface ActionListElementNode extends NamedNodeBase {
  type: SyntaxType.ActionListElement;
}

export interface ActionRefNode extends NamedNodeBase {
  type: SyntaxType.ActionRef;
}

export interface AnnotationBodyNode extends NamedNodeBase {
  type: SyntaxType.AnnotationBody;
}

export interface AnnotationTokenNode extends NamedNodeBase {
  type: SyntaxType.AnnotationToken;
}

export interface ArgumentNode extends NamedNodeBase {
  type: SyntaxType.Argument;
}

export interface ArgumentListNode extends NamedNodeBase {
  type: SyntaxType.ArgumentList;
}

export interface AssignmentOrMethodCallStatementNode extends NamedNodeBase {
  type: SyntaxType.AssignmentOrMethodCallStatement;
}

export interface AssignmentStatementNode extends NamedNodeBase {
  type: SyntaxType.AssignmentStatement;
}

export interface BaseTypeNode extends NamedNodeBase {
  type: SyntaxType.BaseType;
}

export interface BlockStatementNode extends NamedNodeBase {
  type: SyntaxType.BlockStatement;
}

export interface ConditionalStatementNode extends NamedNodeBase {
  type: SyntaxType.ConditionalStatement;
}

export interface ConstantDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ConstantDeclaration;
  initializerNode: InitializerNode;
  nameNode: NameNode;
  typeNode: TypeRefNode;
}

export interface ControlDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ControlDeclaration;
  applyBlockNode: BlockStatementNode;
  localDeclarationsNodes: ControlLocalDeclarationNode[];
  nameNode: NameNode;
  parameterListNode: ParameterListNode;
}

export interface ControlLocalDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ControlLocalDeclaration;
}

export interface DerivedTypeDeclarationNode extends NamedNodeBase {
  type: SyntaxType.DerivedTypeDeclaration;
}

export interface DirectApplicationNode extends NamedNodeBase {
  type: SyntaxType.DirectApplication;
}

export interface EntryNode extends NamedNodeBase {
  type: SyntaxType.Entry;
}

export interface ErrorDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ErrorDeclaration;
}

export interface ExpressionListNode extends NamedNodeBase {
  type: SyntaxType.ExpressionList;
}

export interface ExternDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ExternDeclaration;
}

export interface FunctionDeclarationNode extends NamedNodeBase {
  type: SyntaxType.FunctionDeclaration;
}

export interface FunctionPrototypeNode extends NamedNodeBase {
  type: SyntaxType.FunctionPrototype;
}

export interface HeaderStackTypeNode extends NamedNodeBase {
  type: SyntaxType.HeaderStackType;
}

export interface HeaderTypeDeclarationNode extends NamedNodeBase {
  type: SyntaxType.HeaderTypeDeclaration;
  nameNode: NameNode;
}

export interface IdentifierListNode extends NamedNodeBase {
  type: SyntaxType.IdentifierList;
}

export interface InitializerNode extends NamedNodeBase {
  type: SyntaxType.Initializer;
}

export interface InstantiationNode extends NamedNodeBase {
  type: SyntaxType.Instantiation;
}

export interface KeyElementNode extends NamedNodeBase {
  type: SyntaxType.KeyElement;
}

export interface KeysetExpressionNode extends NamedNodeBase {
  type: SyntaxType.KeysetExpression;
}

export interface KvListNode extends NamedNodeBase {
  type: SyntaxType.KvList;
}

export interface KvPairNode extends NamedNodeBase {
  type: SyntaxType.KvPair;
}

export interface LvalueNode extends NamedNodeBase {
  type: SyntaxType.Lvalue;
}

export interface MatchKindDeclarationNode extends NamedNodeBase {
  type: SyntaxType.MatchKindDeclaration;
}

export interface MethodCallStatementNode extends NamedNodeBase {
  type: SyntaxType.MethodCallStatement;
}

export interface MethodPrototypeNode extends NamedNodeBase {
  type: SyntaxType.MethodPrototype;
}

export interface NameNode extends NamedNodeBase {
  type: SyntaxType.Name;
}

export interface NonTableKwNameNode extends NamedNodeBase {
  type: SyntaxType.NonTableKwName;
}

export interface NonTypeNameNode extends NamedNodeBase {
  type: SyntaxType.NonTypeName;
}

export interface ParameterNode extends NamedNodeBase {
  type: SyntaxType.Parameter;
  nameNode: NameNode;
  typeRefNode: TypeRefNode;
}

export interface ParameterListNode extends NamedNodeBase {
  type: SyntaxType.ParameterList;
}

export interface ParserDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ParserDeclaration;
}

export interface ParserLocalElementNode extends NamedNodeBase {
  type: SyntaxType.ParserLocalElement;
}

export interface ParserStateNode extends NamedNodeBase {
  type: SyntaxType.ParserState;
}

export interface ParserStatementNode extends NamedNodeBase {
  type: SyntaxType.ParserStatement;
}

export interface ParserTypeDeclarationNode extends NamedNodeBase {
  type: SyntaxType.ParserTypeDeclaration;
}

export interface PrefixedNonTypeNode extends NamedNodeBase {
  type: SyntaxType.PrefixedNonType;
}

export interface PrefixedTypeNode extends NamedNodeBase {
  type: SyntaxType.PrefixedType;
}

export interface PreprocIncludeNode extends NamedNodeBase {
  type: SyntaxType.PreprocInclude;
}

export interface RealTypeArgNode extends NamedNodeBase {
  type: SyntaxType.RealTypeArg;
}

export interface RealTypeArgumentListNode extends NamedNodeBase {
  type: SyntaxType.RealTypeArgumentList;
}

export interface SelectCaseNode extends NamedNodeBase {
  type: SyntaxType.SelectCase;
}

export interface SelectExpressionNode extends NamedNodeBase {
  type: SyntaxType.SelectExpression;
}

export interface SimpleExpressionListNode extends NamedNodeBase {
  type: SyntaxType.SimpleExpressionList;
}

export interface SimpleKeysetExpressionNode extends NamedNodeBase {
  type: SyntaxType.SimpleKeysetExpression;
}

export interface SourceFileNode extends NamedNodeBase {
  type: SyntaxType.SourceFile;
}

export interface SpecializedTypeNode extends NamedNodeBase {
  type: SyntaxType.SpecializedType;
}

export interface StateExpressionNode extends NamedNodeBase {
  type: SyntaxType.StateExpression;
}

export interface StructFieldNode extends NamedNodeBase {
  type: SyntaxType.StructField;
  nameNode: NameNode;
  typeRefNode: TypeRefNode;
}

export interface StructTypeDeclarationNode extends NamedNodeBase {
  type: SyntaxType.StructTypeDeclaration;
  nameNode: NameNode;
  structFieldsNodes: StructFieldNode[];
}

export interface StructuredAnnotationBodyNode extends NamedNodeBase {
  type: SyntaxType.StructuredAnnotationBody;
}

export interface SwitchCaseNode extends NamedNodeBase {
  type: SyntaxType.SwitchCase;
}

export interface SwitchLabelNode extends NamedNodeBase {
  type: SyntaxType.SwitchLabel;
}

export interface SwitchStatementNode extends NamedNodeBase {
  type: SyntaxType.SwitchStatement;
}

export interface TableDeclarationNode extends NamedNodeBase {
  type: SyntaxType.TableDeclaration;
}

export interface TablePropertyNode extends NamedNodeBase {
  type: SyntaxType.TableProperty;
}

export interface TupleKeysetExpressionNode extends NamedNodeBase {
  type: SyntaxType.TupleKeysetExpression;
}

export interface TupleTypeNode extends NamedNodeBase {
  type: SyntaxType.TupleType;
}

export interface TypeArgNode extends NamedNodeBase {
  type: SyntaxType.TypeArg;
}

export interface TypeArgumentListNode extends NamedNodeBase {
  type: SyntaxType.TypeArgumentList;
}

export interface TypeNameNode extends NamedNodeBase {
  type: SyntaxType.TypeName;
}

export interface TypeOrVoidNode extends NamedNodeBase {
  type: SyntaxType.TypeOrVoid;
}

export interface TypeParameterListNode extends NamedNodeBase {
  type: SyntaxType.TypeParameterList;
}

export interface TypeParametersNode extends NamedNodeBase {
  type: SyntaxType.TypeParameters;
}

export interface TypeRefNode extends NamedNodeBase {
  type: SyntaxType.TypeRef;
}

export interface TypedefDeclarationNode extends NamedNodeBase {
  type: SyntaxType.TypedefDeclaration;
}

export interface VariableDeclarationNode extends NamedNodeBase {
  type: SyntaxType.VariableDeclaration;
}

export interface FALSENode extends NamedNodeBase {
  type: SyntaxType.FALSE;
}

export interface IDENTIFIERNode extends NamedNodeBase {
  type: SyntaxType.IDENTIFIER;
}

export interface INTEGERNode extends NamedNodeBase {
  type: SyntaxType.INTEGER;
}

export interface STRINGLITERALNode extends NamedNodeBase {
  type: SyntaxType.STRINGLITERAL;
}

export interface SYSTEMLIBSTRINGNode extends NamedNodeBase {
  type: SyntaxType.SYSTEMLIBSTRING;
}

export interface TRUENode extends NamedNodeBase {
  type: SyntaxType.TRUE;
}

export interface CommentNode extends NamedNodeBase {
  type: SyntaxType.Comment;
}

