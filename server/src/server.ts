/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  Connection,
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
} from "vscode-languageserver/node";
import TextDocumentManager from "./TextDocumentManager";
import DefinitionProviderCreator from "./DefinitionProvider";
import HoverProviderCreator from "./HoverProvider";
import { TextDocument } from "vscode-languageserver-textdocument";
import CompletionProvider from "./CompletionProvider";

// The example settings
interface ExampleSettings {
  maxNumberOfProblems: number;
}

class P4LanguageServer {
  public connection: Connection;

  // Create a simple text document manager.
  private documentManager = new TextDocumentManager();
  private documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );

  // The global settings, used when the `workspace/configuration` request is not supported by the client.
  // Please note that this is not the case when using this server with the client provided in this example
  // but could happen with other clients.
  private defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
  private globalSettings: ExampleSettings = this.defaultSettings;

  // Cache the settings of all open documents
  private documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

  private hasConfigurationCapability: boolean = false;
  private hasWorkspaceFolderCapability: boolean = false;
  private hasDiagnosticRelatedInformationCapability: boolean = false;

  constructor() {
    // Create a connection for the server, using Node's IPC as a transport.
    // Also include all preview / proposed LSP features.
    this.connection = createConnection(ProposedFeatures.all);

    this.connection.onInitialize((params: InitializeParams) => {
      let capabilities = params.capabilities;

      // Does the client support the `workspace/configuration` request?
      // If not, we fall back using global settings.
      this.hasConfigurationCapability = !!(
        capabilities.workspace && !!capabilities.workspace.configuration
      );
      this.hasWorkspaceFolderCapability = !!(
        capabilities.workspace && !!capabilities.workspace.workspaceFolders
      );
      this.hasDiagnosticRelatedInformationCapability = !!(
        capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation
      );

      const result: InitializeResult = {
        capabilities: {
          textDocumentSync: TextDocumentSyncKind.Incremental,
          // Tell the client that this server supports code completion.
          completionProvider: {
            resolveProvider: true,
            triggerCharacters: ["."],
          },
          definitionProvider: true,
          hoverProvider: true,
        },
      };
      if (this.hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
          workspaceFolders: {
            supported: true,
          },
        };
      }
      return result;
    });

    this.connection.onInitialized(() => {
      if (this.hasConfigurationCapability) {
        // Register for all configuration changes.
        this.connection.client.register(
          DidChangeConfigurationNotification.type,
          undefined
        );
      }
      if (this.hasWorkspaceFolderCapability) {
        this.connection.workspace.onDidChangeWorkspaceFolders((_event) => {
          this.connection.console.log(
            "Workspace folder change event received."
          );
        });
      }
    });

    this.connection.onDidChangeConfiguration((change) => {
      if (this.hasConfigurationCapability) {
        // Reset all cached document settings
        this.documentSettings.clear();
      } else {
        this.globalSettings = <ExampleSettings>(
          (change.settings.languageServerExample || this.defaultSettings)
        );
      }
    });

    // Only keep settings for open documents
    this.documents.onDidClose((e) => {
      this.documentSettings.delete(e.document.uri);
    });

    // The content of a text document has changed. This event is emitted
    // when the text document first opened or when its content has changed.
    this.documents.onDidChangeContent((change) => {
      this.validateTextDocument(change.document);
    });

    this.connection.onDidChangeWatchedFiles((_change) => {
      // Monitored files have change in VSCode
      this.connection.console.log("We received an file change event");
    });

    this.connection.onDefinition(
      DefinitionProviderCreator(this.documentManager)
    );
    this.connection.onHover(HoverProviderCreator(this.documentManager));

    // This handler provides the initial list of the completion items.
    this.connection.onCompletion(CompletionProvider(this.documentManager));

    // This handler resolves additional information for the item selected in
    // the completion list.
    this.connection.onCompletionResolve(
      (item: CompletionItem): CompletionItem => {
        if (item.data === 1) {
          item.detail = "TypeScript details";
          item.documentation = "TypeScript documentation";
        } else if (item.data === 2) {
          item.detail = "JavaScript details";
          item.documentation = "JavaScript documentation";
        }
        return item;
      }
    );

    // Make the text document manager listen on the connection
    // for open, change and close text document events
    this.documents.listen(this.connection);

    // Listen on the connection
    this.connection.listen();
  }

  getDocumentSettings(resource: string): Thenable<ExampleSettings> {
    if (!this.hasConfigurationCapability) {
      return Promise.resolve(this.globalSettings);
    }
    let result = this.documentSettings.get(resource);
    if (!result) {
      result = this.connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "languageServerExample",
      });
      this.documentSettings.set(resource, result);
    }
    return result;
  }

  async validateTextDocument(textDocument: TextDocument): Promise<void> {
    let settings = await this.getDocumentSettings(textDocument.uri);
    let diagnostics: Diagnostic[] = [];
    try {
      diagnostics = [...this.documentManager.update(textDocument)];
    } catch (ex) {
      this.connection.console.log(ex);
    }

    // Send the computed diagnostics to VSCode.
    this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }
}

export const P4LanguageServerInstance = new P4LanguageServer();
