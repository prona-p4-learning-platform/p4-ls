Build the Parser:

- tree-sitter generate
- install node-gyp

Build for NodeJS:

- node-gyp configure
- node-gyp build

Build for electron:

- node-gyp rebuild --target=11.2.0 --arch=x64 --dist-url=https://electronjs.org/headers
