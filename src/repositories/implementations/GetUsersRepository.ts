import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepostory";
import usersJson from './users.json';
export class GetUsersRepository implements IUsersRepository {
    private users: User[] = [...usersJson];

    async findByEmail(email: string): Promise<User> {
        console.log(email)
        const user = this.users.find(user => user.email === email);
        console.log(user, this.users);
        return user;
    }

    async validatePassword(password: string): Promise<User> {
        const user = this.users.find(user => user.password === password);
        return user;
    }

}