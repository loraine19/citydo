//src/infrastructure/services/notifService.ts
import { Group, GroupCategory } from '../../../domain/entities/Group';
import { Role } from '../../../domain/entities/GroupUser';
import DI from '../../../di/ioc';


export class GroupView extends Group {
    ImIn: boolean = false
    ImModo: boolean = false
    fullAddress: string = ''
    categoryS: string = ''
    length: number = 0
    toogleMember: () => Promise<GroupView | any>;
    toogleModo: () => Promise<GroupView | any>;
    constructor(group: Group, userId: number) {
        super(group);
        if (!group) {
            setTimeout(() => {
                if (!group) throw new Error('Impossible de récupérer le groupe')
            }, 1000);
        };
        this.ImIn = group?.GroupUser?.find((gu) => gu.userId === userId) ? true : false
        this.ImModo = group?.GroupUser?.find((gu) => gu.userId === userId && gu.role === Role.MODO) ? true : false
        this.fullAddress = group?.Address?.address + ' ' + group?.Address?.zipcode + ' ' + group?.Address.city
        this.categoryS = GroupCategory[group?.category as string as keyof typeof GroupCategory]
        this.length = group?.GroupUser?.length || 0
        // METHODS
        this.toogleMember = async () => {
            this.ImIn ?
                await DI.resolve('deleteGroupUserUseCase').execute(group.id) :
                await DI.resolve('postGroupUserUseCase').execute({ groupId: group.id, role: Role.MEMBER });
            const updatedGroup = await DI.resolve('getGroupByIdUseCase').execute(group.id);
            return new GroupView(updatedGroup, userId)
        }
        this.toogleModo = async () => {
            this.ImModo ?
                await DI.resolve('updateGroupUserUseCase').execute({ groupId: group.id, role: Role.MEMBER }) :
                this.ImIn ?
                    await DI.resolve('updateGroupUserUseCase').execute({ groupId: group.id, role: Role.MODO }) :
                    await DI.resolve('postGroupUserUseCase').execute({ groupId: group.id, role: Role.MODO });
            const updatedGroup = await DI.resolve('getGroupByIdUseCase').execute(group.id);
            return new GroupView(updatedGroup, userId)
        }
    }
}


