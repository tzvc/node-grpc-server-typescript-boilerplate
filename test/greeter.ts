import { credentials, Metadata, ServiceError, status } from '@grpc/grpc-js';
import { expect, assert } from 'chai';

import { GreeterClient } from '../src/services/greeter/generated/service_grpc_pb';
import {
  HelloRequest,
  HelloReply,
} from '../src/services/greeter/generated/service_pb';

/**
 * gRPC GreeterClient Service
 */
class ClientService {
  private readonly client: GreeterClient = new GreeterClient(
    'localhost:8000',
    credentials.createInsecure()
  );

  public async sayHello(
    param: HelloRequest,
    metadata: Metadata = new Metadata()
  ): Promise<HelloReply> {
    return new Promise((resolve, reject): void => {
      this.client.sayHello(
        param,
        metadata,
        (err: ServiceError | null, res: HelloReply) => {
          if (err) {
            return reject(err);
          }

          resolve(res);
        }
      );
    });
  }
}

describe('Greeter test', () => {
  const clientService: ClientService = new ClientService();

  it('Valid greet', async () => {
    const req: HelloRequest = new HelloRequest();
    const testMessage: string = 'test';
    req.setName(testMessage);

    const res: HelloReply = await clientService.sayHello(req);
    const message: string = res.getMessage();

    expect(message).to.equal(`Hello ${testMessage}!`);
  });

  it('Invalid greet (empty name)', async () => {
    const req: HelloRequest = new HelloRequest();

    try {
      const res: HelloReply = await clientService.sayHello(req);
      const message: string = res.getMessage();
    } catch (err) {
      expect(err.code).to.equal(status.INVALID_ARGUMENT);
      return;
    }

    assert.fail('Invalid greet should throw INVALID_ARGUMENT');
  });
});
