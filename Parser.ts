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
          this.SUBRULE(this.structFieldList);
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

  private argumentList = this.RULE("argumentList", () => {});

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
}

export default SelectParser;
