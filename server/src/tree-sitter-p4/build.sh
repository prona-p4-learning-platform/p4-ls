npx tree-sitter generate
npx node-gyp configure
npx node-gyp build
if [ "$ELECTRON_VERSION" ]; then
    echo "building for electron:"
	npx electron-rebuild --module-dir "../../" --version $ELECTRON_VERSION -w tree-sitter
	npx node-gyp rebuild --target=$ELECTRON_VERSION --arch=x64 --dist-url=https://electronjs.org/headers
fi

cp -r build ../../out/tree-sitter-p4/
cp ./index.js ../../out/tree-sitter-p4/
