module.exports = grammar({
  name: "P4_16",
  extras: ($) => [/\s|\\\r?\n/, $.comment],
  conflicts: ($) => [
    [$.name, $.prefixedNonType],
    [$.prefixedType, $.prefixedNonType],
    [$.nonTypeName, $.name],
    [$.prefixedType, $.expression],
    [$.name, $.expression],
    [$.nonTypeName, $.prefixedType],
  ],
  rules: {
    source_file: ($) => repeat($.declaration),
    comment: ($) =>
      token(
        prec(
          1,
          choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))
        )
      ),
    declaration: ($) =>
      choice(
        $.constantDeclaration,
        $.typeDeclaration,
        $.parserDeclaration,
        $.controlDeclaration,
        $.preproc_include,
        $.instantiation,
        $.errorDeclaration
      ),
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
      seq("const", $.typeRef, $.name, "=", $.initializer, ";"),
    typeDeclaration: ($) =>
      choice($.typedefDeclaration, $.derivedTypeDeclaration),
    derivedTypeDeclaration: ($) =>
      choice($.headerTypeDeclaration, $.structTypeDeclaration),
    headerTypeDeclaration: ($) =>
      seq("header", $.name, "{", optional(repeat($.structField)), "}"),
    structTypeDeclaration: ($) =>
      seq("struct", $.name, "{", optional(repeat($.structField)), "}"),
    errorDeclaration: ($) => seq("error", "{", optional($.identifierList), "}"),
    identifierList: ($) => seq($.name, repeat(seq(",", $.name))),
    conditionalStatement: ($) =>
      choice(
        prec(1, seq("if", "(", $.expression, ")", $.statement)),
        prec(
          2,
          seq("if", "(", $.expression, ")", $.statement, "else", $.statement)
        )
      ),
    controlDeclaration: ($) =>
      seq(
        "control",
        $.name,
        "(",
        $.parameterList,
        ")",
        "{",
        optional(repeat($.controlLocalDeclaration)),
        "apply",
        $.blockStatement,
        "}"
      ),
    blockStatement: ($) =>
      seq("{", optional(repeat($.statementOrDeclaration)), "}"),
    statementOrDeclaration: ($) =>
      choice(
        $.constantDeclaration,
        $.statement,
        $.variableDeclaration,
        $.instantiation
      ),
    instantiation: ($) =>
      seq($.typeRef, "(", optional($.argumentList), ")", $.name, ";"),
    variableDeclaration: ($) => seq($.typeRef, $.name, ";"),
    statement: ($) =>
      choice(
        $.assignmentOrMethodCallStatement,
        $.conditionalStatement,
        $.blockStatement
      ),
    assignmentOrMethodCallStatement: ($) =>
      choice(
        seq($.lvalue, "(", optional($.argumentList), ")", ";"),
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
        seq($.lvalue, "=", $.expression, ";")
      ),
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
        $.name,
        "(",
        optional($.parameterList),
        ")",
        $.blockStatement
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
    keyElement: ($) => seq($.expression, ":", $.name, ";"),
    prefixedNonType: ($) => choice($.IDENTIFIER, seq(".", $.IDENTIFIER)),
    argumentList: ($) =>
      seq($.argument, optional(repeat(seq(",", $.argument)))),
    actionListElement: ($) =>
      choice(
        seq($.prefixedNonType, ";"),
        seq($.prefixedNonType, "(", optional($.argumentList), ")", ";")
      ),
    argument: ($) =>
      choice($.expression, seq($.name, "=", $.expression), "dontcare"),
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
        optional(seq("transition", $.stateExpression)),
        "}"
      ),
    stateExpression: ($) => choice(seq($.name, ";"), $.selectExpression),
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
        $.expression,
        "default",
        "dontcare",
        seq($.expression, "mask", $.expression),
        seq($.expression, "range", $.expression)
      ),
    parserStatement: ($) =>
      choice($.constantDeclaration, $.assignmentOrMethodCallStatement),
    parameterList: ($) =>
      seq($.parameter, optional(repeat(seq(",", $.parameter)))),
    parameter: ($) =>
      seq(optional(choice("inout", "out", "in")), $.typeRef, $.name),
    typedefDeclaration: ($) => seq("typedef", $.typeRef, $.name, ";"),
    structField: ($) => seq($.typeRef, $.name, ";"),
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
    headerStackType: ($) => seq($.typeName, "[", $.expression, "]"),
    baseType: ($) =>
      choice(
        "bit",
        "bool",
        "error",
        "int",
        seq("bit", "<", $.INTEGER, ">"),
        seq("int", "<", $.INTEGER, ">"),
        seq("varbit", "<", $.INTEGER, ">"),
        seq("bit", "<", "(", $.expression, ")", ">"),
        seq("int", "<", "(", $.expression, ")", ">"),
        seq("varbit", "<", "(", $.expression, ")", ">")
      ),
    initializer: ($) => $.expression,
    expressionList: ($) => seq($.expression, repeat(seq(",", $.expression))),
    realTypeArgumentList: ($) =>
      seq($.realTypeArg, repeat(seq(",", $.typeArg))),
    realTypeArg: ($) => choice("dontcare", $.typeRef),
    expression: ($) =>
      choice(
        $.IDENTIFIER,
        $.TRUE,
        $.FALSE,
        $.INTEGER,
        seq(".", $.IDENTIFIER),
        seq($.IDENTIFIER, ".", $.IDENTIFIER),
        seq($.expression, "[", $.expression, "]"),
        seq("{", optional($.expressionList), "}"),
        seq($.expression, "[", $.expression, ":", $.expression, "]"),
        seq(
          $.expression,
          "<",
          $.realTypeArgumentList,
          ">",
          "(",
          optional($.argumentList),
          ")"
        ),
        prec.left(2, seq($.expression, ".", $.name)),
        prec.left(1, seq($.IDENTIFIER, ".", $.IDENTIFIER)),
        prec.left(2, seq($.expression, "(", optional($.argumentList), ")")),
        prec.left(1, seq($.expression, "*", $.expression)),
        prec.left(1, seq($.expression, "/", $.expression)),
        prec.left(1, seq($.expression, "%", $.expression)),
        prec.left(1, seq($.expression, "+", $.expression)),
        prec.left(1, seq($.expression, "-", $.expression)),
        prec.left(1, seq($.expression, "|+|", $.expression)),
        prec.left(1, seq($.expression, "|-|", $.expression)),
        prec.left(1, seq($.expression, "<<", $.expression)),
        prec.left(1, seq($.expression, ">>", $.expression)),
        prec.left(1, seq($.expression, "<=", $.expression)),
        prec.left(1, seq($.expression, ">=", $.expression)),
        prec.left(1, seq($.expression, "<", $.expression)),
        prec.left(1, seq($.expression, ">", $.expression)),
        prec.left(1, seq($.expression, "!=", $.expression)),
        prec.left(1, seq($.expression, "==", $.expression)),
        prec.left(1, seq($.expression, "&", $.expression)),
        prec.left(1, seq($.expression, "^", $.expression)),
        prec.left(1, seq($.expression, "|", $.expression)),
        prec.left(1, seq($.expression, "++", $.expression)),
        prec.left(1, seq($.expression, "&&", $.expression)),
        prec.left(1, seq($.expression, "||", $.expression)),
        prec.left(1, seq($.expression, "?", $.expression, ":", $.expression)),
        prec.left(seq("(", $.typeRef, ")", $.expression))
      ),
    typeName: ($) => $.prefixedType,
    name: ($) => $.IDENTIFIER,
    lvalue: ($) =>
      choice(
        $.prefixedNonType,
        seq($.lvalue, ".", $.name),
        seq($.lvalue, "[", $.expression, "]"),
        seq($.lvalue, "[", $.expression, ":", $.expression, "]")
      ),
    IDENTIFIER: ($) => /[a-zA-Z][a-zA-Z0-9_]*/,
    INTEGER: ($) => /(0x)?[0-9]+/,
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
