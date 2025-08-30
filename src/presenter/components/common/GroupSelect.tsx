import { User } from "../../../domain/entities/User"
import { Select } from "./adaptatersComps/Select";


interface GroupSelectProps {
    formik: any;
    user: User;
    setGroupId?: (groupId: string) => void;
    groupId?: string;
    disabled?: boolean;
}
export default function GroupSelect({ formik, user, groupId, disabled }: GroupSelectProps) {

    // const selectedGroup = user?.GroupUser?.filter((gu: GroupUser) => gu?.Group?.id.toString() === formik.values.groupId?.toString())?.[0]?.Group.name;


    return (
        <Select
            formik={formik}
            value={groupId}
            name={"groupId"}
            placeholder={"Choisir le groupe"}
            disabled={disabled}
            options={user?.GroupUser?.map((group: any) => ({
                label: group.Group.name,
                value: group.Group.id.toString()
            }))} />

    )
}