module.exports = grammar({
  name: "P4_16",
  extras: ($) => [/\s|\\\r?\n/, $.comment],
  conflicts: ($) => [
    [$.name, $.prefixedNonType],
    [$.prefixedType, $.prefixedNonType],
    [$.nonTypeName, $.name],
    [$.prefixedType, $._expression],
    [$.name, $._expression],
    [$.nonTypeName, $.prefixedType],
    [$.typeOrVoid, $.prefixedType],
    [$._expression],
  ],
  rules: {
    source_file: ($) => repeat($._declaration),
    comment: ($) =>
      token(
        prec(
          1,
          choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))
        )
      ),
    _declaration: ($) =>
      choice(
        $.constantDeclaration,
        $.externDeclaration,
        $._typeDeclaration,
        $.parserDeclaration,
        $.controlDeclaration,
        $.preproc_include,
        $.instantiation,
        $.errorDeclaration,
        $.matchKindDeclaration,
        $.functionDeclaration
      ),
    externDeclaration: ($) =>
      choice(
        seq(
          "extern",
          $.nonTypeName,
          optional($.typeParameters),
          "{",
          repeat($.methodPrototype),
          "}"
        ),
        seq("extern", $.functionPrototype, ";")
      ),
    functionDeclaration: ($) => seq($.functionPrototype, $.blockStatement),
    functionPrototype: ($) =>
      seq(
        $.typeOrVoid,
        $.name,
        optional($.typeParameters),
        "(",
        $.parameterList,
        ")"
      ),
    methodPrototype: ($) =>
      choice(
        seq($.functionPrototype, ";"),
        seq($.IDENTIFIER, "(", optional($.parameterList), ")", ";")
      ),
    typeOrVoid: ($) => choice($.typeRef, "void", $.IDENTIFIER),
    typeParameters: ($) => seq("<", $.typeParameterList, ">"),
    typeParameterList: ($) => seq($.name, repeat(seq(",", $.name))),
    instantiation: ($) =>
      seq(
        repeat($.annotation),
        $.typeRef,
        "(",
        optional($.argumentList),
        ")",
        $.name,
        ";"
      ),
    constantDeclaration: ($) =>
      seq(
        "const",
        field("type", $.typeRef),
        field("name", $.name),
        "=",
        field("initializer", $.initializer),
        ";"
      ),
    _typeDeclaration: ($) =>
      choice($.typedefDeclaration, $._derivedTypeDeclaration),
    _derivedTypeDeclaration: ($) =>
      choice($.headerTypeDeclaration, $.structTypeDeclaration),
    headerTypeDeclaration: ($) =>
      seq(
        "header",
        field("name", $.name),
        "{",
        optional(repeat($.structField)),
        "}"
      ),
    structTypeDeclaration: ($) =>
      seq(
        "struct",
        field("name", $.name),
        "{",
        optional(field("structFields", repeat($.structField))),
        "}"
      ),
    switchStatement: ($) =>
      seq("switch", "(", $._expression, ")", "{", repeat($.switchCase), "}"),
    switchCase: ($) =>
      choice(
        seq($.switchLabel, ":", $.blockStatement),
        seq($.switchLabel, ":")
      ),
    switchLabel: ($) => choice($.name, "default"),
    errorDeclaration: ($) => seq("error", "{", optional($.identifierList), "}"),
    identifierList: ($) => seq($.name, repeat(seq(",", $.name))),
    directApplication: ($) =>
      seq($.typeName, ".", "apply", "(", $.argumentList, ")", ";"),
    conditionalStatement: ($) =>
      choice(
        prec(1, seq("if", "(", $._expression, ")", $._statement)),
        prec(
          2,
          seq("if", "(", $._expression, ")", $._statement, "else", $._statement)
        )
      ),
    annotation: ($) =>
      choice(
        seq("@", $.name),
        seq("@", $.name, "(", $.annotationBody, ")"),
        seq("@", $.name, "[", $.structuredAnnotationBody, "]")
      ),
    kvList: ($) => choice($.kvPair, seq($.kvList, ",", $.kvPair)),
    kvPair: ($) => seq($.name, "=", $._expression),
    structuredAnnotationBody: ($) => choice($.expressionList, $.kvList),
    annotationBody: ($) =>
      choice(
        repeat1(seq($.annotationBody, "(", $.annotationBody, ")")),
        repeat1(seq($.annotationBody, $.annotationToken))
      ),
    annotationToken: ($) =>
      choice(
        "abstract",
        "action",
        "actions",
        "apply",
        "bool",
        "const",
        "control",
        "default",
        "else",
        "entries",
        "enum",
        "error",
        "exit",
        "extern",
        "false",
        "header",
        "header_union",
        "if",
        "in",
        "inout",
        "int",
        "key",
        "match_kind",
        "type",
        "out",
        "parser",
        "package",
        "pragma",
        "return",
        "select",
        "state",
        "struct",
        "switch",
        "table",
        "this",
        "transition",
        "true",
        "tuple",
        "typedef",
        "varbit",
        "valueset",
        "void",
        "_",
        $.IDENTIFIER,
        $.STRING_LITERAL,
        $.INTEGER
      ),
    controlDeclaration: ($) =>
      seq(
        "control",
        field("name", $.name),
        "(",
        field("parameterList", $.parameterList),
        ")",
        "{",
        field("localDeclarations", optional(repeat($.controlLocalDeclaration))),
        "apply",
        field("applyBlock", $.blockStatement),
        "}"
      ),
    blockStatement: ($) =>
      seq("{", optional(repeat($._statementOrDeclaration)), "}"),
    _statementOrDeclaration: ($) =>
      choice(
        $.constantDeclaration,
        $._statement,
        $.variableDeclaration,
        $.instantiation
      ),
    instantiation: ($) =>
      seq($.typeRef, "(", optional($.argumentList), ")", $.name, ";"),
    variableDeclaration: ($) =>
      seq($.typeRef, $.name, optional(seq("=", $._expression)), ";"),
    _statement: ($) =>
      choice(
        $.assignmentOrMethodCallStatement,
        $.conditionalStatement,
        $.blockStatement,
        $.switchStatement,
        $.directApplication
      ),
    matchKindDeclaration: ($) => seq("match_kind", "{", $.identifierList, "}"),
    assignmentOrMethodCallStatement: ($) =>
      choice(
        $.methodCallStatement,
        seq(
          $.lvalue,
          "<",
          optional($.typeArgumentList),
          ">",
          "(",
          optional($.argumentList),
          ")",
          ";"
        ),
        $.assignmentStatement
      ),
    methodCallStatement: ($) =>
      seq($.lvalue, "(", optional($.argumentList), ")", ";"),
    assignmentStatement: ($) => seq($.lvalue, "=", $._expression, ";"),
    nonTypeName: ($) =>
      choice(
        $.IDENTIFIER,
        "apply",
        "key",
        "actions",
        "state",
        "entries",
        "type"
      ),
    typeArgumentList: ($) => seq($.typeArg, repeat(seq(",", $.typeArg))),
    typeArg: ($) => choice("dontcare", $.typeRef, $.nonTypeName),
    controlLocalDeclaration: ($) =>
      choice(
        $.constantDeclaration,
        $.actionDeclaration,
        $.tableDeclaration,
        $.instantiation,
        $.variableDeclaration
      ),
    actionDeclaration: ($) =>
      seq(
        "action",
        field("name", $.name),
        "(",
        field("parameterList", optional($.parameterList)),
        ")",
        field("actionBlock", $.blockStatement)
      ),
    tableDeclaration: ($) =>
      seq("table", $.name, "{", optional(repeat($.tableProperty)), "}"),
    tableProperty: ($) =>
      choice(
        seq("key", "=", "{", optional(repeat($.keyElement)), "}"),
        seq("actions", "=", "{", optional(repeat($.actionListElement)), "}"),
        seq($.nonTableKwName, "=", $.initializer, ";"),
        seq("const", $.nonTableKwName, "=", $.initializer, ";"),
        seq("const", "entries", "=", "{", repeat($.entry), "}")
      ),
    actionRef: ($) =>
      choice(
        $.prefixedNonType,
        seq($.prefixedNonType, "(", optional($.argumentList), ")")
      ),
    entry: ($) => seq($.keysetExpression, ":", $.actionRef, ";"),
    nonTableKwName: ($) => choice($.IDENTIFIER, "apply", "state", "type"),
    keyElement: ($) => seq($._expression, ":", $.name, ";"),
    prefixedNonType: ($) => choice($.IDENTIFIER, seq(".", $.IDENTIFIER)),
    argumentList: ($) =>
      seq($.argument, optional(repeat(seq(",", $.argument)))),
    actionListElement: ($) =>
      choice(
        seq($.prefixedNonType, ";"),
        seq($.prefixedNonType, "(", optional($.argumentList), ")", ";")
      ),
    argument: ($) =>
      choice($._expression, seq($.name, "=", $._expression), "dontcare"),
    parserDeclaration: ($) =>
      seq(
        $.parserTypeDeclaration,
        "{",
        repeat($.parserLocalElement),
        repeat($.parserState),
        "}"
      ),
    parserTypeDeclaration: ($) =>
      seq("parser", $.name, "(", optional($.parameterList), ")"),
    parserLocalElement: ($) => choice($.constantDeclaration),
    parserState: ($) =>
      seq(
        "state",
        $.name,
        "{",
        optional(repeat($.parserStatement)),
        optional($.stateExpression),
        "}"
      ),
    stateExpression: ($) =>
      seq("transition", choice(seq($.name, ";"), $.selectExpression)),
    selectExpression: ($) =>
      seq(
        "select",
        "(",
        optional($.expressionList),
        ")",
        "{",
        repeat($.selectCase),
        "}"
      ),
    selectCase: ($) => seq($.keysetExpression, ":", $.name, ";"),
    keysetExpression: ($) =>
      choice($.tupleKeysetExpression, $.simpleKeysetExpression),
    tupleKeysetExpression: ($) =>
      seq("(", $.simpleKeysetExpression, ",", $.simpleExpressionList, ")"),
    simpleExpressionList: ($) =>
      seq(
        $.simpleKeysetExpression,
        optional(seq(",", $.simpleKeysetExpression))
      ),
    simpleKeysetExpression: ($) =>
      choice(
        $._expression,
        "default",
        "dontcare",
        seq($._expression, "mask", $._expression),
        seq($._expression, "range", $._expression)
      ),
    parserStatement: ($) =>
      choice($.constantDeclaration, $.assignmentOrMethodCallStatement),
    parameterList: ($) =>
      seq($.parameter, optional(repeat(seq(",", $.parameter)))),
    parameter: ($) =>
      seq(
        optional(choice("inout", "out", "in")),
        field("typeRef", $.typeRef),
        field("name", $.name)
      ),
    typedefDeclaration: ($) => seq("typedef", $.typeRef, $.name, ";"),
    structField: ($) =>
      seq(field("typeRef", $.typeRef), field("name", $.name), ";"),
    specializedType: ($) =>
      seq($.prefixedType, "<", optional($.typeArgumentList), ">"),
    prefixedType: ($) => choice($.IDENTIFIER, seq(".", $.IDENTIFIER)),
    typeRef: ($) =>
      choice(
        $.baseType,
        $.typeName,
        $.specializedType,
        $.headerStackType,
        $.tupleType
      ),
    tupleType: ($) => seq("tuple", "<", optional($.typeArgumentList), ">"),
    headerStackType: ($) => seq($.typeName, "[", $._expression, "]"),
    baseType: ($) =>
      choice(
        "bit",
        "bool",
        "error",
        "int",
        seq("bit", "<", $.IDENTIFIER, ">"), // added to parse c-style #define BLOOM_FILTER_ENTRIES 4096
        seq("int", "<", $.IDENTIFIER, ">"), // added to parse c-style #define BLOOM_FILTER_ENTRIES 4096
        seq("varbit", "<", $.IDENTIFIER, ">"), // added to parse c-style #define BLOOM_FILTER_ENTRIES 4096
        seq("bit", "<", $.INTEGER, ">"),
        seq("int", "<", $.INTEGER, ">"),
        seq("varbit", "<", $.INTEGER, ">"),
        seq("bit", "<", "(", $._expression, ")", ">"),
        seq("int", "<", "(", $._expression, ")", ">"),
        seq("varbit", "<", "(", $._expression, ")", ">")
      ),
    initializer: ($) => $._expression,
    expressionList: ($) => seq($._expression, repeat(seq(",", $._expression))),
    realTypeArgumentList: ($) =>
      seq($.realTypeArg, repeat(seq(",", $.typeArg))),
    realTypeArg: ($) => choice("dontcare", $.typeRef),
    _expression: ($) =>
      choice(
        $.IDENTIFIER,
        $.TRUE,
        $.FALSE,
        $.INTEGER,
        seq(".", $.IDENTIFIER),
        seq($.IDENTIFIER, ".", $.IDENTIFIER),
        seq($._expression, "[", $._expression, "]"),
        seq("{", optional($.expressionList), "}"),
        seq($._expression, "[", $._expression, ":", $._expression, "]"),
        seq(
          $._expression,
          "<",
          $.realTypeArgumentList,
          ">",
          "(",
          optional($.argumentList),
          ")"
        ),
        seq("(", $._expression, ")"),
        prec.right(seq("!", $._expression)),
        prec.right(seq("~", $._expression)),
        prec.right(seq("-", $._expression)),
        prec.right(seq("+", $._expression)),
        prec.left(2, seq($._expression, ".", $.name)),
        prec.left(1, seq($.IDENTIFIER, ".", $.IDENTIFIER)),
        prec.left(2, seq($._expression, "(", optional($.argumentList), ")")),
        prec.left(
          3,
          alias(
            seq($._expression, "*", $._expression),
            $.MultiplicationExpression
          )
        ),
        prec.left(
          3,
          alias(seq($._expression, "/", $._expression), $.DivisionExpression)
        ),
        prec.left(
          3,
          alias(seq($._expression, "%", $._expression), $.RemainderExpression)
        ),
        prec.left(
          4,
          alias(seq($._expression, "+", $._expression), $.AdditionExpression)
        ),
        prec.left(4, seq($._expression, "-", $._expression)),
        prec.left(
          6,
          alias(seq($._expression, "<", $._expression), $.LessThanExpression)
        ),
        prec.left(
          6,
          alias(seq($._expression, ">", $._expression), $.GreaterThanExpression)
        ),
        prec.left(
          6,
          alias(
            seq($._expression, ">=", $._expression),
            $.GreaterThanOrEqualExpression
          )
        ),
        prec.left(
          6,
          alias(
            seq($._expression, "<=", $._expression),
            $.LessThanOrEqualExpression
          )
        ),
        prec.left(4, seq($._expression, "|+|", $._expression)),
        prec.left(4, seq($._expression, "|-|", $._expression)),
        prec.left(5, seq($._expression, "<<", $._expression)),
        prec.left(5, seq($._expression, ">>", $._expression)),
        prec.left(7, seq($._expression, "!=", $._expression)),
        prec.left(7, seq($._expression, "==", $._expression)),
        prec.left(8, seq($._expression, "&", $._expression)),
        prec.left(9, seq($._expression, "^", $._expression)),
        prec.left(10, seq($._expression, "|", $._expression)),
        prec.left(1, seq($._expression, "++", $._expression)),
        prec.left(11, seq($._expression, "&&", $._expression)),
        prec.left(12, seq($._expression, "||", $._expression)),
        prec.left(
          13,
          seq($._expression, "?", $._expression, ":", $._expression)
        ),
        prec.left(seq("(", $.typeRef, ")", $._expression))
      ),
    typeName: ($) => $.prefixedType,
    name: ($) => $.IDENTIFIER,
    lvalue: ($) =>
      choice(
        $.prefixedNonType,
        seq($.lvalue, ".", $.name),
        seq($.lvalue, "[", $._expression, "]"),
        seq($.lvalue, "[", $._expression, ":", $._expression, "]")
      ),
    IDENTIFIER: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,
    INTEGER: ($) => /(0x)?[0-9a-f]+/,
    TRUE: ($) => /true/,
    FALSE: ($) => /false/,
    STRING_LITERAL: ($) => /[^\\"\n]+/,
    SYSTEM_LIB_STRING: ($) =>
      token(seq("<", repeat(choice(/[^>\n]/, "\\>")), ">")),
    path: ($) => $.STRING_LITERAL,
    preproc_include: ($) =>
      seq("#", /[ \t]*/, choice($.STRING_LITERAL, $.SYSTEM_LIB_STRING), "\n"),
  },
});

function preprocessor(command) {
  return alias(new RegExp("#[ \t]*" + command), "#" + command);
}
