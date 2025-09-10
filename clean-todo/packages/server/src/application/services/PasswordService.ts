import bcrypt from 'bcryptjs';

export class PasswordService {
  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }
  async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
