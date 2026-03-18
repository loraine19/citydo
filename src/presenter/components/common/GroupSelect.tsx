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

export default function GroupSelect({ formik, user, groupId, setGroupId, disabled, variant = 'Input' }: GroupSelectProps) {
    const updateGroupId = (groupId: string) => {
        setGroupId && setGroupId(groupId);
        const group = user?.GroupUser?.find((groupUser: any) => groupUser.Group.id === groupId);
        formik.setFieldValue('groupLength', group?.Group?.GroupUser?.length ?? 0);
    }
    const options = user?.GroupUser?.map((group: any) => ({
        label: group.Group.name,
        value: group.Group.id
    })) ?? [];

    return (
        <Select
            variant={variant}
            formik={formik}
            value={groupId}
            name={"groupId"}
            placeholder="Choisir un groupe"
            disabled={disabled}
            onChangeFunction={(groupId: string) => updateGroupId(groupId)}
            options={options} />
    )
}