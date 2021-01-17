import { CstParser } from "chevrotain";
import { tokens } from "./Tokenizer";
class SelectParser extends CstParser {
  constructor() {
    super(tokens);

    this.performSelfAnalysis();
  }

  public p4program = this.RULE("p4program", () => {
    this.MANY(() => {
      this.SUBRULE(this.declaration);
    });
  });

  private declaration = this.RULE("declaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.parserDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.typeDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.constantDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.controlDeclaration);
        },
      },
    ]);
  });

  private constantDeclaration = this.RULE("constantDeclaration", () => {
    this.CONSUME(tokens.CONST);
    this.SUBRULE(this.typeRef);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.EQUALS);
    this.SUBRULE(this.initializer);
    this.CONSUME(tokens.SEMICOLON);
  });

  private initializer = this.RULE("initializer", () => {
    this.SUBRULE(this.expression);
  });

  private expression = this.RULE("expression", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.INTEGER);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.TRUE);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.FALSE);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.STRING_LITERAL);
        },
      },
    ]);
  });

  private typeDeclaration = this.RULE("typeDeclaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.typedefDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.derivedTypeDeclaration);
        },
      },
    ]);
  });

  private typedefDeclaration = this.RULE("typedefDeclaration", () => {
    this.CONSUME(tokens.TYPEDEF);
    this.SUBRULE(this.typeRef);
    this.CONSUME(tokens.IDENTIFIER);
    this.CONSUME(tokens.SEMICOLON);
  });

  private typeRef = this.RULE("typeRef", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.typeName);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.baseType);
        },
      },
    ]);
  });

  private typeName = this.RULE("typeName", () => {
    this.SUBRULE(this.prefixedType);
  });

  private prefixedType = this.RULE("prefixedType", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.IDENTIFIER); //treat as type identifier
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.dotPrefix);
          this.CONSUME2(tokens.IDENTIFIER); //treat as type identifier
        },
      },
    ]);
  });

  private dotPrefix = this.RULE("dotPrefix", () => {
    this.CONSUME(tokens.DOT);
  });

  private baseType = this.RULE("baseType", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.BIT); //treat as type identifier
          this.CONSUME(tokens.LESS_THAN); //treat as type identifier
          this.CONSUME(tokens.INTEGER);
          this.CONSUME(tokens.GREATER_THAN);
        },
      },
      {
        ALT: () => {
          this.CONSUME2(tokens.BIT); //treat as type identifier
        },
      },
    ]);
  });

  private derivedTypeDeclaration = this.RULE("derivedTypeDeclaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.headerTypeDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.structTypeDeclaration);
        },
      },
    ]);
  });

  private structTypeDeclaration = this.RULE("structTypeDeclaration", () => {
    this.CONSUME(tokens.STRUCT);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.structFieldList);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private headerTypeDeclaration = this.RULE("headerTypeDeclaration", () => {
    this.CONSUME(tokens.HEADER);
    this.CONSUME(tokens.IDENTIFIER);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.structFieldList);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private structFieldList = this.RULE("structFieldList", () => {
    this.MANY(() => {
      this.SUBRULE(this.typeRef);
      this.SUBRULE(this.name);
      this.CONSUME(tokens.SEMICOLON);
    });
  });

  private name = this.RULE("name", () => {
    this.CONSUME(tokens.IDENTIFIER);
  });

  private parserDeclaration = this.RULE("parserDeclaration", () => {
    this.SUBRULE(this.parserTypeDeclaration);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.parserLocalElements);
    this.SUBRULE(this.parserStates);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private parserTypeDeclaration = this.RULE("parserTypeDeclaration", () => {
    this.CONSUME(tokens.PARSER);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.OPEN_BRACKET);
    this.SUBRULE(this.parameterList);
    this.CONSUME(tokens.CLOSE_BRACKET);
  });

  private parameterList = this.RULE("parameterList", () => {
    this.OPTION(() => {
      this.SUBRULE(this.parameter);
      this.MANY(() => {
        this.CONSUME(tokens.COMMA);
        this.SUBRULE2(this.parameter);
      });
    });
  });

  private parameter = this.RULE("parameter", () => {
    this.OPTION(this.direction);
    this.SUBRULE(this.typeRef);
    this.SUBRULE(this.name);
    this.OPTION2(() => {
      this.CONSUME(tokens.EQUALS);
      this.SUBRULE(this.expression);
    });
  });

  private direction = this.RULE("direction", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.INOUT);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.OUT);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.IN);
        },
      },
    ]);
  });

  private parserLocalElements = this.RULE("parserLocalElements", () => {
    this.OPTION(() => {
      this.MANY(() => {
        this.SUBRULE(this.parserLocalElement);
      });
    });
  });

  private parserLocalElement = this.RULE("parserLocalElement", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.constantDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.typeRef);
          this.OR2([
            {
              ALT: () => {
                this.SUBRULE(this.variableDeclaration);
              },
            },
            {
              ALT: () => {
                this.SUBRULE(this.instantiation);
              },
            },
          ]);
        },
      },
    ]);
  });

  private variableDeclaration = this.RULE("variableDeclaration", () => {
    this.SUBRULE(this.name);
    this.CONSUME(tokens.SEMICOLON);
  });

  private instantiation = this.RULE("instantiation", () => {
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.argumentList);
    this.CONSUME(tokens.CLOSE_BRACE);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.SEMICOLON);
  });

  private parserStates = this.RULE("parserStates", () => {
    this.OPTION(() => {
      this.MANY(() => {
        this.CONSUME(tokens.STATE);
        this.SUBRULE(this.name);
        this.CONSUME(tokens.OPEN_BRACE);
        this.SUBRULE(this.parserStatements);
        this.SUBRULE(this.transitionStatement);
        this.CONSUME(tokens.CLOSE_BRACE);
      });
    });
  });

  private parserStatements = this.RULE("parserStatements", () => {
    this.OPTION(() => {
      this.MANY(() => {
        this.OR([
          {
            ALT: () => {
              this.SUBRULE(this.variableDeclaration);
            },
          },
          {
            ALT: () => {
              this.SUBRULE(this.constantDeclaration);
            },
          },
        ]);
      });
    });
  });

  private transitionStatement = this.RULE("transitionStatements", () => {
    this.OPTION(() => {
      this.CONSUME(tokens.TRANSITION);
      this.SUBRULE(this.stateExpression);
    });
  });

  private stateExpression = this.RULE("stateExpression", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.name);
          this.CONSUME(tokens.SEMICOLON);
        },
      },
    ]);
  });

  private argumentList = this.RULE("argumentList", () => {
    this.MANY(() => {
      this.SUBRULE(this.argument);
      this.MANY2(() => {
        this.CONSUME(tokens.COMMA);
        this.SUBRULE2(this.argument);
      });
    });
  });

  private argument = this.RULE("argument", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.expression);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.name);
          this.CONSUME(tokens.EQUALS);
          this.SUBRULE2(this.expression);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.DONTCARE);
        },
      },
    ]);
  });

  private controlDeclaration = this.RULE("controlDeclaration", () => {
    this.SUBRULE(this.controlTypeDeclaration);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.controlLocalDeclarations);
    this.CONSUME(tokens.APPLY);
    this.SUBRULE(this.controlBody);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private controlBody = this.RULE("controlBody", () => {
    this.SUBRULE(this.blockStatement);
  });

  private blockStatement = this.RULE("blockStatement", () => {
    this.CONSUME(tokens.OPEN_BRACE);
    this.MANY(() => this.SUBRULE(this.statementOrDeclaration));
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private statementOrDeclaration = this.RULE("statementOrDeclaration", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.variableDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.constantDeclaration);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.statement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.instantiation);
        },
      },
    ]);
  });

  private statement = this.RULE("statement", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.assigmentOrMethodCallStatement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.directApplication);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.conditionalStatement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blockStatement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.exitStatement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.returnStatement);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.switchStatement);
        },
      },
    ]);
  });

  private exitStatement = this.RULE("exitStatement", () => {
    this.CONSUME(tokens.EXIT);
    this.CONSUME(tokens.SEMICOLON);
  });

  private returnStatement = this.RULE("returnStatement", () => {
    this.CONSUME(tokens.RETURN);
    this.OPTION(() => this.SUBRULE(this.expression));
    this.CONSUME(tokens.SEMICOLON);
  });

  private switchStatement = this.RULE("switchStatement", () => {
    this.CONSUME(tokens.EXIT);
    this.CONSUME(tokens.SEMICOLON);
  });

  private directApplication = this.RULE("directApplication", () => {
    this.SUBRULE(this.typeName);
    this.CONSUME(tokens.DOT);
    this.CONSUME(tokens.APPLY);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.argumentList);
    this.CONSUME(tokens.CLOSE_BRACE);
    this.CONSUME(tokens.SEMICOLON);
  });

  private conditionalStatement = this.RULE("conditionalStatement", () => {
    this.CONSUME(tokens.IF);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.expression);
    this.CONSUME(tokens.CLOSE_BRACE);
    this.SUBRULE(this.statement);
    this.OPTION(() => {
      this.CONSUME(tokens.ELSE);
      this.SUBRULE2(this.statement);
    });
  });

  private assigmentOrMethodCallStatement = this.RULE(
    "assignmentOrMethodCall",
    () => {
      this.SUBRULE(this.lvalue);
      this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.OPEN_BRACE);
            this.SUBRULE(this.argumentList);
            this.CONSUME(tokens.CLOSE_BRACE);
            this.CONSUME(tokens.SEMICOLON);
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.LESS_THAN);
            this.SUBRULE(this.typeArgumentList);
            this.CONSUME(tokens.GREATER_THAN);
            this.CONSUME2(tokens.OPEN_BRACE);
            this.SUBRULE2(this.argumentList);
            this.CONSUME2(tokens.CLOSE_BRACE);
            this.CONSUME2(tokens.SEMICOLON);
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.EQUALS);
            this.SUBRULE(this.expression);
            this.CONSUME3(tokens.SEMICOLON);
          },
        },
      ]);
    }
  );

  private lvalue = this.RULE("lvalue", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.prefixedNonTypeName);
          this.MANY(() => {
            this.OR2([
              {
                ALT: () => {
                  this.CONSUME(tokens.DOT);
                  this.SUBRULE(this.name);
                },
              },
              {
                ALT: () => {
                  this.CONSUME(tokens.OPEN_SQUARE_BRACKET);
                  this.SUBRULE(this.expression);
                  this.CONSUME(tokens.CLOSE_SQUARE_BRACKET);
                },
              },
              {
                ALT: () => {
                  this.CONSUME2(tokens.OPEN_SQUARE_BRACKET);
                  this.SUBRULE2(this.expression);
                  this.CONSUME(tokens.COLON);
                  this.SUBRULE3(this.expression);
                  this.CONSUME2(tokens.CLOSE_SQUARE_BRACKET);
                },
              },
            ]);
          });
        },
      },
    ]);
  });

  private typeArgumentList = this.RULE("typeArgumentList", () => {
    this.OPTION(() => {
      this.SUBRULE(this.typeArg);
      this.MANY(() => {
        this.CONSUME(tokens.COMMA);
        this.SUBRULE2(this.typeArg);
      });
    });
  });

  private typeArg = this.RULE("typeArg", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.DONTCARE);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.typeRef);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.IDENTIFIER);
        },
      },
    ]);
  });

  private controlTypeDeclaration = this.RULE("controlTypeDeclaration", () => {
    this.CONSUME(tokens.CONTROL);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.parameterList);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private controlLocalDeclarations = this.RULE(
    "controlLocalDeclarations",
    () => {
      this.OPTION(() => {
        this.MANY(() => {
          this.OR([
            {
              ALT: () => {
                this.SUBRULE(this.constantDeclaration);
              },
            },
            {
              ALT: () => {
                this.SUBRULE(this.actionDeclaration);
              },
            },
            {
              ALT: () => {
                this.SUBRULE(this.tableDeclaration);
              },
            },
            {
              ALT: () => {
                this.SUBRULE(this.variableDeclaration);
              },
            },
          ]);
        });
      });
    }
  );

  private actionDeclaration = this.RULE("actionDeclaration", () => {
    this.CONSUME(tokens.ACTION);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.parameterList);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private tableDeclaration = this.RULE("tableDeclaration", () => {
    this.CONSUME(tokens.TABLE);
    this.SUBRULE(this.name);
    this.CONSUME(tokens.OPEN_BRACE);
    this.SUBRULE(this.tablePropertyList);
    this.CONSUME(tokens.CLOSE_BRACE);
  });

  private tablePropertyList = this.RULE("tablePropertyList", () => {
    this.AT_LEAST_ONE(() => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.KEY);
            this.CONSUME(tokens.EQUALS);
            this.CONSUME(tokens.OPEN_BRACE);
            this.SUBRULE(this.keyElementList);
            this.CONSUME(tokens.CLOSE_BRACE);
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.ACTIONS);
            this.CONSUME2(tokens.EQUALS);
            this.CONSUME2(tokens.OPEN_BRACE);
            this.SUBRULE(this.actionList);
            this.CONSUME2(tokens.CLOSE_BRACE);
          },
        },
        {
          ALT: () => {
            this.CONSUME(tokens.CONST);
            this.CONSUME(tokens.ENTRIES);
            this.CONSUME3(tokens.EQUALS);
            this.CONSUME3(tokens.OPEN_BRACE);
            this.SUBRULE(this.entriesList);
            this.CONSUME3(tokens.CLOSE_BRACE);
          },
        },
      ]);
    });
  });

  private keyElementList = this.RULE("keyElementList", () => {
    this.MANY(() => {
      this.SUBRULE(this.expression);
      this.CONSUME(tokens.COLON);
      this.SUBRULE(this.name);
      this.CONSUME(tokens.SEMICOLON);
    });
  });

  private entriesList = this.RULE("entriesList", () => {
    this.SUBRULE(this.keySetExpression);
    this.CONSUME(tokens.COLON);
    this.SUBRULE(this.actionRef);
    this.CONSUME(tokens.SEMICOLON);
  });

  private actionRef = this.RULE("actionRef", () => {
    this.SUBRULE(this.prefixedNonTypeName);
    this.OPTION(() => {
      this.CONSUME(tokens.OPEN_BRACE);
      this.SUBRULE(this.argumentList);
      this.CONSUME(tokens.CLOSE_BRACE);
    });
  });

  private keySetExpression = this.RULE("keySetExpression", () => {
    this.OR([
      {
        ALT: () => {
          //tupleKeySetExpression
          this.CONSUME(tokens.OPEN_BRACE);
          this.SUBRULE(this.simpleKeysetExpression);
          this.CONSUME(tokens.COMMA);
          this.SUBRULE2(this.simpleExpressionList);
          this.CONSUME(tokens.CLOSE_BRACE);
        },
      },
      {
        ALT: () => {
          this.SUBRULE2(this.simpleKeysetExpression);
        },
      },
    ]);
  });

  private simpleExpressionList = this.RULE("simpleExpressionList", () => {
    this.SUBRULE(this.simpleKeysetExpression);
    this.MANY(() => {
      this.CONSUME(tokens.COMMA);
      this.SUBRULE2(this.simpleKeysetExpression);
    });
  });

  private simpleKeysetExpression = this.RULE("simpleKeysetExpression", () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.expression);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.DEFAULT);
        },
      },
      {
        ALT: () => {
          this.CONSUME(tokens.DONTCARE);
        },
      },
      {
        ALT: () => {
          this.SUBRULE2(this.expression);
          this.CONSUME(tokens.MASK);
          this.SUBRULE3(this.expression);
        },
      },
      {
        ALT: () => {
          this.SUBRULE4(this.expression);
          this.CONSUME(tokens.RANGE);
          this.SUBRULE5(this.expression);
        },
      },
    ]);
  });

  private actionList = this.RULE("actionList", () => {
    this.MANY(() => {
      this.SUBRULE(this.prefixedNonTypeName);
      this.OPTION(() => {
        this.CONSUME(tokens.OPEN_BRACE);
        this.SUBRULE(this.argumentList);
        this.CONSUME(tokens.CLOSE_BRACE);
      });
      this.CONSUME(tokens.SEMICOLON);
    });
  });

  private prefixedNonTypeName = this.RULE("prefixedNonTypeName", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(tokens.IDENTIFIER);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.dotPrefix);
          this.CONSUME2(tokens.IDENTIFIER);
        },
      },
    ]);
  });
}

export default SelectParser;
