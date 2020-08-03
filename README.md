# base-gRPC-service

Boilerplate code for Node.js gRPC services written in Typescript.

### Installation

```sh
$ npm i
```

### Build

```sh
$ npm run build:proto # *.proto
$ npm run build # *.ts
```

### Server Start

```sh
$ node dist/server
# OR
$ npm start
```

### Test

```sh
# with a server running locally
npm test
```

##### Documentation

- [Node.js gRPC](https://grpc.io/grpc/node/grpc.html)
- [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json)
- [TypeScript d.ts plugin for gRPC Tools](https://github.com/agreatfool/grpc_tools_node_protoc_ts)
