//src/infrastructure/api/userApi.tsx
import { ModosPage, User } from "../../../domain/entities/User";
import { UserDTO } from "../../DTOs/UserDTO";
import { ApiServiceI, ApiService } from "./apiService";


export class UserApi {
    private readonly dataType: string = 'users';
    private readonly api: ApiServiceI;
    constructor() { this.api = new ApiService(); }


    async getUsersModos(groupId: number): Promise<ModosPage> {
        return this.api.get(`${this.dataType}/modos/${groupId}`);
    }

    async getUsers(groupId: number): Promise<User[]> {
        return this.api.get(`${this.dataType}/inGroup/${groupId}`);
    }

    async getUserCount(groupId: number): Promise<number> {
        return this.api.get(`${this.dataType}/count/${groupId}`);
    }


    async getUserMe(): Promise<User> {
        return this.api.get(`${this.dataType}/me`);
    }

    async getUserById(id: number): Promise<User> {
        return this.api.get(`${this.dataType}/${id}`);
    }

    async deleteUser(id: number): Promise<void> {
        return this.api.delete(`${this.dataType}/${id}`)
    }

    async patchUser(data: UserDTO): Promise<User> {
        return this.api.patch(`${this.dataType}`, data)
    }

    async postUser(data: UserDTO): Promise<User> {
        return this.api.post(`${this.dataType}`, data)
    }
}

