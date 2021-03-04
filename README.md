# A Language Server for the P4 programming language

Still heavily work in progress. It uses tree-sitter as a dependency and therefore is not plug and play at the moment.
Also the repository currently implements the Definition and Hover Providers on top of the Parse Tree and an AST-Construction function on top of the Parse Tree aswell.
Implemented LSP features do not use AST at all.

As a first milestone, it is supposed to support the basic examples of the https://github.com/p4lang/tutorials repository.

This repository is based on the official Microsoft LSP example repository.

## Structure

```
.
├── client // Language Client
│   ├── src
│   │   |
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
└── server // Language Server
    └── src
        └── server.ts // Language Server entry point
```

## Running the Sample

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the launch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a P4 source file.
