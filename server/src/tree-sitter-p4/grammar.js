module.exports = grammar({
  name: "P4_16",
  extras: ($) => [/\s|\\\r?\n/, $.comment],
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
        $.instantiation
      ),
    instantiation: ($) =>
      seq($.IDENTIFIER, "(", optional($.argumentList), ")", $.name, ";"),
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
    conditionalStatement: ($) =>
      choice(
        prec(2, seq("if", "(", $.expression, ")", $.statement)),
        prec(
          1,
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
    statementOrDeclaration: ($) => choice($.constantDeclaration, $.statement),
    statement: ($) =>
      choice(
        $.assignmentOrMethodCallStatement,
        $.conditionalStatement,
        $.blockStatement
      ),
    assignmentOrMethodCallStatement: ($) =>
      choice(
        seq($.lvalue, "(", optional($.argumentList), ")", ";"),
        seq($.lvalue, "=", $.expression, ";")
      ),
    controlLocalDeclaration: ($) =>
      choice($.constantDeclaration, $.actionDeclaration, $.tableDeclaration),
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
        seq($.nonTableKwName, "=", $.initializer, ";")
      ),
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
    typeRef: ($) => choice($.baseType, $.typeName),
    baseType: ($) => choice("bit", seq("bit", "<", $.INTEGER, ">")),
    initializer: ($) => $.expression,
    expressionList: ($) => seq($.expression, repeat(seq(",", $.expression))),
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
        prec.left(1, seq($.expression, "?", $.expression, ":", $.expression))
      ),
    typeName: ($) => $.name,
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
