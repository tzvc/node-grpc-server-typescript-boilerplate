// package: helloworld
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as service_pb from "./service_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IGreeterService_ISayHello;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<service_pb.HelloRequest, service_pb.HelloReply> {
    path: string; // "/helloworld.Greeter/SayHello"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<service_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<service_pb.HelloRequest>;
    responseSerialize: grpc.serialize<service_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<service_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer {
    sayHello: grpc.handleUnaryCall<service_pb.HelloRequest, service_pb.HelloReply>;
}

export interface IGreeterClient {
    sayHello(request: service_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: service_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: service_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: service_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: service_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: service_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.HelloReply) => void): grpc.ClientUnaryCall;
}
