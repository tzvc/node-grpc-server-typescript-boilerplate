import dotenv from 'dotenv';
dotenv.config();

export enum Environments {
  dev = 'development',
  prod = 'production',
}

export default class ServerConfig {
  private static instance: ServerConfig;

  static Instance(): ServerConfig {
    if (!this.instance) this.instance = new ServerConfig();
    return this.instance;
  }

  environment: Environments = Environments.prod;
  port: number = 8000;

  constructor() {
    this.loadData();
  }

  private loadData() {
    console.log('Loading configuration data...');
    this.port = ServerConfig.setFromEnv('PORT', 8080);
    this.environment = ServerConfig.resolveEnvironnement(
      ServerConfig.setFromEnv('NODE_ENV', 'production')
    );
  }

  reload() {
    this.loadData();
  }

  isProductionEnvironnement = () => this.environment === Environments.prod;
  isDevelopmentEnvironnement = () => this.environment === Environments.dev;

  private static resolveEnvironnement(envstr: string): Environments {
    switch (envstr) {
      case 'production':
        return Environments.prod;
      case 'development':
        return Environments.dev;
      default:
        throw Error(`Invalid environment entry: "${envstr}"`);
    }
  }

  private static setFromEnv(envKey: any, defaultVal?: any) {
    if (process.env[envKey]) return process.env[envKey];
    if (defaultVal) {
      console.warn(
        `No entry in env for key "${envKey}". Using default "${defaultVal}"`
      );
      return defaultVal;
    }
    throw Error(`Missing required key in environement: "${envKey}"`);
  }
}
