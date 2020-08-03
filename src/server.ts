// TODO: Migrate to @grpc/grpc-js
import { Server, ServerCredentials } from 'grpc';
// services
import { Greeter, GreeterService } from './services/greeter/service';

const server: Server = new Server();

server.addService(GreeterService, new Greeter());

server.bind(`0.0.0.0:${8000}`, ServerCredentials.createInsecure());

server.start();
