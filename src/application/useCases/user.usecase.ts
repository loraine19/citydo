//src/application/user/getUserMe.usecase.ts
import { ModosPage, User } from "../../domain/entities/User";
import { UserRepositoryBase } from "../../domain/repositoriesBase/UserRepositoryBase";

export class GetUserMeUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<User> {
        return this.userRepository.getUserMe();
    }
}

export class GetUserByIdUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(id: number): Promise<User> {
        return this.userRepository.getUserById(id);
    }
}

export class GetUserCountUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(groupId: number): Promise<number> {
        return this.userRepository.getUserCount(groupId);
    }
}


export class GetUsersUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(groupId: number): Promise<User[]> {
        return this.userRepository.getUsers(groupId)
    }
}

export class GetUsersModosUseCase {
    private userRepository: UserRepositoryBase;

    constructor({ userRepository }: { userRepository: UserRepositoryBase }) {
        this.userRepository = userRepository;
    }

    public async execute(groupId: number): Promise<ModosPage> {
        return this.userRepository.getUsersModos(groupId)
    }
}

