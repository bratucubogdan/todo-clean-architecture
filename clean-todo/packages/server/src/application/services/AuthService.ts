import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { PasswordService } from './PasswordService.js';
import { signJwt } from '../../infrastructure/security/jwt.js';
import { UserEntity } from '../../domain/entities/User.js';

export class AuthService {
  constructor(private users: UserRepository, private passwords: PasswordService) {}

  async register(email: string, name: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new Error('Email already in use');
    const passwordHash = await this.passwords.hash(password);
    const user = await this.users.create({ email, name, passwordHash });
    const token = signJwt({ sub: user.id!, email: user.props.email, name: user.props.name });
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await this.passwords.compare(password, user.props.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const token = signJwt({ sub: user.id!, email: user.props.email, name: user.props.name });
    return { user, token };
  }
}
