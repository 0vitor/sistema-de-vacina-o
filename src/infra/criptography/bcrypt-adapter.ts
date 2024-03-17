import bcrypt from 'bcrypt';

import { Hasher } from '@src/data/protocols/hasher';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return '';
  }
}