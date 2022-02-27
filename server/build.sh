npx node-gyp configure
npx node-gyp build

if [ "$ELECTRON_VERSION" ]; then
    echo "Building for electron version $ELECTRON_VERSION"
	npx electron-rebuild --module-dir "./" --version $ELECTRON_VERSION -w tree-sitter
	npx node-gyp rebuild --target=$ELECTRON_VERSION --arch=x64 --dist-url=https://electronjs.org/headers
	echo "Done building for electron."
fi

