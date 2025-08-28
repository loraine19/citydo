import { Select } from "@material-tailwind/react"
import { User } from "../../../domain/entities/User"


interface GroupSelectProps {
    formik: any;
    user: User;
    setGroupId: (groupId: string) => void;
    groupId?: string;
    disabled?: boolean;
}
export default function GroupSelect({ formik, user, setGroupId, groupId, disabled }: GroupSelectProps) {

    return (
        <Select
            disabled={disabled}
            name={"groupId"}
            value={groupId || formik.values.groupId?.toString() || '0'}
            defaultValue={groupId || formik.values.groupId?.toString() || '0'}
            onChange={(val: string | undefined) => {
                formik.setFieldValue('groupId', val)
                formik.groupId = val
                setGroupId(val as string)
            }} >
            <Select.Trigger
                placeholder={formik.errors.groupId ? formik.errors.groupId as string : "Choisir le groupe"}
                className="inputDiv " />
            <Select.List>
                {user?.GroupUser?.length > 0 ? user?.GroupUser?.map((group: any, index: number) =>
                    <Select.Option
                        className="rounded-full"
                        value={group.Group.id.toString()}
                        key={index}>
                        {group.Group.name}
                    </Select.Option>)
                    : <Select.Option
                        className="rounded-full"
                        value={'0'}>
                        Aucun groupe
                    </Select.Option>
                }
            </Select.List>
        </Select>

    )
}