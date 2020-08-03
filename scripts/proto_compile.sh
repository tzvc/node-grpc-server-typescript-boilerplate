#!/bin/sh

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Path to the grpc_node_plugin
PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

find ./src/services/* -maxdepth 0 -type d -not -path '*/\.*' | while read path; do
		echo "Compiling protos for service at $path"
    # Generate Javascript code via grpc tools
		yarn run grpc_tools_node_protoc \
    --grpc_out=grpc_js:$path/generated \
    --plugin=protoc-gen-grpc=$PROTOC_GEN_GRPC_PATH \
    --js_out=import_style=commonjs,binary:$path/generated \
    -I $path $path/*.proto

    # Generate typescript type definitions
    yarn run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
    --ts_out=$path/generated \
    -I $path $path/*.proto

    # this is a hack until grpc-js get support for ts codegen
    # see: https://github.com/grpc/grpc-node/issues/1417
		# Fix import paths within TypeScript files generated by `grpc_tools_node_protoc`
    sed -i "" -e "s/from \"grpc\"/from \"@grpc\/grpc-js\"/g" $path/generated/*_grpc_pb.d.ts
done

echo "Done"