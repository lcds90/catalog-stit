import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepostory";
import fs from 'fs';
export class GetUsersRepository implements IUsersRepository {
    private usersJson = require("./fixtures/users.json");
    private users: User[] = [...this.usersJson];
    
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async validatePassword(password: string): Promise<User> {
        const user = this.users.find(user => user.password === password);
        return user;
    }
}