import { UserDTO } from "../../infrastructure/DTOs/UserDTO";
import { ModosPage, User } from "../entities/User";

export abstract class UserRepositoryBase {
    abstract getUserMe(): Promise<User>;
    abstract getUserById(id: number): Promise<User>;
    abstract getUsers(groupId: number): Promise<User[]>;
    abstract getUsersModos(groupId: number): Promise<ModosPage>;
    abstract getUserCount(groupId: number): Promise<number>;
    abstract updateUser(dataDTO: UserDTO): Promise<User>;
    abstract deleteUser(id: number): Promise<void>;
}


