tree-sitter generate
npx node-gyp configure
npx node-gyp build
npx node-gyp rebuild --target=11.2.0 --arch=x64 --dist-url=https://electronjs.org/headers
cp -r build ../../out/tree-sitter-p4/