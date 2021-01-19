#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 12
#define STATE_COUNT 206
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 87
#define ALIAS_COUNT 0
#define TOKEN_COUNT 35
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 10

enum {
  anon_sym_const = 1,
  anon_sym_EQ = 2,
  anon_sym_SEMI = 3,
  anon_sym_header = 4,
  anon_sym_LBRACE = 5,
  anon_sym_RBRACE = 6,
  anon_sym_struct = 7,
  anon_sym_control = 8,
  anon_sym_LPAREN = 9,
  anon_sym_RPAREN = 10,
  anon_sym_apply = 11,
  anon_sym_action = 12,
  anon_sym_table = 13,
  anon_sym_key = 14,
  anon_sym_actions = 15,
  anon_sym_state = 16,
  anon_sym_type = 17,
  anon_sym_COLON = 18,
  anon_sym_DOT = 19,
  anon_sym_COMMA = 20,
  anon_sym_dontcare = 21,
  anon_sym_parser = 22,
  anon_sym_transition = 23,
  anon_sym_inout = 24,
  anon_sym_out = 25,
  anon_sym_in = 26,
  anon_sym_typedef = 27,
  anon_sym_bit = 28,
  anon_sym_LT = 29,
  anon_sym_GT = 30,
  anon_sym_LBRACK = 31,
  anon_sym_RBRACK = 32,
  sym_IDENTIFIER = 33,
  sym_INTEGER = 34,
  sym_source_file = 35,
  sym_declaration = 36,
  sym_constantDeclaration = 37,
  sym_typeDeclaration = 38,
  sym_derivedTypeDeclaration = 39,
  sym_headerTypeDeclaration = 40,
  sym_structTypeDeclaration = 41,
  sym_controlDeclaration = 42,
  sym_blockStatement = 43,
  sym_statementOrDeclaration = 44,
  sym_statement = 45,
  sym_assignmentOrMethodCallStatement = 46,
  sym_controlLocalDeclaration = 47,
  sym_actionDeclaration = 48,
  sym_tableDeclaration = 49,
  sym_tableProperty = 50,
  sym_nonTableKwName = 51,
  sym_keyElement = 52,
  sym_prefixedNonType = 53,
  sym_argumentList = 54,
  sym_actionListElement = 55,
  sym_argument = 56,
  sym_parserDeclaration = 57,
  sym_parserTypeDeclaration = 58,
  sym_parserLocalElement = 59,
  sym_parserState = 60,
  sym_stateExpression = 61,
  sym_parserStatement = 62,
  sym_parameterList = 63,
  sym_parameter = 64,
  sym_typedefDeclaration = 65,
  sym_structField = 66,
  sym_typeRef = 67,
  sym_baseType = 68,
  sym_initializer = 69,
  sym_expression = 70,
  sym_typeName = 71,
  sym_name = 72,
  sym_lvalue = 73,
  aux_sym_source_file_repeat1 = 74,
  aux_sym_headerTypeDeclaration_repeat1 = 75,
  aux_sym_controlDeclaration_repeat1 = 76,
  aux_sym_blockStatement_repeat1 = 77,
  aux_sym_assignmentOrMethodCallStatement_repeat1 = 78,
  aux_sym_tableDeclaration_repeat1 = 79,
  aux_sym_tableProperty_repeat1 = 80,
  aux_sym_tableProperty_repeat2 = 81,
  aux_sym_argumentList_repeat1 = 82,
  aux_sym_parserDeclaration_repeat1 = 83,
  aux_sym_parserDeclaration_repeat2 = 84,
  aux_sym_parserState_repeat1 = 85,
  aux_sym_parameterList_repeat1 = 86,
};

static const char *ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_const] = "const",
  [anon_sym_EQ] = "=",
  [anon_sym_SEMI] = ";",
  [anon_sym_header] = "header",
  [anon_sym_LBRACE] = "{",
  [anon_sym_RBRACE] = "}",
  [anon_sym_struct] = "struct",
  [anon_sym_control] = "control",
  [anon_sym_LPAREN] = "(",
  [anon_sym_RPAREN] = ")",
  [anon_sym_apply] = "apply",
  [anon_sym_action] = "action",
  [anon_sym_table] = "table",
  [anon_sym_key] = "key",
  [anon_sym_actions] = "actions",
  [anon_sym_state] = "state",
  [anon_sym_type] = "type",
  [anon_sym_COLON] = ":",
  [anon_sym_DOT] = ".",
  [anon_sym_COMMA] = ",",
  [anon_sym_dontcare] = "dontcare",
  [anon_sym_parser] = "parser",
  [anon_sym_transition] = "transition",
  [anon_sym_inout] = "inout",
  [anon_sym_out] = "out",
  [anon_sym_in] = "in",
  [anon_sym_typedef] = "typedef",
  [anon_sym_bit] = "bit",
  [anon_sym_LT] = "<",
  [anon_sym_GT] = ">",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
  [sym_IDENTIFIER] = "IDENTIFIER",
  [sym_INTEGER] = "INTEGER",
  [sym_source_file] = "source_file",
  [sym_declaration] = "declaration",
  [sym_constantDeclaration] = "constantDeclaration",
  [sym_typeDeclaration] = "typeDeclaration",
  [sym_derivedTypeDeclaration] = "derivedTypeDeclaration",
  [sym_headerTypeDeclaration] = "headerTypeDeclaration",
  [sym_structTypeDeclaration] = "structTypeDeclaration",
  [sym_controlDeclaration] = "controlDeclaration",
  [sym_blockStatement] = "blockStatement",
  [sym_statementOrDeclaration] = "statementOrDeclaration",
  [sym_statement] = "statement",
  [sym_assignmentOrMethodCallStatement] = "assignmentOrMethodCallStatement",
  [sym_controlLocalDeclaration] = "controlLocalDeclaration",
  [sym_actionDeclaration] = "actionDeclaration",
  [sym_tableDeclaration] = "tableDeclaration",
  [sym_tableProperty] = "tableProperty",
  [sym_nonTableKwName] = "nonTableKwName",
  [sym_keyElement] = "keyElement",
  [sym_prefixedNonType] = "prefixedNonType",
  [sym_argumentList] = "argumentList",
  [sym_actionListElement] = "actionListElement",
  [sym_argument] = "argument",
  [sym_parserDeclaration] = "parserDeclaration",
  [sym_parserTypeDeclaration] = "parserTypeDeclaration",
  [sym_parserLocalElement] = "parserLocalElement",
  [sym_parserState] = "parserState",
  [sym_stateExpression] = "stateExpression",
  [sym_parserStatement] = "parserStatement",
  [sym_parameterList] = "parameterList",
  [sym_parameter] = "parameter",
  [sym_typedefDeclaration] = "typedefDeclaration",
  [sym_structField] = "structField",
  [sym_typeRef] = "typeRef",
  [sym_baseType] = "baseType",
  [sym_initializer] = "initializer",
  [sym_expression] = "expression",
  [sym_typeName] = "typeName",
  [sym_name] = "name",
  [sym_lvalue] = "lvalue",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_headerTypeDeclaration_repeat1] = "headerTypeDeclaration_repeat1",
  [aux_sym_controlDeclaration_repeat1] = "controlDeclaration_repeat1",
  [aux_sym_blockStatement_repeat1] = "blockStatement_repeat1",
  [aux_sym_assignmentOrMethodCallStatement_repeat1] = "assignmentOrMethodCallStatement_repeat1",
  [aux_sym_tableDeclaration_repeat1] = "tableDeclaration_repeat1",
  [aux_sym_tableProperty_repeat1] = "tableProperty_repeat1",
  [aux_sym_tableProperty_repeat2] = "tableProperty_repeat2",
  [aux_sym_argumentList_repeat1] = "argumentList_repeat1",
  [aux_sym_parserDeclaration_repeat1] = "parserDeclaration_repeat1",
  [aux_sym_parserDeclaration_repeat2] = "parserDeclaration_repeat2",
  [aux_sym_parserState_repeat1] = "parserState_repeat1",
  [aux_sym_parameterList_repeat1] = "parameterList_repeat1",
};

static TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_const] = anon_sym_const,
  [anon_sym_EQ] = anon_sym_EQ,
  [anon_sym_SEMI] = anon_sym_SEMI,
  [anon_sym_header] = anon_sym_header,
  [anon_sym_LBRACE] = anon_sym_LBRACE,
  [anon_sym_RBRACE] = anon_sym_RBRACE,
  [anon_sym_struct] = anon_sym_struct,
  [anon_sym_control] = anon_sym_control,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [anon_sym_apply] = anon_sym_apply,
  [anon_sym_action] = anon_sym_action,
  [anon_sym_table] = anon_sym_table,
  [anon_sym_key] = anon_sym_key,
  [anon_sym_actions] = anon_sym_actions,
  [anon_sym_state] = anon_sym_state,
  [anon_sym_type] = anon_sym_type,
  [anon_sym_COLON] = anon_sym_COLON,
  [anon_sym_DOT] = anon_sym_DOT,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_dontcare] = anon_sym_dontcare,
  [anon_sym_parser] = anon_sym_parser,
  [anon_sym_transition] = anon_sym_transition,
  [anon_sym_inout] = anon_sym_inout,
  [anon_sym_out] = anon_sym_out,
  [anon_sym_in] = anon_sym_in,
  [anon_sym_typedef] = anon_sym_typedef,
  [anon_sym_bit] = anon_sym_bit,
  [anon_sym_LT] = anon_sym_LT,
  [anon_sym_GT] = anon_sym_GT,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
  [sym_IDENTIFIER] = sym_IDENTIFIER,
  [sym_INTEGER] = sym_INTEGER,
  [sym_source_file] = sym_source_file,
  [sym_declaration] = sym_declaration,
  [sym_constantDeclaration] = sym_constantDeclaration,
  [sym_typeDeclaration] = sym_typeDeclaration,
  [sym_derivedTypeDeclaration] = sym_derivedTypeDeclaration,
  [sym_headerTypeDeclaration] = sym_headerTypeDeclaration,
  [sym_structTypeDeclaration] = sym_structTypeDeclaration,
  [sym_controlDeclaration] = sym_controlDeclaration,
  [sym_blockStatement] = sym_blockStatement,
  [sym_statementOrDeclaration] = sym_statementOrDeclaration,
  [sym_statement] = sym_statement,
  [sym_assignmentOrMethodCallStatement] = sym_assignmentOrMethodCallStatement,
  [sym_controlLocalDeclaration] = sym_controlLocalDeclaration,
  [sym_actionDeclaration] = sym_actionDeclaration,
  [sym_tableDeclaration] = sym_tableDeclaration,
  [sym_tableProperty] = sym_tableProperty,
  [sym_nonTableKwName] = sym_nonTableKwName,
  [sym_keyElement] = sym_keyElement,
  [sym_prefixedNonType] = sym_prefixedNonType,
  [sym_argumentList] = sym_argumentList,
  [sym_actionListElement] = sym_actionListElement,
  [sym_argument] = sym_argument,
  [sym_parserDeclaration] = sym_parserDeclaration,
  [sym_parserTypeDeclaration] = sym_parserTypeDeclaration,
  [sym_parserLocalElement] = sym_parserLocalElement,
  [sym_parserState] = sym_parserState,
  [sym_stateExpression] = sym_stateExpression,
  [sym_parserStatement] = sym_parserStatement,
  [sym_parameterList] = sym_parameterList,
  [sym_parameter] = sym_parameter,
  [sym_typedefDeclaration] = sym_typedefDeclaration,
  [sym_structField] = sym_structField,
  [sym_typeRef] = sym_typeRef,
  [sym_baseType] = sym_baseType,
  [sym_initializer] = sym_initializer,
  [sym_expression] = sym_expression,
  [sym_typeName] = sym_typeName,
  [sym_name] = sym_name,
  [sym_lvalue] = sym_lvalue,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_headerTypeDeclaration_repeat1] = aux_sym_headerTypeDeclaration_repeat1,
  [aux_sym_controlDeclaration_repeat1] = aux_sym_controlDeclaration_repeat1,
  [aux_sym_blockStatement_repeat1] = aux_sym_blockStatement_repeat1,
  [aux_sym_assignmentOrMethodCallStatement_repeat1] = aux_sym_assignmentOrMethodCallStatement_repeat1,
  [aux_sym_tableDeclaration_repeat1] = aux_sym_tableDeclaration_repeat1,
  [aux_sym_tableProperty_repeat1] = aux_sym_tableProperty_repeat1,
  [aux_sym_tableProperty_repeat2] = aux_sym_tableProperty_repeat2,
  [aux_sym_argumentList_repeat1] = aux_sym_argumentList_repeat1,
  [aux_sym_parserDeclaration_repeat1] = aux_sym_parserDeclaration_repeat1,
  [aux_sym_parserDeclaration_repeat2] = aux_sym_parserDeclaration_repeat2,
  [aux_sym_parserState_repeat1] = aux_sym_parserState_repeat1,
  [aux_sym_parameterList_repeat1] = aux_sym_parameterList_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_const] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_EQ] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_SEMI] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_header] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_struct] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_control] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_apply] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_action] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_table] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_key] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_actions] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_state] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_type] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COLON] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_dontcare] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_parser] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_transition] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_inout] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_out] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_in] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_typedef] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_bit] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_GT] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACK] = {
    .visible = true,
    .named = false,
  },
  [sym_IDENTIFIER] = {
    .visible = true,
    .named = true,
  },
  [sym_INTEGER] = {
    .visible = true,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym_declaration] = {
    .visible = true,
    .named = true,
  },
  [sym_constantDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_typeDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_derivedTypeDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_headerTypeDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_structTypeDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_controlDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_blockStatement] = {
    .visible = true,
    .named = true,
  },
  [sym_statementOrDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_statement] = {
    .visible = true,
    .named = true,
  },
  [sym_assignmentOrMethodCallStatement] = {
    .visible = true,
    .named = true,
  },
  [sym_controlLocalDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_actionDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_tableDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_tableProperty] = {
    .visible = true,
    .named = true,
  },
  [sym_nonTableKwName] = {
    .visible = true,
    .named = true,
  },
  [sym_keyElement] = {
    .visible = true,
    .named = true,
  },
  [sym_prefixedNonType] = {
    .visible = true,
    .named = true,
  },
  [sym_argumentList] = {
    .visible = true,
    .named = true,
  },
  [sym_actionListElement] = {
    .visible = true,
    .named = true,
  },
  [sym_argument] = {
    .visible = true,
    .named = true,
  },
  [sym_parserDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_parserTypeDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_parserLocalElement] = {
    .visible = true,
    .named = true,
  },
  [sym_parserState] = {
    .visible = true,
    .named = true,
  },
  [sym_stateExpression] = {
    .visible = true,
    .named = true,
  },
  [sym_parserStatement] = {
    .visible = true,
    .named = true,
  },
  [sym_parameterList] = {
    .visible = true,
    .named = true,
  },
  [sym_parameter] = {
    .visible = true,
    .named = true,
  },
  [sym_typedefDeclaration] = {
    .visible = true,
    .named = true,
  },
  [sym_structField] = {
    .visible = true,
    .named = true,
  },
  [sym_typeRef] = {
    .visible = true,
    .named = true,
  },
  [sym_baseType] = {
    .visible = true,
    .named = true,
  },
  [sym_initializer] = {
    .visible = true,
    .named = true,
  },
  [sym_expression] = {
    .visible = true,
    .named = true,
  },
  [sym_typeName] = {
    .visible = true,
    .named = true,
  },
  [sym_name] = {
    .visible = true,
    .named = true,
  },
  [sym_lvalue] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_headerTypeDeclaration_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_controlDeclaration_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_blockStatement_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_assignmentOrMethodCallStatement_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_tableDeclaration_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_tableProperty_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_tableProperty_repeat2] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_argumentList_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_parserDeclaration_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_parserDeclaration_repeat2] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_parserState_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_parameterList_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static TSSymbol ts_alias_sequences[1][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(77);
      if (lookahead == '(') ADVANCE(87);
      if (lookahead == ')') ADVANCE(88);
      if (lookahead == ',') ADVANCE(102);
      if (lookahead == '.') ADVANCE(101);
      if (lookahead == '0') ADVANCE(157);
      if (lookahead == ':') ADVANCE(100);
      if (lookahead == ';') ADVANCE(81);
      if (lookahead == '<') ADVANCE(116);
      if (lookahead == '=') ADVANCE(80);
      if (lookahead == '>') ADVANCE(117);
      if (lookahead == '[') ADVANCE(118);
      if (lookahead == ']') ADVANCE(119);
      if (lookahead == 'a') ADVANCE(15);
      if (lookahead == 'b') ADVANCE(31);
      if (lookahead == 'c') ADVANCE(44);
      if (lookahead == 'd') ADVANCE(45);
      if (lookahead == 'h') ADVANCE(26);
      if (lookahead == 'i') ADVANCE(38);
      if (lookahead == 'k') ADVANCE(20);
      if (lookahead == 'o') ADVANCE(71);
      if (lookahead == 'p') ADVANCE(5);
      if (lookahead == 's') ADVANCE(60);
      if (lookahead == 't') ADVANCE(6);
      if (lookahead == '{') ADVANCE(83);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(0)
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(158);
      END_STATE();
    case 1:
      if (lookahead == '(') ADVANCE(87);
      if (lookahead == ')') ADVANCE(88);
      if (lookahead == ',') ADVANCE(102);
      if (lookahead == '.') ADVANCE(101);
      if (lookahead == '0') ADVANCE(157);
      if (lookahead == ':') ADVANCE(100);
      if (lookahead == ';') ADVANCE(81);
      if (lookahead == '<') ADVANCE(116);
      if (lookahead == '=') ADVANCE(80);
      if (lookahead == '[') ADVANCE(118);
      if (lookahead == ']') ADVANCE(119);
      if (lookahead == '{') ADVANCE(83);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(1)
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(158);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 2:
      if (lookahead == '(') ADVANCE(87);
      if (lookahead == ')') ADVANCE(88);
      if (lookahead == ',') ADVANCE(102);
      if (lookahead == '.') ADVANCE(101);
      if (lookahead == '0') ADVANCE(157);
      if (lookahead == ':') ADVANCE(100);
      if (lookahead == ';') ADVANCE(81);
      if (lookahead == '=') ADVANCE(80);
      if (lookahead == ']') ADVANCE(119);
      if (lookahead == 'd') ADVANCE(136);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(2)
      if (('1' <= lookahead && lookahead <= '9')) ADVANCE(158);
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 3:
      if (lookahead == ')') ADVANCE(88);
      if (lookahead == 'b') ADVANCE(128);
      if (lookahead == 'i') ADVANCE(131);
      if (lookahead == 'o') ADVANCE(151);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(3)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 4:
      if (lookahead == '.') ADVANCE(101);
      if (lookahead == 'c') ADVANCE(135);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(4)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 5:
      if (lookahead == 'a') ADVANCE(52);
      END_STATE();
    case 6:
      if (lookahead == 'a') ADVANCE(14);
      if (lookahead == 'r') ADVANCE(10);
      if (lookahead == 'y') ADVANCE(50);
      END_STATE();
    case 7:
      if (lookahead == 'a') ADVANCE(14);
      if (lookahead == 'r') ADVANCE(10);
      if (lookahead == 'y') ADVANCE(51);
      END_STATE();
    case 8:
      if (lookahead == 'a') ADVANCE(18);
      END_STATE();
    case 9:
      if (lookahead == 'a') ADVANCE(123);
      if (lookahead == 'k') ADVANCE(127);
      if (lookahead == 's') ADVANCE(149);
      if (lookahead == 't') ADVANCE(155);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(9)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('b' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 10:
      if (lookahead == 'a') ADVANCE(42);
      END_STATE();
    case 11:
      if (lookahead == 'a') ADVANCE(56);
      END_STATE();
    case 12:
      if (lookahead == 'a') ADVANCE(68);
      if (lookahead == 'r') ADVANCE(70);
      END_STATE();
    case 13:
      if (lookahead == 'b') ADVANCE(128);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(13)
      if (('A' <= lookahead && lookahead <= 'Z') ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 14:
      if (lookahead == 'b') ADVANCE(37);
      END_STATE();
    case 15:
      if (lookahead == 'c') ADVANCE(67);
      if (lookahead == 'p') ADVANCE(49);
      END_STATE();
    case 16:
      if (lookahead == 'c') ADVANCE(66);
      END_STATE();
    case 17:
      if (lookahead == 'c') ADVANCE(11);
      END_STATE();
    case 18:
      if (lookahead == 'd') ADVANCE(27);
      END_STATE();
    case 19:
      if (lookahead == 'd') ADVANCE(24);
      END_STATE();
    case 20:
      if (lookahead == 'e') ADVANCE(73);
      END_STATE();
    case 21:
      if (lookahead == 'e') ADVANCE(98);
      END_STATE();
    case 22:
      if (lookahead == 'e') ADVANCE(96);
      END_STATE();
    case 23:
      if (lookahead == 'e') ADVANCE(92);
      END_STATE();
    case 24:
      if (lookahead == 'e') ADVANCE(30);
      END_STATE();
    case 25:
      if (lookahead == 'e') ADVANCE(103);
      END_STATE();
    case 26:
      if (lookahead == 'e') ADVANCE(8);
      END_STATE();
    case 27:
      if (lookahead == 'e') ADVANCE(53);
      END_STATE();
    case 28:
      if (lookahead == 'e') ADVANCE(54);
      END_STATE();
    case 29:
      if (lookahead == 'e') ADVANCE(19);
      END_STATE();
    case 30:
      if (lookahead == 'f') ADVANCE(113);
      END_STATE();
    case 31:
      if (lookahead == 'i') ADVANCE(61);
      END_STATE();
    case 32:
      if (lookahead == 'i') ADVANCE(47);
      END_STATE();
    case 33:
      if (lookahead == 'i') ADVANCE(48);
      END_STATE();
    case 34:
      if (lookahead == 'i') ADVANCE(69);
      END_STATE();
    case 35:
      if (lookahead == 'l') ADVANCE(86);
      END_STATE();
    case 36:
      if (lookahead == 'l') ADVANCE(74);
      END_STATE();
    case 37:
      if (lookahead == 'l') ADVANCE(23);
      END_STATE();
    case 38:
      if (lookahead == 'n') ADVANCE(111);
      END_STATE();
    case 39:
      if (lookahead == 'n') ADVANCE(58);
      END_STATE();
    case 40:
      if (lookahead == 'n') ADVANCE(91);
      END_STATE();
    case 41:
      if (lookahead == 'n') ADVANCE(106);
      END_STATE();
    case 42:
      if (lookahead == 'n') ADVANCE(59);
      END_STATE();
    case 43:
      if (lookahead == 'n') ADVANCE(63);
      END_STATE();
    case 44:
      if (lookahead == 'o') ADVANCE(39);
      END_STATE();
    case 45:
      if (lookahead == 'o') ADVANCE(43);
      END_STATE();
    case 46:
      if (lookahead == 'o') ADVANCE(35);
      END_STATE();
    case 47:
      if (lookahead == 'o') ADVANCE(40);
      END_STATE();
    case 48:
      if (lookahead == 'o') ADVANCE(41);
      END_STATE();
    case 49:
      if (lookahead == 'p') ADVANCE(36);
      END_STATE();
    case 50:
      if (lookahead == 'p') ADVANCE(21);
      END_STATE();
    case 51:
      if (lookahead == 'p') ADVANCE(29);
      END_STATE();
    case 52:
      if (lookahead == 'r') ADVANCE(57);
      END_STATE();
    case 53:
      if (lookahead == 'r') ADVANCE(82);
      END_STATE();
    case 54:
      if (lookahead == 'r') ADVANCE(105);
      END_STATE();
    case 55:
      if (lookahead == 'r') ADVANCE(46);
      END_STATE();
    case 56:
      if (lookahead == 'r') ADVANCE(25);
      END_STATE();
    case 57:
      if (lookahead == 's') ADVANCE(28);
      END_STATE();
    case 58:
      if (lookahead == 's') ADVANCE(64);
      if (lookahead == 't') ADVANCE(55);
      END_STATE();
    case 59:
      if (lookahead == 's') ADVANCE(34);
      END_STATE();
    case 60:
      if (lookahead == 't') ADVANCE(12);
      END_STATE();
    case 61:
      if (lookahead == 't') ADVANCE(114);
      END_STATE();
    case 62:
      if (lookahead == 't') ADVANCE(109);
      END_STATE();
    case 63:
      if (lookahead == 't') ADVANCE(17);
      END_STATE();
    case 64:
      if (lookahead == 't') ADVANCE(78);
      END_STATE();
    case 65:
      if (lookahead == 't') ADVANCE(107);
      END_STATE();
    case 66:
      if (lookahead == 't') ADVANCE(85);
      END_STATE();
    case 67:
      if (lookahead == 't') ADVANCE(32);
      END_STATE();
    case 68:
      if (lookahead == 't') ADVANCE(22);
      END_STATE();
    case 69:
      if (lookahead == 't') ADVANCE(33);
      END_STATE();
    case 70:
      if (lookahead == 'u') ADVANCE(16);
      END_STATE();
    case 71:
      if (lookahead == 'u') ADVANCE(62);
      END_STATE();
    case 72:
      if (lookahead == 'u') ADVANCE(65);
      END_STATE();
    case 73:
      if (lookahead == 'y') ADVANCE(93);
      END_STATE();
    case 74:
      if (lookahead == 'y') ADVANCE(89);
      END_STATE();
    case 75:
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(158);
      END_STATE();
    case 76:
      if (eof) ADVANCE(77);
      if (lookahead == 'a') ADVANCE(15);
      if (lookahead == 'c') ADVANCE(44);
      if (lookahead == 'h') ADVANCE(26);
      if (lookahead == 'p') ADVANCE(5);
      if (lookahead == 's') ADVANCE(60);
      if (lookahead == 't') ADVANCE(7);
      if (lookahead == '}') ADVANCE(84);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') SKIP(76)
      END_STATE();
    case 77:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 78:
      ACCEPT_TOKEN(anon_sym_const);
      END_STATE();
    case 79:
      ACCEPT_TOKEN(anon_sym_const);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 80:
      ACCEPT_TOKEN(anon_sym_EQ);
      END_STATE();
    case 81:
      ACCEPT_TOKEN(anon_sym_SEMI);
      END_STATE();
    case 82:
      ACCEPT_TOKEN(anon_sym_header);
      END_STATE();
    case 83:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 84:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 85:
      ACCEPT_TOKEN(anon_sym_struct);
      END_STATE();
    case 86:
      ACCEPT_TOKEN(anon_sym_control);
      END_STATE();
    case 87:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 88:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 89:
      ACCEPT_TOKEN(anon_sym_apply);
      END_STATE();
    case 90:
      ACCEPT_TOKEN(anon_sym_apply);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 91:
      ACCEPT_TOKEN(anon_sym_action);
      END_STATE();
    case 92:
      ACCEPT_TOKEN(anon_sym_table);
      END_STATE();
    case 93:
      ACCEPT_TOKEN(anon_sym_key);
      END_STATE();
    case 94:
      ACCEPT_TOKEN(anon_sym_key);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 95:
      ACCEPT_TOKEN(anon_sym_actions);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 96:
      ACCEPT_TOKEN(anon_sym_state);
      END_STATE();
    case 97:
      ACCEPT_TOKEN(anon_sym_state);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 98:
      ACCEPT_TOKEN(anon_sym_type);
      if (lookahead == 'd') ADVANCE(24);
      END_STATE();
    case 99:
      ACCEPT_TOKEN(anon_sym_type);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 100:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 101:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 102:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 103:
      ACCEPT_TOKEN(anon_sym_dontcare);
      END_STATE();
    case 104:
      ACCEPT_TOKEN(anon_sym_dontcare);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 105:
      ACCEPT_TOKEN(anon_sym_parser);
      END_STATE();
    case 106:
      ACCEPT_TOKEN(anon_sym_transition);
      END_STATE();
    case 107:
      ACCEPT_TOKEN(anon_sym_inout);
      END_STATE();
    case 108:
      ACCEPT_TOKEN(anon_sym_inout);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 109:
      ACCEPT_TOKEN(anon_sym_out);
      END_STATE();
    case 110:
      ACCEPT_TOKEN(anon_sym_out);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 111:
      ACCEPT_TOKEN(anon_sym_in);
      if (lookahead == 'o') ADVANCE(72);
      END_STATE();
    case 112:
      ACCEPT_TOKEN(anon_sym_in);
      if (lookahead == 'o') ADVANCE(152);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 113:
      ACCEPT_TOKEN(anon_sym_typedef);
      END_STATE();
    case 114:
      ACCEPT_TOKEN(anon_sym_bit);
      END_STATE();
    case 115:
      ACCEPT_TOKEN(anon_sym_bit);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 116:
      ACCEPT_TOKEN(anon_sym_LT);
      END_STATE();
    case 117:
      ACCEPT_TOKEN(anon_sym_GT);
      END_STATE();
    case 118:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 119:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 120:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'a') ADVANCE(140);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('b' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 121:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'a') ADVANCE(150);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('b' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 122:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'c') ADVANCE(120);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 123:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'c') ADVANCE(148);
      if (lookahead == 'p') ADVANCE(138);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 124:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'e') ADVANCE(104);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 125:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'e') ADVANCE(99);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 126:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'e') ADVANCE(97);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 127:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'e') ADVANCE(153);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 128:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'i') ADVANCE(143);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 129:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'i') ADVANCE(137);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 130:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'l') ADVANCE(154);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 131:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'n') ADVANCE(112);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 132:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'n') ADVANCE(142);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 133:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'n') ADVANCE(141);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 134:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'n') ADVANCE(147);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 135:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'o') ADVANCE(132);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 136:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'o') ADVANCE(134);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 137:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'o') ADVANCE(133);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 138:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'p') ADVANCE(130);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 139:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'p') ADVANCE(125);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 140:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'r') ADVANCE(124);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 141:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 's') ADVANCE(95);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 142:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 's') ADVANCE(146);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 143:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(115);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 144:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(110);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 145:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(108);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 146:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(79);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 147:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(122);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 148:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(129);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 149:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(121);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 150:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 't') ADVANCE(126);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 151:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'u') ADVANCE(144);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 152:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'u') ADVANCE(145);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 153:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'y') ADVANCE(94);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 154:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'y') ADVANCE(90);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 155:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (lookahead == 'y') ADVANCE(139);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 156:
      ACCEPT_TOKEN(sym_IDENTIFIER);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(156);
      END_STATE();
    case 157:
      ACCEPT_TOKEN(sym_INTEGER);
      if (lookahead == 'x') ADVANCE(75);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(158);
      END_STATE();
    case 158:
      ACCEPT_TOKEN(sym_INTEGER);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(158);
      END_STATE();
    default:
      return false;
  }
}

static TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 76},
  [2] = {.lex_state = 76},
  [3] = {.lex_state = 76},
  [4] = {.lex_state = 76},
  [5] = {.lex_state = 3},
  [6] = {.lex_state = 3},
  [7] = {.lex_state = 1},
  [8] = {.lex_state = 4},
  [9] = {.lex_state = 4},
  [10] = {.lex_state = 3},
  [11] = {.lex_state = 4},
  [12] = {.lex_state = 2},
  [13] = {.lex_state = 2},
  [14] = {.lex_state = 9},
  [15] = {.lex_state = 2},
  [16] = {.lex_state = 2},
  [17] = {.lex_state = 9},
  [18] = {.lex_state = 3},
  [19] = {.lex_state = 9},
  [20] = {.lex_state = 2},
  [21] = {.lex_state = 2},
  [22] = {.lex_state = 13},
  [23] = {.lex_state = 13},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 2},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 2},
  [28] = {.lex_state = 13},
  [29] = {.lex_state = 2},
  [30] = {.lex_state = 2},
  [31] = {.lex_state = 2},
  [32] = {.lex_state = 0},
  [33] = {.lex_state = 13},
  [34] = {.lex_state = 13},
  [35] = {.lex_state = 0},
  [36] = {.lex_state = 2},
  [37] = {.lex_state = 0},
  [38] = {.lex_state = 76},
  [39] = {.lex_state = 76},
  [40] = {.lex_state = 76},
  [41] = {.lex_state = 76},
  [42] = {.lex_state = 76},
  [43] = {.lex_state = 76},
  [44] = {.lex_state = 76},
  [45] = {.lex_state = 76},
  [46] = {.lex_state = 76},
  [47] = {.lex_state = 76},
  [48] = {.lex_state = 76},
  [49] = {.lex_state = 2},
  [50] = {.lex_state = 76},
  [51] = {.lex_state = 1},
  [52] = {.lex_state = 1},
  [53] = {.lex_state = 9},
  [54] = {.lex_state = 76},
  [55] = {.lex_state = 1},
  [56] = {.lex_state = 9},
  [57] = {.lex_state = 2},
  [58] = {.lex_state = 1},
  [59] = {.lex_state = 0},
  [60] = {.lex_state = 13},
  [61] = {.lex_state = 0},
  [62] = {.lex_state = 1},
  [63] = {.lex_state = 13},
  [64] = {.lex_state = 13},
  [65] = {.lex_state = 13},
  [66] = {.lex_state = 1},
  [67] = {.lex_state = 2},
  [68] = {.lex_state = 2},
  [69] = {.lex_state = 2},
  [70] = {.lex_state = 0},
  [71] = {.lex_state = 0},
  [72] = {.lex_state = 0},
  [73] = {.lex_state = 0},
  [74] = {.lex_state = 0},
  [75] = {.lex_state = 1},
  [76] = {.lex_state = 0},
  [77] = {.lex_state = 1},
  [78] = {.lex_state = 1},
  [79] = {.lex_state = 0},
  [80] = {.lex_state = 1},
  [81] = {.lex_state = 0},
  [82] = {.lex_state = 0},
  [83] = {.lex_state = 1},
  [84] = {.lex_state = 4},
  [85] = {.lex_state = 0},
  [86] = {.lex_state = 0},
  [87] = {.lex_state = 0},
  [88] = {.lex_state = 0},
  [89] = {.lex_state = 1},
  [90] = {.lex_state = 0},
  [91] = {.lex_state = 4},
  [92] = {.lex_state = 1},
  [93] = {.lex_state = 1},
  [94] = {.lex_state = 1},
  [95] = {.lex_state = 0},
  [96] = {.lex_state = 0},
  [97] = {.lex_state = 0},
  [98] = {.lex_state = 0},
  [99] = {.lex_state = 4},
  [100] = {.lex_state = 0},
  [101] = {.lex_state = 4},
  [102] = {.lex_state = 0},
  [103] = {.lex_state = 4},
  [104] = {.lex_state = 0},
  [105] = {.lex_state = 0},
  [106] = {.lex_state = 0},
  [107] = {.lex_state = 1},
  [108] = {.lex_state = 1},
  [109] = {.lex_state = 0},
  [110] = {.lex_state = 0},
  [111] = {.lex_state = 1},
  [112] = {.lex_state = 1},
  [113] = {.lex_state = 0},
  [114] = {.lex_state = 0},
  [115] = {.lex_state = 0},
  [116] = {.lex_state = 13},
  [117] = {.lex_state = 0},
  [118] = {.lex_state = 0},
  [119] = {.lex_state = 0},
  [120] = {.lex_state = 0},
  [121] = {.lex_state = 0},
  [122] = {.lex_state = 0},
  [123] = {.lex_state = 1},
  [124] = {.lex_state = 1},
  [125] = {.lex_state = 1},
  [126] = {.lex_state = 1},
  [127] = {.lex_state = 0},
  [128] = {.lex_state = 1},
  [129] = {.lex_state = 0},
  [130] = {.lex_state = 1},
  [131] = {.lex_state = 0},
  [132] = {.lex_state = 1},
  [133] = {.lex_state = 1},
  [134] = {.lex_state = 1},
  [135] = {.lex_state = 1},
  [136] = {.lex_state = 0},
  [137] = {.lex_state = 0},
  [138] = {.lex_state = 0},
  [139] = {.lex_state = 1},
  [140] = {.lex_state = 0},
  [141] = {.lex_state = 1},
  [142] = {.lex_state = 0},
  [143] = {.lex_state = 1},
  [144] = {.lex_state = 0},
  [145] = {.lex_state = 0},
  [146] = {.lex_state = 1},
  [147] = {.lex_state = 1},
  [148] = {.lex_state = 1},
  [149] = {.lex_state = 0},
  [150] = {.lex_state = 1},
  [151] = {.lex_state = 0},
  [152] = {.lex_state = 0},
  [153] = {.lex_state = 1},
  [154] = {.lex_state = 1},
  [155] = {.lex_state = 0},
  [156] = {.lex_state = 0},
  [157] = {.lex_state = 0},
  [158] = {.lex_state = 1},
  [159] = {.lex_state = 0},
  [160] = {.lex_state = 0},
  [161] = {.lex_state = 0},
  [162] = {.lex_state = 0},
  [163] = {.lex_state = 0},
  [164] = {.lex_state = 0},
  [165] = {.lex_state = 0},
  [166] = {.lex_state = 0},
  [167] = {.lex_state = 0},
  [168] = {.lex_state = 0},
  [169] = {.lex_state = 0},
  [170] = {.lex_state = 0},
  [171] = {.lex_state = 0},
  [172] = {.lex_state = 0},
  [173] = {.lex_state = 0},
  [174] = {.lex_state = 0},
  [175] = {.lex_state = 0},
  [176] = {.lex_state = 0},
  [177] = {.lex_state = 0},
  [178] = {.lex_state = 1},
  [179] = {.lex_state = 0},
  [180] = {.lex_state = 0},
  [181] = {.lex_state = 0},
  [182] = {.lex_state = 0},
  [183] = {.lex_state = 1},
  [184] = {.lex_state = 1},
  [185] = {.lex_state = 0},
  [186] = {.lex_state = 0},
  [187] = {.lex_state = 0},
  [188] = {.lex_state = 0},
  [189] = {.lex_state = 0},
  [190] = {.lex_state = 0},
  [191] = {.lex_state = 0},
  [192] = {.lex_state = 0},
  [193] = {.lex_state = 0},
  [194] = {.lex_state = 0},
  [195] = {.lex_state = 0},
  [196] = {.lex_state = 0},
  [197] = {.lex_state = 0},
  [198] = {.lex_state = 0},
  [199] = {.lex_state = 0},
  [200] = {.lex_state = 0},
  [201] = {.lex_state = 1},
  [202] = {.lex_state = 0},
  [203] = {.lex_state = 0},
  [204] = {.lex_state = 1},
  [205] = {.lex_state = 0},
};

static uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_const] = ACTIONS(1),
    [anon_sym_EQ] = ACTIONS(1),
    [anon_sym_SEMI] = ACTIONS(1),
    [anon_sym_header] = ACTIONS(1),
    [anon_sym_LBRACE] = ACTIONS(1),
    [anon_sym_RBRACE] = ACTIONS(1),
    [anon_sym_struct] = ACTIONS(1),
    [anon_sym_control] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_apply] = ACTIONS(1),
    [anon_sym_action] = ACTIONS(1),
    [anon_sym_table] = ACTIONS(1),
    [anon_sym_key] = ACTIONS(1),
    [anon_sym_state] = ACTIONS(1),
    [anon_sym_type] = ACTIONS(1),
    [anon_sym_COLON] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_dontcare] = ACTIONS(1),
    [anon_sym_parser] = ACTIONS(1),
    [anon_sym_transition] = ACTIONS(1),
    [anon_sym_inout] = ACTIONS(1),
    [anon_sym_out] = ACTIONS(1),
    [anon_sym_in] = ACTIONS(1),
    [anon_sym_typedef] = ACTIONS(1),
    [anon_sym_bit] = ACTIONS(1),
    [anon_sym_LT] = ACTIONS(1),
    [anon_sym_GT] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
    [sym_INTEGER] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(173),
    [sym_declaration] = STATE(3),
    [sym_constantDeclaration] = STATE(47),
    [sym_typeDeclaration] = STATE(47),
    [sym_derivedTypeDeclaration] = STATE(45),
    [sym_headerTypeDeclaration] = STATE(39),
    [sym_structTypeDeclaration] = STATE(39),
    [sym_controlDeclaration] = STATE(47),
    [sym_parserDeclaration] = STATE(47),
    [sym_parserTypeDeclaration] = STATE(205),
    [sym_typedefDeclaration] = STATE(45),
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_const] = ACTIONS(5),
    [anon_sym_header] = ACTIONS(7),
    [anon_sym_struct] = ACTIONS(9),
    [anon_sym_control] = ACTIONS(11),
    [anon_sym_parser] = ACTIONS(13),
    [anon_sym_typedef] = ACTIONS(15),
  },
};

static uint16_t ts_small_parse_table[] = {
  [0] = 12,
    ACTIONS(17), 1,
      ts_builtin_sym_end,
    ACTIONS(19), 1,
      anon_sym_const,
    ACTIONS(22), 1,
      anon_sym_header,
    ACTIONS(25), 1,
      anon_sym_struct,
    ACTIONS(28), 1,
      anon_sym_control,
    ACTIONS(31), 1,
      anon_sym_parser,
    ACTIONS(34), 1,
      anon_sym_typedef,
    STATE(205), 1,
      sym_parserTypeDeclaration,
    STATE(2), 2,
      sym_declaration,
      aux_sym_source_file_repeat1,
    STATE(39), 2,
      sym_headerTypeDeclaration,
      sym_structTypeDeclaration,
    STATE(45), 2,
      sym_derivedTypeDeclaration,
      sym_typedefDeclaration,
    STATE(47), 4,
      sym_constantDeclaration,
      sym_typeDeclaration,
      sym_controlDeclaration,
      sym_parserDeclaration,
  [43] = 12,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(7), 1,
      anon_sym_header,
    ACTIONS(9), 1,
      anon_sym_struct,
    ACTIONS(11), 1,
      anon_sym_control,
    ACTIONS(13), 1,
      anon_sym_parser,
    ACTIONS(15), 1,
      anon_sym_typedef,
    ACTIONS(37), 1,
      ts_builtin_sym_end,
    STATE(205), 1,
      sym_parserTypeDeclaration,
    STATE(2), 2,
      sym_declaration,
      aux_sym_source_file_repeat1,
    STATE(39), 2,
      sym_headerTypeDeclaration,
      sym_structTypeDeclaration,
    STATE(45), 2,
      sym_derivedTypeDeclaration,
      sym_typedefDeclaration,
    STATE(47), 4,
      sym_constantDeclaration,
      sym_typeDeclaration,
      sym_controlDeclaration,
      sym_parserDeclaration,
  [86] = 1,
    ACTIONS(39), 13,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_RBRACE,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
      anon_sym_state,
      anon_sym_parser,
      anon_sym_transition,
      anon_sym_typedef,
  [102] = 9,
    ACTIONS(41), 1,
      anon_sym_RPAREN,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(118), 1,
      sym_parameter,
    STATE(147), 1,
      sym_typeRef,
    STATE(155), 1,
      sym_parameterList,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
    ACTIONS(43), 3,
      anon_sym_inout,
      anon_sym_out,
      anon_sym_in,
  [133] = 9,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    ACTIONS(49), 1,
      anon_sym_RPAREN,
    STATE(118), 1,
      sym_parameter,
    STATE(147), 1,
      sym_typeRef,
    STATE(157), 1,
      sym_parameterList,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
    ACTIONS(43), 3,
      anon_sym_inout,
      anon_sym_out,
      anon_sym_in,
  [164] = 1,
    ACTIONS(51), 11,
      anon_sym_EQ,
      anon_sym_SEMI,
      anon_sym_LBRACE,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_LBRACK,
      anon_sym_RBRACK,
      sym_IDENTIFIER,
  [178] = 9,
    ACTIONS(53), 1,
      anon_sym_const,
    ACTIONS(55), 1,
      anon_sym_RBRACE,
    ACTIONS(57), 1,
      anon_sym_DOT,
    ACTIONS(59), 1,
      sym_IDENTIFIER,
    STATE(97), 1,
      sym_lvalue,
    STATE(98), 1,
      sym_prefixedNonType,
    STATE(99), 1,
      sym_assignmentOrMethodCallStatement,
    STATE(9), 2,
      sym_statementOrDeclaration,
      aux_sym_blockStatement_repeat1,
    STATE(101), 2,
      sym_constantDeclaration,
      sym_statement,
  [208] = 9,
    ACTIONS(53), 1,
      anon_sym_const,
    ACTIONS(57), 1,
      anon_sym_DOT,
    ACTIONS(59), 1,
      sym_IDENTIFIER,
    ACTIONS(61), 1,
      anon_sym_RBRACE,
    STATE(97), 1,
      sym_lvalue,
    STATE(98), 1,
      sym_prefixedNonType,
    STATE(99), 1,
      sym_assignmentOrMethodCallStatement,
    STATE(11), 2,
      sym_statementOrDeclaration,
      aux_sym_blockStatement_repeat1,
    STATE(101), 2,
      sym_constantDeclaration,
      sym_statement,
  [238] = 8,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(118), 1,
      sym_parameter,
    STATE(147), 1,
      sym_typeRef,
    STATE(190), 1,
      sym_parameterList,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
    ACTIONS(43), 3,
      anon_sym_inout,
      anon_sym_out,
      anon_sym_in,
  [266] = 9,
    ACTIONS(63), 1,
      anon_sym_const,
    ACTIONS(66), 1,
      anon_sym_RBRACE,
    ACTIONS(68), 1,
      anon_sym_DOT,
    ACTIONS(71), 1,
      sym_IDENTIFIER,
    STATE(97), 1,
      sym_lvalue,
    STATE(98), 1,
      sym_prefixedNonType,
    STATE(99), 1,
      sym_assignmentOrMethodCallStatement,
    STATE(11), 2,
      sym_statementOrDeclaration,
      aux_sym_blockStatement_repeat1,
    STATE(101), 2,
      sym_constantDeclaration,
      sym_statement,
  [296] = 2,
    ACTIONS(76), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(74), 8,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [311] = 2,
    ACTIONS(80), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(78), 8,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [326] = 6,
    ACTIONS(82), 1,
      anon_sym_RBRACE,
    ACTIONS(87), 1,
      anon_sym_key,
    ACTIONS(90), 1,
      anon_sym_actions,
    STATE(164), 1,
      sym_nonTableKwName,
    STATE(14), 2,
      sym_tableProperty,
      aux_sym_tableDeclaration_repeat1,
    ACTIONS(84), 4,
      anon_sym_apply,
      anon_sym_state,
      anon_sym_type,
      sym_IDENTIFIER,
  [349] = 2,
    ACTIONS(95), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(93), 8,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [364] = 3,
    ACTIONS(97), 1,
      anon_sym_DOT,
    ACTIONS(80), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(78), 7,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [381] = 6,
    ACTIONS(99), 1,
      anon_sym_RBRACE,
    ACTIONS(103), 1,
      anon_sym_key,
    ACTIONS(105), 1,
      anon_sym_actions,
    STATE(164), 1,
      sym_nonTableKwName,
    STATE(14), 2,
      sym_tableProperty,
      aux_sym_tableDeclaration_repeat1,
    ACTIONS(101), 4,
      anon_sym_apply,
      anon_sym_state,
      anon_sym_type,
      sym_IDENTIFIER,
  [404] = 7,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(147), 1,
      sym_typeRef,
    STATE(152), 1,
      sym_parameter,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
    ACTIONS(43), 3,
      anon_sym_inout,
      anon_sym_out,
      anon_sym_in,
  [429] = 6,
    ACTIONS(103), 1,
      anon_sym_key,
    ACTIONS(105), 1,
      anon_sym_actions,
    ACTIONS(107), 1,
      anon_sym_RBRACE,
    STATE(164), 1,
      sym_nonTableKwName,
    STATE(17), 2,
      sym_tableProperty,
      aux_sym_tableDeclaration_repeat1,
    ACTIONS(101), 4,
      anon_sym_apply,
      anon_sym_state,
      anon_sym_type,
      sym_IDENTIFIER,
  [452] = 2,
    ACTIONS(111), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(109), 8,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [467] = 2,
    ACTIONS(111), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(109), 8,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COLON,
      anon_sym_DOT,
      anon_sym_COMMA,
      anon_sym_RBRACK,
      sym_INTEGER,
  [482] = 7,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    ACTIONS(113), 1,
      anon_sym_RBRACE,
    STATE(133), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(23), 2,
      sym_structField,
      aux_sym_headerTypeDeclaration_repeat1,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [506] = 7,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    ACTIONS(115), 1,
      anon_sym_RBRACE,
    STATE(133), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(34), 2,
      sym_structField,
      aux_sym_headerTypeDeclaration_repeat1,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [530] = 6,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(117), 1,
      anon_sym_apply,
    ACTIONS(119), 1,
      anon_sym_action,
    ACTIONS(121), 1,
      anon_sym_table,
    STATE(26), 2,
      sym_controlLocalDeclaration,
      aux_sym_controlDeclaration_repeat1,
    STATE(100), 3,
      sym_constantDeclaration,
      sym_actionDeclaration,
      sym_tableDeclaration,
  [552] = 8,
    ACTIONS(123), 1,
      anon_sym_RPAREN,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(127), 1,
      anon_sym_dontcare,
    ACTIONS(129), 1,
      sym_IDENTIFIER,
    ACTIONS(131), 1,
      sym_INTEGER,
    STATE(68), 1,
      sym_expression,
    STATE(202), 1,
      sym_name,
    STATE(31), 2,
      sym_argument,
      aux_sym_assignmentOrMethodCallStatement_repeat1,
  [578] = 6,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(119), 1,
      anon_sym_action,
    ACTIONS(121), 1,
      anon_sym_table,
    ACTIONS(133), 1,
      anon_sym_apply,
    STATE(32), 2,
      sym_controlLocalDeclaration,
      aux_sym_controlDeclaration_repeat1,
    STATE(100), 3,
      sym_constantDeclaration,
      sym_actionDeclaration,
      sym_tableDeclaration,
  [600] = 8,
    ACTIONS(135), 1,
      anon_sym_RPAREN,
    ACTIONS(137), 1,
      anon_sym_DOT,
    ACTIONS(140), 1,
      anon_sym_dontcare,
    ACTIONS(143), 1,
      sym_IDENTIFIER,
    ACTIONS(146), 1,
      sym_INTEGER,
    STATE(68), 1,
      sym_expression,
    STATE(202), 1,
      sym_name,
    STATE(27), 2,
      sym_argument,
      aux_sym_assignmentOrMethodCallStatement_repeat1,
  [626] = 7,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    ACTIONS(149), 1,
      anon_sym_RBRACE,
    STATE(133), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(33), 2,
      sym_structField,
      aux_sym_headerTypeDeclaration_repeat1,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [650] = 9,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(127), 1,
      anon_sym_dontcare,
    ACTIONS(129), 1,
      sym_IDENTIFIER,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(151), 1,
      anon_sym_RPAREN,
    STATE(95), 1,
      sym_expression,
    STATE(119), 1,
      sym_argument,
    STATE(176), 1,
      sym_name,
    STATE(177), 1,
      sym_argumentList,
  [678] = 9,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(127), 1,
      anon_sym_dontcare,
    ACTIONS(129), 1,
      sym_IDENTIFIER,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(153), 1,
      anon_sym_RPAREN,
    STATE(95), 1,
      sym_expression,
    STATE(119), 1,
      sym_argument,
    STATE(176), 1,
      sym_name,
    STATE(189), 1,
      sym_argumentList,
  [706] = 8,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(127), 1,
      anon_sym_dontcare,
    ACTIONS(129), 1,
      sym_IDENTIFIER,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(155), 1,
      anon_sym_RPAREN,
    STATE(68), 1,
      sym_expression,
    STATE(202), 1,
      sym_name,
    STATE(27), 2,
      sym_argument,
      aux_sym_assignmentOrMethodCallStatement_repeat1,
  [732] = 6,
    ACTIONS(157), 1,
      anon_sym_const,
    ACTIONS(160), 1,
      anon_sym_apply,
    ACTIONS(162), 1,
      anon_sym_action,
    ACTIONS(165), 1,
      anon_sym_table,
    STATE(32), 2,
      sym_controlLocalDeclaration,
      aux_sym_controlDeclaration_repeat1,
    STATE(100), 3,
      sym_constantDeclaration,
      sym_actionDeclaration,
      sym_tableDeclaration,
  [754] = 7,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    STATE(133), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(34), 2,
      sym_structField,
      aux_sym_headerTypeDeclaration_repeat1,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [778] = 7,
    ACTIONS(170), 1,
      anon_sym_RBRACE,
    ACTIONS(172), 1,
      anon_sym_bit,
    ACTIONS(175), 1,
      sym_IDENTIFIER,
    STATE(133), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(34), 2,
      sym_structField,
      aux_sym_headerTypeDeclaration_repeat1,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [802] = 6,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(178), 1,
      anon_sym_RBRACE,
    ACTIONS(180), 1,
      anon_sym_state,
    STATE(122), 1,
      sym_constantDeclaration,
    STATE(37), 2,
      sym_parserLocalElement,
      aux_sym_parserDeclaration_repeat1,
    STATE(79), 2,
      sym_parserState,
      aux_sym_parserDeclaration_repeat2,
  [823] = 4,
    ACTIONS(51), 1,
      anon_sym_EQ,
    ACTIONS(97), 1,
      anon_sym_DOT,
    ACTIONS(80), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(78), 4,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_COMMA,
      sym_INTEGER,
  [840] = 6,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(180), 1,
      anon_sym_state,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    STATE(122), 1,
      sym_constantDeclaration,
    STATE(59), 2,
      sym_parserLocalElement,
      aux_sym_parserDeclaration_repeat1,
    STATE(105), 2,
      sym_parserState,
      aux_sym_parserDeclaration_repeat2,
  [861] = 1,
    ACTIONS(184), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [871] = 1,
    ACTIONS(186), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [881] = 1,
    ACTIONS(188), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [891] = 1,
    ACTIONS(190), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [901] = 1,
    ACTIONS(192), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [911] = 1,
    ACTIONS(194), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [921] = 1,
    ACTIONS(196), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [931] = 1,
    ACTIONS(198), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [941] = 1,
    ACTIONS(200), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [951] = 1,
    ACTIONS(202), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [961] = 1,
    ACTIONS(204), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [971] = 7,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(127), 1,
      anon_sym_dontcare,
    ACTIONS(129), 1,
      sym_IDENTIFIER,
    ACTIONS(131), 1,
      sym_INTEGER,
    STATE(95), 1,
      sym_expression,
    STATE(140), 1,
      sym_argument,
    STATE(176), 1,
      sym_name,
  [993] = 1,
    ACTIONS(206), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [1003] = 6,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(208), 1,
      anon_sym_RBRACE,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(117), 1,
      sym_expression,
    STATE(52), 2,
      sym_keyElement,
      aux_sym_tableProperty_repeat1,
  [1023] = 6,
    ACTIONS(212), 1,
      anon_sym_RBRACE,
    ACTIONS(214), 1,
      anon_sym_DOT,
    ACTIONS(217), 1,
      sym_IDENTIFIER,
    ACTIONS(220), 1,
      sym_INTEGER,
    STATE(117), 1,
      sym_expression,
    STATE(52), 2,
      sym_keyElement,
      aux_sym_tableProperty_repeat1,
  [1043] = 2,
    ACTIONS(223), 1,
      anon_sym_RBRACE,
    ACTIONS(225), 6,
      anon_sym_apply,
      anon_sym_key,
      anon_sym_actions,
      anon_sym_state,
      anon_sym_type,
      sym_IDENTIFIER,
  [1055] = 1,
    ACTIONS(227), 7,
      ts_builtin_sym_end,
      anon_sym_const,
      anon_sym_header,
      anon_sym_struct,
      anon_sym_control,
      anon_sym_parser,
      anon_sym_typedef,
  [1065] = 6,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    ACTIONS(229), 1,
      anon_sym_RBRACE,
    STATE(117), 1,
      sym_expression,
    STATE(51), 2,
      sym_keyElement,
      aux_sym_tableProperty_repeat1,
  [1085] = 2,
    ACTIONS(231), 1,
      anon_sym_RBRACE,
    ACTIONS(233), 6,
      anon_sym_apply,
      anon_sym_key,
      anon_sym_actions,
      anon_sym_state,
      anon_sym_type,
      sym_IDENTIFIER,
  [1097] = 4,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(239), 1,
      anon_sym_DOT,
    ACTIONS(237), 2,
      anon_sym_RPAREN,
      sym_INTEGER,
    ACTIONS(241), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
  [1112] = 5,
    ACTIONS(57), 1,
      anon_sym_DOT,
    ACTIONS(208), 1,
      anon_sym_RBRACE,
    ACTIONS(243), 1,
      sym_IDENTIFIER,
    STATE(142), 1,
      sym_prefixedNonType,
    STATE(62), 2,
      sym_actionListElement,
      aux_sym_tableProperty_repeat2,
  [1129] = 4,
    ACTIONS(245), 1,
      anon_sym_const,
    STATE(122), 1,
      sym_constantDeclaration,
    ACTIONS(248), 2,
      anon_sym_RBRACE,
      anon_sym_state,
    STATE(59), 2,
      sym_parserLocalElement,
      aux_sym_parserDeclaration_repeat1,
  [1144] = 5,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(134), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [1161] = 4,
    ACTIONS(250), 1,
      anon_sym_const,
    STATE(113), 1,
      sym_constantDeclaration,
    ACTIONS(253), 2,
      anon_sym_RBRACE,
      anon_sym_transition,
    STATE(61), 2,
      sym_parserStatement,
      aux_sym_parserState_repeat1,
  [1176] = 5,
    ACTIONS(255), 1,
      anon_sym_RBRACE,
    ACTIONS(257), 1,
      anon_sym_DOT,
    ACTIONS(260), 1,
      sym_IDENTIFIER,
    STATE(142), 1,
      sym_prefixedNonType,
    STATE(62), 2,
      sym_actionListElement,
      aux_sym_tableProperty_repeat2,
  [1193] = 5,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(125), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [1210] = 5,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(124), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [1227] = 5,
    ACTIONS(45), 1,
      anon_sym_bit,
    ACTIONS(47), 1,
      sym_IDENTIFIER,
    STATE(146), 1,
      sym_typeRef,
    STATE(201), 1,
      sym_name,
    STATE(204), 2,
      sym_baseType,
      sym_typeName,
  [1244] = 5,
    ACTIONS(57), 1,
      anon_sym_DOT,
    ACTIONS(229), 1,
      anon_sym_RBRACE,
    ACTIONS(243), 1,
      sym_IDENTIFIER,
    STATE(142), 1,
      sym_prefixedNonType,
    STATE(58), 2,
      sym_actionListElement,
      aux_sym_tableProperty_repeat2,
  [1261] = 2,
    ACTIONS(265), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(263), 4,
      anon_sym_RPAREN,
      anon_sym_DOT,
      anon_sym_COMMA,
      sym_INTEGER,
  [1272] = 4,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(239), 1,
      anon_sym_DOT,
    ACTIONS(263), 2,
      anon_sym_RPAREN,
      sym_INTEGER,
    ACTIONS(265), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
  [1287] = 2,
    ACTIONS(267), 2,
      anon_sym_dontcare,
      sym_IDENTIFIER,
    ACTIONS(51), 4,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
      anon_sym_DOT,
      sym_INTEGER,
  [1298] = 5,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(269), 1,
      anon_sym_RBRACE,
    ACTIONS(271), 1,
      anon_sym_transition,
    STATE(113), 1,
      sym_constantDeclaration,
    STATE(71), 2,
      sym_parserStatement,
      aux_sym_parserState_repeat1,
  [1315] = 5,
    ACTIONS(5), 1,
      anon_sym_const,
    ACTIONS(273), 1,
      anon_sym_RBRACE,
    ACTIONS(275), 1,
      anon_sym_transition,
    STATE(113), 1,
      sym_constantDeclaration,
    STATE(61), 2,
      sym_parserStatement,
      aux_sym_parserState_repeat1,
  [1332] = 1,
    ACTIONS(277), 5,
      anon_sym_const,
      anon_sym_RBRACE,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1340] = 1,
    ACTIONS(279), 5,
      anon_sym_EQ,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1348] = 1,
    ACTIONS(281), 5,
      anon_sym_const,
      anon_sym_RBRACE,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1356] = 5,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(121), 1,
      sym_expression,
    STATE(199), 1,
      sym_initializer,
  [1372] = 1,
    ACTIONS(283), 5,
      anon_sym_EQ,
      anon_sym_SEMI,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1380] = 5,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(121), 1,
      sym_expression,
    STATE(182), 1,
      sym_initializer,
  [1396] = 5,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(121), 1,
      sym_expression,
    STATE(172), 1,
      sym_initializer,
  [1412] = 3,
    ACTIONS(180), 1,
      anon_sym_state,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    STATE(104), 2,
      sym_parserState,
      aux_sym_parserDeclaration_repeat2,
  [1423] = 4,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(102), 1,
      sym_expression,
  [1436] = 1,
    ACTIONS(285), 4,
      anon_sym_const,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1443] = 1,
    ACTIONS(287), 4,
      anon_sym_EQ,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1450] = 4,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(120), 1,
      sym_expression,
  [1463] = 2,
    ACTIONS(289), 2,
      anon_sym_const,
      sym_IDENTIFIER,
    ACTIONS(291), 2,
      anon_sym_RBRACE,
      anon_sym_DOT,
  [1472] = 1,
    ACTIONS(293), 4,
      anon_sym_const,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1479] = 1,
    ACTIONS(295), 4,
      anon_sym_const,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1486] = 4,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(297), 1,
      anon_sym_COLON,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(301), 1,
      anon_sym_RBRACK,
  [1499] = 1,
    ACTIONS(303), 4,
      anon_sym_EQ,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1506] = 4,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(57), 1,
      sym_expression,
  [1519] = 1,
    ACTIONS(305), 4,
      anon_sym_const,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1526] = 2,
    ACTIONS(39), 2,
      anon_sym_RBRACE,
      anon_sym_DOT,
    ACTIONS(307), 2,
      anon_sym_const,
      sym_IDENTIFIER,
  [1535] = 4,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(87), 1,
      sym_expression,
  [1548] = 4,
    ACTIONS(125), 1,
      anon_sym_DOT,
    ACTIONS(131), 1,
      sym_INTEGER,
    ACTIONS(210), 1,
      sym_IDENTIFIER,
    STATE(114), 1,
      sym_expression,
  [1561] = 1,
    ACTIONS(309), 4,
      anon_sym_RBRACE,
      anon_sym_DOT,
      sym_IDENTIFIER,
      sym_INTEGER,
  [1568] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(263), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [1579] = 1,
    ACTIONS(311), 4,
      anon_sym_EQ,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1586] = 4,
    ACTIONS(313), 1,
      anon_sym_EQ,
    ACTIONS(315), 1,
      anon_sym_LPAREN,
    ACTIONS(317), 1,
      anon_sym_DOT,
    ACTIONS(319), 1,
      anon_sym_LBRACK,
  [1599] = 1,
    ACTIONS(321), 4,
      anon_sym_EQ,
      anon_sym_LPAREN,
      anon_sym_DOT,
      anon_sym_LBRACK,
  [1606] = 2,
    ACTIONS(323), 2,
      anon_sym_const,
      sym_IDENTIFIER,
    ACTIONS(325), 2,
      anon_sym_RBRACE,
      anon_sym_DOT,
  [1615] = 1,
    ACTIONS(327), 4,
      anon_sym_const,
      anon_sym_apply,
      anon_sym_action,
      anon_sym_table,
  [1622] = 2,
    ACTIONS(329), 2,
      anon_sym_const,
      sym_IDENTIFIER,
    ACTIONS(331), 2,
      anon_sym_RBRACE,
      anon_sym_DOT,
  [1631] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(237), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [1642] = 2,
    ACTIONS(333), 2,
      anon_sym_const,
      sym_IDENTIFIER,
    ACTIONS(335), 2,
      anon_sym_RBRACE,
      anon_sym_DOT,
  [1651] = 3,
    ACTIONS(337), 1,
      anon_sym_RBRACE,
    ACTIONS(339), 1,
      anon_sym_state,
    STATE(104), 2,
      sym_parserState,
      aux_sym_parserDeclaration_repeat2,
  [1662] = 3,
    ACTIONS(180), 1,
      anon_sym_state,
    ACTIONS(342), 1,
      anon_sym_RBRACE,
    STATE(104), 2,
      sym_parserState,
      aux_sym_parserDeclaration_repeat2,
  [1673] = 3,
    ACTIONS(344), 1,
      anon_sym_RPAREN,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    STATE(106), 1,
      aux_sym_argumentList_repeat1,
  [1683] = 1,
    ACTIONS(349), 3,
      anon_sym_RBRACE,
      anon_sym_DOT,
      sym_IDENTIFIER,
  [1689] = 3,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(166), 1,
      sym_stateExpression,
    STATE(174), 1,
      sym_name,
  [1699] = 3,
    ACTIONS(353), 1,
      anon_sym_RPAREN,
    ACTIONS(355), 1,
      anon_sym_COMMA,
    STATE(109), 1,
      aux_sym_parameterList_repeat1,
  [1709] = 3,
    ACTIONS(358), 1,
      anon_sym_RPAREN,
    ACTIONS(360), 1,
      anon_sym_COMMA,
    STATE(106), 1,
      aux_sym_argumentList_repeat1,
  [1719] = 1,
    ACTIONS(362), 3,
      anon_sym_RBRACE,
      anon_sym_DOT,
      sym_IDENTIFIER,
  [1725] = 3,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(174), 1,
      sym_name,
    STATE(175), 1,
      sym_stateExpression,
  [1735] = 1,
    ACTIONS(364), 3,
      anon_sym_const,
      anon_sym_RBRACE,
      anon_sym_transition,
  [1741] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(366), 1,
      anon_sym_SEMI,
  [1751] = 3,
    ACTIONS(368), 1,
      anon_sym_RPAREN,
    ACTIONS(370), 1,
      anon_sym_COMMA,
    STATE(109), 1,
      aux_sym_parameterList_repeat1,
  [1761] = 2,
    ACTIONS(372), 1,
      anon_sym_RBRACE,
    ACTIONS(374), 2,
      anon_sym_bit,
      sym_IDENTIFIER,
  [1769] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(376), 1,
      anon_sym_COLON,
  [1779] = 3,
    ACTIONS(370), 1,
      anon_sym_COMMA,
    ACTIONS(378), 1,
      anon_sym_RPAREN,
    STATE(115), 1,
      aux_sym_parameterList_repeat1,
  [1789] = 3,
    ACTIONS(360), 1,
      anon_sym_COMMA,
    ACTIONS(380), 1,
      anon_sym_RPAREN,
    STATE(110), 1,
      aux_sym_argumentList_repeat1,
  [1799] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(382), 1,
      anon_sym_RBRACK,
  [1809] = 3,
    ACTIONS(235), 1,
      anon_sym_LPAREN,
    ACTIONS(299), 1,
      anon_sym_DOT,
    ACTIONS(384), 1,
      anon_sym_SEMI,
  [1819] = 1,
    ACTIONS(386), 3,
      anon_sym_const,
      anon_sym_RBRACE,
      anon_sym_state,
  [1825] = 1,
    ACTIONS(388), 3,
      anon_sym_RBRACE,
      anon_sym_DOT,
      sym_IDENTIFIER,
  [1831] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(193), 1,
      sym_name,
  [1838] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(194), 1,
      sym_name,
  [1845] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(168), 1,
      sym_name,
  [1852] = 2,
    ACTIONS(390), 1,
      anon_sym_LBRACE,
    STATE(167), 1,
      sym_blockStatement,
  [1859] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(185), 1,
      sym_name,
  [1866] = 1,
    ACTIONS(392), 2,
      anon_sym_RBRACE,
      anon_sym_state,
  [1871] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(187), 1,
      sym_name,
  [1878] = 1,
    ACTIONS(394), 2,
      anon_sym_RBRACE,
      anon_sym_state,
  [1883] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(88), 1,
      sym_name,
  [1890] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(181), 1,
      sym_name,
  [1897] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(137), 1,
      sym_name,
  [1904] = 2,
    ACTIONS(396), 1,
      sym_IDENTIFIER,
    STATE(21), 1,
      sym_name,
  [1911] = 2,
    ACTIONS(390), 1,
      anon_sym_LBRACE,
    STATE(86), 1,
      sym_blockStatement,
  [1918] = 1,
    ACTIONS(398), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [1923] = 1,
    ACTIONS(400), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [1928] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(171), 1,
      sym_name,
  [1935] = 1,
    ACTIONS(344), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [1940] = 2,
    ACTIONS(402), 1,
      anon_sym_LT,
    ACTIONS(404), 1,
      sym_IDENTIFIER,
  [1947] = 2,
    ACTIONS(406), 1,
      anon_sym_SEMI,
    ACTIONS(408), 1,
      anon_sym_LPAREN,
  [1954] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(200), 1,
      sym_name,
  [1961] = 1,
    ACTIONS(410), 2,
      anon_sym_RBRACE,
      anon_sym_state,
  [1966] = 2,
    ACTIONS(390), 1,
      anon_sym_LBRACE,
    STATE(81), 1,
      sym_blockStatement,
  [1973] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(203), 1,
      sym_name,
  [1980] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(138), 1,
      sym_name,
  [1987] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(196), 1,
      sym_name,
  [1994] = 1,
    ACTIONS(412), 2,
      anon_sym_RBRACE,
      anon_sym_state,
  [1999] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(197), 1,
      sym_name,
  [2006] = 2,
    ACTIONS(390), 1,
      anon_sym_LBRACE,
    STATE(170), 1,
      sym_blockStatement,
  [2013] = 1,
    ACTIONS(353), 2,
      anon_sym_RPAREN,
      anon_sym_COMMA,
  [2018] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(21), 1,
      sym_name,
  [2025] = 2,
    ACTIONS(351), 1,
      sym_IDENTIFIER,
    STATE(198), 1,
      sym_name,
  [2032] = 1,
    ACTIONS(414), 1,
      anon_sym_RPAREN,
  [2036] = 1,
    ACTIONS(416), 1,
      anon_sym_RBRACE,
  [2040] = 1,
    ACTIONS(418), 1,
      anon_sym_RPAREN,
  [2044] = 1,
    ACTIONS(420), 1,
      sym_IDENTIFIER,
  [2048] = 1,
    ACTIONS(422), 1,
      anon_sym_LBRACE,
  [2052] = 1,
    ACTIONS(424), 1,
      anon_sym_LBRACE,
  [2056] = 1,
    ACTIONS(426), 1,
      anon_sym_EQ,
  [2060] = 1,
    ACTIONS(428), 1,
      anon_sym_EQ,
  [2064] = 1,
    ACTIONS(430), 1,
      anon_sym_EQ,
  [2068] = 1,
    ACTIONS(432), 1,
      anon_sym_EQ,
  [2072] = 1,
    ACTIONS(434), 1,
      anon_sym_SEMI,
  [2076] = 1,
    ACTIONS(436), 1,
      anon_sym_RBRACE,
  [2080] = 1,
    ACTIONS(438), 1,
      anon_sym_RBRACE,
  [2084] = 1,
    ACTIONS(440), 1,
      anon_sym_LPAREN,
  [2088] = 1,
    ACTIONS(366), 1,
      anon_sym_SEMI,
  [2092] = 1,
    ACTIONS(442), 1,
      anon_sym_RBRACE,
  [2096] = 1,
    ACTIONS(444), 1,
      anon_sym_LBRACE,
  [2100] = 1,
    ACTIONS(229), 1,
      anon_sym_SEMI,
  [2104] = 1,
    ACTIONS(446), 1,
      ts_builtin_sym_end,
  [2108] = 1,
    ACTIONS(448), 1,
      anon_sym_SEMI,
  [2112] = 1,
    ACTIONS(450), 1,
      anon_sym_RBRACE,
  [2116] = 1,
    ACTIONS(452), 1,
      anon_sym_EQ,
  [2120] = 1,
    ACTIONS(454), 1,
      anon_sym_RPAREN,
  [2124] = 1,
    ACTIONS(456), 1,
      sym_IDENTIFIER,
  [2128] = 1,
    ACTIONS(458), 1,
      anon_sym_LBRACE,
  [2132] = 1,
    ACTIONS(460), 1,
      anon_sym_LBRACE,
  [2136] = 1,
    ACTIONS(462), 1,
      anon_sym_SEMI,
  [2140] = 1,
    ACTIONS(464), 1,
      anon_sym_SEMI,
  [2144] = 1,
    ACTIONS(466), 1,
      sym_IDENTIFIER,
  [2148] = 1,
    ACTIONS(468), 1,
      sym_IDENTIFIER,
  [2152] = 1,
    ACTIONS(470), 1,
      anon_sym_LBRACE,
  [2156] = 1,
    ACTIONS(472), 1,
      anon_sym_LBRACE,
  [2160] = 1,
    ACTIONS(474), 1,
      anon_sym_SEMI,
  [2164] = 1,
    ACTIONS(476), 1,
      anon_sym_SEMI,
  [2168] = 1,
    ACTIONS(478), 1,
      anon_sym_RPAREN,
  [2172] = 1,
    ACTIONS(480), 1,
      anon_sym_RPAREN,
  [2176] = 1,
    ACTIONS(482), 1,
      anon_sym_GT,
  [2180] = 1,
    ACTIONS(484), 1,
      anon_sym_SEMI,
  [2184] = 1,
    ACTIONS(486), 1,
      anon_sym_SEMI,
  [2188] = 1,
    ACTIONS(488), 1,
      anon_sym_EQ,
  [2192] = 1,
    ACTIONS(490), 1,
      sym_INTEGER,
  [2196] = 1,
    ACTIONS(492), 1,
      anon_sym_LPAREN,
  [2200] = 1,
    ACTIONS(494), 1,
      anon_sym_LPAREN,
  [2204] = 1,
    ACTIONS(496), 1,
      anon_sym_LBRACE,
  [2208] = 1,
    ACTIONS(498), 1,
      anon_sym_SEMI,
  [2212] = 1,
    ACTIONS(500), 1,
      anon_sym_LBRACE,
  [2216] = 1,
    ACTIONS(502), 1,
      sym_IDENTIFIER,
  [2220] = 1,
    ACTIONS(504), 1,
      anon_sym_EQ,
  [2224] = 1,
    ACTIONS(506), 1,
      anon_sym_EQ,
  [2228] = 1,
    ACTIONS(508), 1,
      sym_IDENTIFIER,
  [2232] = 1,
    ACTIONS(510), 1,
      anon_sym_LBRACE,
};

static uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 43,
  [SMALL_STATE(4)] = 86,
  [SMALL_STATE(5)] = 102,
  [SMALL_STATE(6)] = 133,
  [SMALL_STATE(7)] = 164,
  [SMALL_STATE(8)] = 178,
  [SMALL_STATE(9)] = 208,
  [SMALL_STATE(10)] = 238,
  [SMALL_STATE(11)] = 266,
  [SMALL_STATE(12)] = 296,
  [SMALL_STATE(13)] = 311,
  [SMALL_STATE(14)] = 326,
  [SMALL_STATE(15)] = 349,
  [SMALL_STATE(16)] = 364,
  [SMALL_STATE(17)] = 381,
  [SMALL_STATE(18)] = 404,
  [SMALL_STATE(19)] = 429,
  [SMALL_STATE(20)] = 452,
  [SMALL_STATE(21)] = 467,
  [SMALL_STATE(22)] = 482,
  [SMALL_STATE(23)] = 506,
  [SMALL_STATE(24)] = 530,
  [SMALL_STATE(25)] = 552,
  [SMALL_STATE(26)] = 578,
  [SMALL_STATE(27)] = 600,
  [SMALL_STATE(28)] = 626,
  [SMALL_STATE(29)] = 650,
  [SMALL_STATE(30)] = 678,
  [SMALL_STATE(31)] = 706,
  [SMALL_STATE(32)] = 732,
  [SMALL_STATE(33)] = 754,
  [SMALL_STATE(34)] = 778,
  [SMALL_STATE(35)] = 802,
  [SMALL_STATE(36)] = 823,
  [SMALL_STATE(37)] = 840,
  [SMALL_STATE(38)] = 861,
  [SMALL_STATE(39)] = 871,
  [SMALL_STATE(40)] = 881,
  [SMALL_STATE(41)] = 891,
  [SMALL_STATE(42)] = 901,
  [SMALL_STATE(43)] = 911,
  [SMALL_STATE(44)] = 921,
  [SMALL_STATE(45)] = 931,
  [SMALL_STATE(46)] = 941,
  [SMALL_STATE(47)] = 951,
  [SMALL_STATE(48)] = 961,
  [SMALL_STATE(49)] = 971,
  [SMALL_STATE(50)] = 993,
  [SMALL_STATE(51)] = 1003,
  [SMALL_STATE(52)] = 1023,
  [SMALL_STATE(53)] = 1043,
  [SMALL_STATE(54)] = 1055,
  [SMALL_STATE(55)] = 1065,
  [SMALL_STATE(56)] = 1085,
  [SMALL_STATE(57)] = 1097,
  [SMALL_STATE(58)] = 1112,
  [SMALL_STATE(59)] = 1129,
  [SMALL_STATE(60)] = 1144,
  [SMALL_STATE(61)] = 1161,
  [SMALL_STATE(62)] = 1176,
  [SMALL_STATE(63)] = 1193,
  [SMALL_STATE(64)] = 1210,
  [SMALL_STATE(65)] = 1227,
  [SMALL_STATE(66)] = 1244,
  [SMALL_STATE(67)] = 1261,
  [SMALL_STATE(68)] = 1272,
  [SMALL_STATE(69)] = 1287,
  [SMALL_STATE(70)] = 1298,
  [SMALL_STATE(71)] = 1315,
  [SMALL_STATE(72)] = 1332,
  [SMALL_STATE(73)] = 1340,
  [SMALL_STATE(74)] = 1348,
  [SMALL_STATE(75)] = 1356,
  [SMALL_STATE(76)] = 1372,
  [SMALL_STATE(77)] = 1380,
  [SMALL_STATE(78)] = 1396,
  [SMALL_STATE(79)] = 1412,
  [SMALL_STATE(80)] = 1423,
  [SMALL_STATE(81)] = 1436,
  [SMALL_STATE(82)] = 1443,
  [SMALL_STATE(83)] = 1450,
  [SMALL_STATE(84)] = 1463,
  [SMALL_STATE(85)] = 1472,
  [SMALL_STATE(86)] = 1479,
  [SMALL_STATE(87)] = 1486,
  [SMALL_STATE(88)] = 1499,
  [SMALL_STATE(89)] = 1506,
  [SMALL_STATE(90)] = 1519,
  [SMALL_STATE(91)] = 1526,
  [SMALL_STATE(92)] = 1535,
  [SMALL_STATE(93)] = 1548,
  [SMALL_STATE(94)] = 1561,
  [SMALL_STATE(95)] = 1568,
  [SMALL_STATE(96)] = 1579,
  [SMALL_STATE(97)] = 1586,
  [SMALL_STATE(98)] = 1599,
  [SMALL_STATE(99)] = 1606,
  [SMALL_STATE(100)] = 1615,
  [SMALL_STATE(101)] = 1622,
  [SMALL_STATE(102)] = 1631,
  [SMALL_STATE(103)] = 1642,
  [SMALL_STATE(104)] = 1651,
  [SMALL_STATE(105)] = 1662,
  [SMALL_STATE(106)] = 1673,
  [SMALL_STATE(107)] = 1683,
  [SMALL_STATE(108)] = 1689,
  [SMALL_STATE(109)] = 1699,
  [SMALL_STATE(110)] = 1709,
  [SMALL_STATE(111)] = 1719,
  [SMALL_STATE(112)] = 1725,
  [SMALL_STATE(113)] = 1735,
  [SMALL_STATE(114)] = 1741,
  [SMALL_STATE(115)] = 1751,
  [SMALL_STATE(116)] = 1761,
  [SMALL_STATE(117)] = 1769,
  [SMALL_STATE(118)] = 1779,
  [SMALL_STATE(119)] = 1789,
  [SMALL_STATE(120)] = 1799,
  [SMALL_STATE(121)] = 1809,
  [SMALL_STATE(122)] = 1819,
  [SMALL_STATE(123)] = 1825,
  [SMALL_STATE(124)] = 1831,
  [SMALL_STATE(125)] = 1838,
  [SMALL_STATE(126)] = 1845,
  [SMALL_STATE(127)] = 1852,
  [SMALL_STATE(128)] = 1859,
  [SMALL_STATE(129)] = 1866,
  [SMALL_STATE(130)] = 1871,
  [SMALL_STATE(131)] = 1878,
  [SMALL_STATE(132)] = 1883,
  [SMALL_STATE(133)] = 1890,
  [SMALL_STATE(134)] = 1897,
  [SMALL_STATE(135)] = 1904,
  [SMALL_STATE(136)] = 1911,
  [SMALL_STATE(137)] = 1918,
  [SMALL_STATE(138)] = 1923,
  [SMALL_STATE(139)] = 1928,
  [SMALL_STATE(140)] = 1935,
  [SMALL_STATE(141)] = 1940,
  [SMALL_STATE(142)] = 1947,
  [SMALL_STATE(143)] = 1954,
  [SMALL_STATE(144)] = 1961,
  [SMALL_STATE(145)] = 1966,
  [SMALL_STATE(146)] = 1973,
  [SMALL_STATE(147)] = 1980,
  [SMALL_STATE(148)] = 1987,
  [SMALL_STATE(149)] = 1994,
  [SMALL_STATE(150)] = 1999,
  [SMALL_STATE(151)] = 2006,
  [SMALL_STATE(152)] = 2013,
  [SMALL_STATE(153)] = 2018,
  [SMALL_STATE(154)] = 2025,
  [SMALL_STATE(155)] = 2032,
  [SMALL_STATE(156)] = 2036,
  [SMALL_STATE(157)] = 2040,
  [SMALL_STATE(158)] = 2044,
  [SMALL_STATE(159)] = 2048,
  [SMALL_STATE(160)] = 2052,
  [SMALL_STATE(161)] = 2056,
  [SMALL_STATE(162)] = 2060,
  [SMALL_STATE(163)] = 2064,
  [SMALL_STATE(164)] = 2068,
  [SMALL_STATE(165)] = 2072,
  [SMALL_STATE(166)] = 2076,
  [SMALL_STATE(167)] = 2080,
  [SMALL_STATE(168)] = 2084,
  [SMALL_STATE(169)] = 2088,
  [SMALL_STATE(170)] = 2092,
  [SMALL_STATE(171)] = 2096,
  [SMALL_STATE(172)] = 2100,
  [SMALL_STATE(173)] = 2104,
  [SMALL_STATE(174)] = 2108,
  [SMALL_STATE(175)] = 2112,
  [SMALL_STATE(176)] = 2116,
  [SMALL_STATE(177)] = 2120,
  [SMALL_STATE(178)] = 2124,
  [SMALL_STATE(179)] = 2128,
  [SMALL_STATE(180)] = 2132,
  [SMALL_STATE(181)] = 2136,
  [SMALL_STATE(182)] = 2140,
  [SMALL_STATE(183)] = 2144,
  [SMALL_STATE(184)] = 2148,
  [SMALL_STATE(185)] = 2152,
  [SMALL_STATE(186)] = 2156,
  [SMALL_STATE(187)] = 2160,
  [SMALL_STATE(188)] = 2164,
  [SMALL_STATE(189)] = 2168,
  [SMALL_STATE(190)] = 2172,
  [SMALL_STATE(191)] = 2176,
  [SMALL_STATE(192)] = 2180,
  [SMALL_STATE(193)] = 2184,
  [SMALL_STATE(194)] = 2188,
  [SMALL_STATE(195)] = 2192,
  [SMALL_STATE(196)] = 2196,
  [SMALL_STATE(197)] = 2200,
  [SMALL_STATE(198)] = 2204,
  [SMALL_STATE(199)] = 2208,
  [SMALL_STATE(200)] = 2212,
  [SMALL_STATE(201)] = 2216,
  [SMALL_STATE(202)] = 2220,
  [SMALL_STATE(203)] = 2224,
  [SMALL_STATE(204)] = 2228,
  [SMALL_STATE(205)] = 2232,
};

static TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(63),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(143),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(154),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(150),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(148),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(64),
  [17] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2),
  [19] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(63),
  [22] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(143),
  [25] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(154),
  [28] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(150),
  [31] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(148),
  [34] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2), SHIFT_REPEAT(64),
  [37] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1),
  [39] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_constantDeclaration, 6),
  [41] = {.entry = {.count = 1, .reusable = true}}, SHIFT(186),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(60),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(141),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(7),
  [49] = {.entry = {.count = 1, .reusable = true}}, SHIFT(136),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 1),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(65),
  [55] = {.entry = {.count = 1, .reusable = true}}, SHIFT(74),
  [57] = {.entry = {.count = 1, .reusable = true}}, SHIFT(158),
  [59] = {.entry = {.count = 1, .reusable = false}}, SHIFT(76),
  [61] = {.entry = {.count = 1, .reusable = true}}, SHIFT(72),
  [63] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_blockStatement_repeat1, 2), SHIFT_REPEAT(65),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_blockStatement_repeat1, 2),
  [68] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_blockStatement_repeat1, 2), SHIFT_REPEAT(158),
  [71] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_blockStatement_repeat1, 2), SHIFT_REPEAT(76),
  [74] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expression, 2),
  [76] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_expression, 2),
  [78] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expression, 1),
  [80] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_expression, 1),
  [82] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_tableDeclaration_repeat1, 2),
  [84] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_tableDeclaration_repeat1, 2), SHIFT_REPEAT(161),
  [87] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_tableDeclaration_repeat1, 2), SHIFT_REPEAT(162),
  [90] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_tableDeclaration_repeat1, 2), SHIFT_REPEAT(163),
  [93] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expression, 4),
  [95] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_expression, 4),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(178),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(85),
  [101] = {.entry = {.count = 1, .reusable = false}}, SHIFT(161),
  [103] = {.entry = {.count = 1, .reusable = false}}, SHIFT(162),
  [105] = {.entry = {.count = 1, .reusable = false}}, SHIFT(163),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(90),
  [109] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_expression, 3),
  [111] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_expression, 3),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(127),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(126),
  [121] = {.entry = {.count = 1, .reusable = true}}, SHIFT(139),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(169),
  [125] = {.entry = {.count = 1, .reusable = true}}, SHIFT(183),
  [127] = {.entry = {.count = 1, .reusable = false}}, SHIFT(67),
  [129] = {.entry = {.count = 1, .reusable = false}}, SHIFT(36),
  [131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [133] = {.entry = {.count = 1, .reusable = true}}, SHIFT(151),
  [135] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_assignmentOrMethodCallStatement_repeat1, 2),
  [137] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_assignmentOrMethodCallStatement_repeat1, 2), SHIFT_REPEAT(183),
  [140] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_assignmentOrMethodCallStatement_repeat1, 2), SHIFT_REPEAT(67),
  [143] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_assignmentOrMethodCallStatement_repeat1, 2), SHIFT_REPEAT(36),
  [146] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_assignmentOrMethodCallStatement_repeat1, 2), SHIFT_REPEAT(13),
  [149] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [151] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [153] = {.entry = {.count = 1, .reusable = true}}, SHIFT(188),
  [155] = {.entry = {.count = 1, .reusable = true}}, SHIFT(165),
  [157] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_controlDeclaration_repeat1, 2), SHIFT_REPEAT(63),
  [160] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_controlDeclaration_repeat1, 2),
  [162] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_controlDeclaration_repeat1, 2), SHIFT_REPEAT(126),
  [165] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_controlDeclaration_repeat1, 2), SHIFT_REPEAT(139),
  [168] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [170] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_headerTypeDeclaration_repeat1, 2),
  [172] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_headerTypeDeclaration_repeat1, 2), SHIFT_REPEAT(141),
  [175] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_headerTypeDeclaration_repeat1, 2), SHIFT_REPEAT(7),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(128),
  [182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(50),
  [184] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_controlDeclaration, 10),
  [186] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_derivedTypeDeclaration, 1),
  [188] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_headerTypeDeclaration, 5),
  [190] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_headerTypeDeclaration, 4),
  [192] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_structTypeDeclaration, 4),
  [194] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_structTypeDeclaration, 5),
  [196] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_controlDeclaration, 9),
  [198] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_typeDeclaration, 1),
  [200] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserDeclaration, 3),
  [202] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_declaration, 1),
  [204] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_typedefDeclaration, 4),
  [206] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserDeclaration, 4),
  [208] = {.entry = {.count = 1, .reusable = true}}, SHIFT(53),
  [210] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [212] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat1, 2),
  [214] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat1, 2), SHIFT_REPEAT(183),
  [217] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat1, 2), SHIFT_REPEAT(16),
  [220] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat1, 2), SHIFT_REPEAT(13),
  [223] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tableProperty, 5),
  [225] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_tableProperty, 5),
  [227] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserDeclaration, 5),
  [229] = {.entry = {.count = 1, .reusable = true}}, SHIFT(56),
  [231] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tableProperty, 4),
  [233] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_tableProperty, 4),
  [235] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [237] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_argument, 3),
  [239] = {.entry = {.count = 1, .reusable = true}}, SHIFT(135),
  [241] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_argument, 3),
  [243] = {.entry = {.count = 1, .reusable = true}}, SHIFT(76),
  [245] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_parserDeclaration_repeat1, 2), SHIFT_REPEAT(63),
  [248] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_parserDeclaration_repeat1, 2),
  [250] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_parserState_repeat1, 2), SHIFT_REPEAT(63),
  [253] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_parserState_repeat1, 2),
  [255] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat2, 2),
  [257] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat2, 2), SHIFT_REPEAT(158),
  [260] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_tableProperty_repeat2, 2), SHIFT_REPEAT(76),
  [263] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_argument, 1),
  [265] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_argument, 1),
  [267] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_name, 1),
  [269] = {.entry = {.count = 1, .reusable = true}}, SHIFT(149),
  [271] = {.entry = {.count = 1, .reusable = true}}, SHIFT(112),
  [273] = {.entry = {.count = 1, .reusable = true}}, SHIFT(131),
  [275] = {.entry = {.count = 1, .reusable = true}}, SHIFT(108),
  [277] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_blockStatement, 3),
  [279] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_prefixedNonType, 2),
  [281] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_blockStatement, 2),
  [283] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_prefixedNonType, 1),
  [285] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_actionDeclaration, 6),
  [287] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lvalue, 4),
  [289] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_assignmentOrMethodCallStatement, 4),
  [291] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_assignmentOrMethodCallStatement, 4),
  [293] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tableDeclaration, 5),
  [295] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_actionDeclaration, 5),
  [297] = {.entry = {.count = 1, .reusable = true}}, SHIFT(83),
  [299] = {.entry = {.count = 1, .reusable = true}}, SHIFT(153),
  [301] = {.entry = {.count = 1, .reusable = true}}, SHIFT(82),
  [303] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lvalue, 3),
  [305] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_tableDeclaration, 4),
  [307] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_constantDeclaration, 6),
  [309] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_keyElement, 4),
  [311] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lvalue, 6),
  [313] = {.entry = {.count = 1, .reusable = true}}, SHIFT(93),
  [315] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [317] = {.entry = {.count = 1, .reusable = true}}, SHIFT(132),
  [319] = {.entry = {.count = 1, .reusable = true}}, SHIFT(92),
  [321] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_lvalue, 1),
  [323] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_statement, 1),
  [325] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_statement, 1),
  [327] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_controlLocalDeclaration, 1),
  [329] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_statementOrDeclaration, 1),
  [331] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_statementOrDeclaration, 1),
  [333] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_assignmentOrMethodCallStatement, 5),
  [335] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_assignmentOrMethodCallStatement, 5),
  [337] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_parserDeclaration_repeat2, 2),
  [339] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_parserDeclaration_repeat2, 2), SHIFT_REPEAT(128),
  [342] = {.entry = {.count = 1, .reusable = true}}, SHIFT(54),
  [344] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_argumentList_repeat1, 2),
  [346] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_argumentList_repeat1, 2), SHIFT_REPEAT(49),
  [349] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_actionListElement, 4),
  [351] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [353] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_parameterList_repeat1, 2),
  [355] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_parameterList_repeat1, 2), SHIFT_REPEAT(18),
  [358] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_argumentList, 2),
  [360] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [362] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_actionListElement, 2),
  [364] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserStatement, 1),
  [366] = {.entry = {.count = 1, .reusable = true}}, SHIFT(84),
  [368] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameterList, 2),
  [370] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [372] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_structField, 3),
  [374] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_structField, 3),
  [376] = {.entry = {.count = 1, .reusable = true}}, SHIFT(130),
  [378] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameterList, 1),
  [380] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_argumentList, 1),
  [382] = {.entry = {.count = 1, .reusable = true}}, SHIFT(96),
  [384] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_initializer, 1),
  [386] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserLocalElement, 1),
  [388] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_actionListElement, 5),
  [390] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [392] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserState, 7),
  [394] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserState, 5),
  [396] = {.entry = {.count = 1, .reusable = true}}, SHIFT(69),
  [398] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter, 3),
  [400] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parameter, 2),
  [402] = {.entry = {.count = 1, .reusable = true}}, SHIFT(195),
  [404] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_baseType, 1),
  [406] = {.entry = {.count = 1, .reusable = true}}, SHIFT(111),
  [408] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [410] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserState, 6),
  [412] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserState, 4),
  [414] = {.entry = {.count = 1, .reusable = true}}, SHIFT(179),
  [416] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_stateExpression, 2),
  [418] = {.entry = {.count = 1, .reusable = true}}, SHIFT(145),
  [420] = {.entry = {.count = 1, .reusable = true}}, SHIFT(73),
  [422] = {.entry = {.count = 1, .reusable = true}}, SHIFT(55),
  [424] = {.entry = {.count = 1, .reusable = true}}, SHIFT(66),
  [426] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nonTableKwName, 1),
  [428] = {.entry = {.count = 1, .reusable = true}}, SHIFT(159),
  [430] = {.entry = {.count = 1, .reusable = true}}, SHIFT(160),
  [432] = {.entry = {.count = 1, .reusable = true}}, SHIFT(78),
  [434] = {.entry = {.count = 1, .reusable = true}}, SHIFT(103),
  [436] = {.entry = {.count = 1, .reusable = true}}, SHIFT(129),
  [438] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [440] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [442] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [444] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [446] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [448] = {.entry = {.count = 1, .reusable = true}}, SHIFT(156),
  [450] = {.entry = {.count = 1, .reusable = true}}, SHIFT(144),
  [452] = {.entry = {.count = 1, .reusable = true}}, SHIFT(80),
  [454] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [456] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [458] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserTypeDeclaration, 5),
  [460] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [462] = {.entry = {.count = 1, .reusable = true}}, SHIFT(116),
  [464] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [466] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [468] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_baseType, 4),
  [470] = {.entry = {.count = 1, .reusable = true}}, SHIFT(70),
  [472] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_parserTypeDeclaration, 4),
  [474] = {.entry = {.count = 1, .reusable = true}}, SHIFT(94),
  [476] = {.entry = {.count = 1, .reusable = true}}, SHIFT(107),
  [478] = {.entry = {.count = 1, .reusable = true}}, SHIFT(192),
  [480] = {.entry = {.count = 1, .reusable = true}}, SHIFT(180),
  [482] = {.entry = {.count = 1, .reusable = true}}, SHIFT(184),
  [484] = {.entry = {.count = 1, .reusable = true}}, SHIFT(123),
  [486] = {.entry = {.count = 1, .reusable = true}}, SHIFT(48),
  [488] = {.entry = {.count = 1, .reusable = true}}, SHIFT(77),
  [490] = {.entry = {.count = 1, .reusable = true}}, SHIFT(191),
  [492] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [494] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [496] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [498] = {.entry = {.count = 1, .reusable = true}}, SHIFT(91),
  [500] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [502] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_typeName, 1),
  [504] = {.entry = {.count = 1, .reusable = true}}, SHIFT(89),
  [506] = {.entry = {.count = 1, .reusable = true}}, SHIFT(75),
  [508] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_typeRef, 1),
  [510] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_P4_16(void) {
  static TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .parse_table = (const uint16_t *)ts_parse_table,
    .parse_actions = ts_parse_actions,
    .lex_modes = ts_lex_modes,
    .alias_sequences = (const TSSymbol *)ts_alias_sequences,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .lex_fn = ts_lex,
    .field_count = FIELD_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .small_parse_table = (const uint16_t *)ts_small_parse_table,
    .small_parse_table_map = (const uint32_t *)ts_small_parse_table_map,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .state_count = STATE_COUNT,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
