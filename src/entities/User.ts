import { uuid } from 'uuidv4'

export class User {
  public readonly userId: string

  public email: string
  public password: string
  public roles: Array<string>

  constructor(props: Omit<User, 'userId'>, userId?: string) {
    Object.assign(this, props)

    if (!userId) {
      this.userId = uuid()
    }
  }
}
