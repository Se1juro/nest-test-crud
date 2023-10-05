import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from '../model/user.model';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
}
