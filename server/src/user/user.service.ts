import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly salt = 10;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userData: {
    username: string;
    password: string;
  }): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { username: userData.username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (await bcrypt.compare(userData.password, user.password)) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);

    if (!user.password) {
      throw new BadRequestException('Password is required');
    }
    if (!user.email) {
      throw new BadRequestException('Email is required');
    }
    if (!user.username) {
      throw new BadRequestException('Username is required');
    }
    user.password = await bcrypt.hash(user.password, this.salt);

    return this.userRepository.save(user);
  }

  // async update(id: number, userData: Partial<User>): Promise<User | null> {
  //   await this.userRepository.update(id, userData);
  //   return this.findOne(id);
  // }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
