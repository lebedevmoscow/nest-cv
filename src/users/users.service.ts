import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public create(email: string, password: string) {
    const user = this.repo.create({ email, password })

    return this.repo.save(user)
  }

  public findOne(id: number) {
    if (!id) {
      return null
    }
    return this.repo.findOne(id)
  }

  public find(email: string) {
    return this.repo.find({ email })
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOne(id)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    Object.assign(user, attrs)

    return this.repo.save(user)
  }

  public async remove(id: number) {
    const user = await this.repo.findOne(id)

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return this.repo.remove(user)
  }
}
