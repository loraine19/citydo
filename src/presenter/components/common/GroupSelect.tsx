import { User } from "../../../domain/entities/User"
import { Select } from "./adaptatersComps/Select";

interface GroupSelectProps {
    formik: any;
    user: User;
    setGroupId?: (groupId: string) => void;
    groupId?: string;
    disabled?: boolean;
    variant?: 'filled' | 'tonal' | 'text' | 'Input';
}

export default function GroupSelect({ formik, user, groupId, disabled, variant = 'Input' }: GroupSelectProps) {

    return (
        <Select
            variant={variant}
            formik={formik}
            value={groupId}
            name={"groupId"}
            placeholder={"Choisir le groupe"}
            disabled={disabled}
            options={user?.GroupUser?.map((group: any) => ({
                label: group.Group.name,
                value: group.Group.id
            }))} />

    )
}