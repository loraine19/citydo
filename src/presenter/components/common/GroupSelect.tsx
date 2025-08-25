import { Select, Option } from "@material-tailwind/react"
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
            className="rounded-full shadow bg-white border-none capitalize"
            label={formik.errors.groupId ? formik.errors.groupId as string : "Choisir le groupe"}
            name={"groupId"}
            labelProps={{ className: `${formik?.errors?.groupId && "error"} before:border-none after:border-none ` }}
            value={groupId || formik.values.groupId?.toString() || '0'}
            defaultValue={groupId || formik.values.groupId?.toString() || '0'}
            onChange={(val: string | undefined) => {
                formik.setFieldValue('groupId', val)
                formik.groupId = val
                setGroupId(val as string)
            }} >

            {user?.GroupUser?.length > 0 ? user?.GroupUser?.map((group: any, index: number) =>
                <Option
                    className="rounded-full"
                    value={group.Group.id.toString()}
                    key={index}>
                    {group.Group.name}
                </Option>)
                : <Option
                    className="rounded-full"
                    value={'0'}>
                    Aucun groupe</Option>
            }
        </Select>

    )
}