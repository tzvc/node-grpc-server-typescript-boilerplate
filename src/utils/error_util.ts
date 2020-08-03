import {
  ServiceError as grpcServiceError,
  status,
  Metadata,
} from '@grpc/grpc-js';

/**
 * https://grpc.io/grpc/node/grpc.html#~ServiceError__anchor
 */
export class ServiceError implements grpcServiceError {
  public name: string = 'ServiceError';
  public message: string;

  constructor(
    public code: status,
    public details: string,
    public metadata: Metadata
  ) {
    this.message = details;
  }
}
