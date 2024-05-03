import mongoose from 'mongoose';
import { Objects } from 'src/utils/Objects';

export class MongoDB {
  private static mongo: typeof mongoose;

  static async connect(uri: string) {
    Objects.requireNonNull(uri);
    if (this.mongo) {
      return;
    }
    this.mongo = await mongoose.connect(uri);
  }

  static async disconnect() {
    await this.mongo.disconnect();
    this.mongo = undefined;
  }
}
