import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export class IntegrationTest {
  private static mongod: MongoMemoryServer;

  static async start() {
    if (this.mongod) {
      return;
    }
    this.mongod = await MongoMemoryServer.create();
    const uri = this.mongod.getUri();
    mongoose.connect(uri);
  }

  static async finish() {
    await this.mongod.stop();
  }
}
