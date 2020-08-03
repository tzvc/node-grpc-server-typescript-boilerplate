// TODO: Migrate to @grpc/grpc-js
import { Server, ServerCredentials } from 'grpc';
// services
import { Greeter, GreeterService } from './services/greeter/service';
// config
import ServerConfig from './config/server_config';

const server: Server = new Server();

server.addService(GreeterService, new Greeter());

server.bind(
  `0.0.0.0:${ServerConfig.Instance().port}`,
  ServerCredentials.createInsecure()
);

server.start();
