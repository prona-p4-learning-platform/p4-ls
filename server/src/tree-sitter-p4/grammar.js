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
    [$.typeOrVoid, $.prefixedType],
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
        $.externDeclaration,
        $.typeDeclaration,
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
      seq("const", $.typeRef, $.name, "=", $.initializer, ";"),
    typeDeclaration: ($) =>
      choice($.typedefDeclaration, $.derivedTypeDeclaration),
    derivedTypeDeclaration: ($) =>
      choice($.headerTypeDeclaration, $.structTypeDeclaration),
    headerTypeDeclaration: ($) =>
      seq("header", $.name, "{", optional(repeat($.structField)), "}"),
    structTypeDeclaration: ($) =>
      seq("struct", $.name, "{", optional(repeat($.structField)), "}"),
    switchStatement: ($) =>
      seq("switch", "(", $.expression, ")", "{", repeat($.switchCase), "}"),
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
        prec(1, seq("if", "(", $.expression, ")", $.statement)),
        prec(
          2,
          seq("if", "(", $.expression, ")", $.statement, "else", $.statement)
        )
      ),
    annotation: ($) =>
      choice(
        seq("@", $.name),
        seq("@", $.name, "(", $.annotationBody, ")"),
        seq("@", $.name, "[", $.structuredAnnotationBody, "]")
      ),
    kvList: ($) => choice($.kvPair, seq($.kvList, ",", $.kvPair)),
    kvPair: ($) => seq($.name, "=", $.expression),
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
        $.blockStatement,
        $.switchStatement,
        $.directApplication
      ),
    matchKindDeclaration: ($) => seq("match_kind", "{", $.identifierList, "}"),
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
