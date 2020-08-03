import { sendUnaryData, ServerUnaryCall, status } from '@grpc/grpc-js';
// types
import { IGreeterServer, GreeterService } from './types/service_grpc_pb';
import { HelloRequest, HelloReply } from './types/service_pb';
// utils
import { ServiceError } from '../../utils/error_util';

/**
 * package helloworld
 * service Greeter
 */
class Greeter implements IGreeterServer {
  /**
   * Implements the sayHello RPC method.
   */
  public sayHello(
    call: ServerUnaryCall<HelloRequest, HelloReply>,
    callback: sendUnaryData<HelloReply>
  ): void {
    const name: string | undefined = call.request?.getName();

    if (!name)
      return callback(
        new ServiceError(
          status.INVALID_ARGUMENT,
          `Field "name" is required.`,
          call.metadata
        ),
        null
      );

    const resp: HelloReply = new HelloReply();
    resp.setMessage(`Hello ${name}!`);
    callback(null, resp);
  }
}

export { Greeter, GreeterService };
