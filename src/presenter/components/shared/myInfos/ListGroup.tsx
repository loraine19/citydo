import {
  ListItem,
  Typography,
  Menu,
  MenuTrigger,
  MenuContent
} from "@material-tailwind/react";
import Chip from "../../common/adaptatersComps/Chip";
import { Icon } from "../../common/IconComp";
import { GroupView } from "../../../views/viewsEntities/GroupViewEntity";
import { GroupLink } from "../../common/GroupLink";
import { useNavigate } from "react-router";
import { useState } from "react";
import { InputError } from "../../common/adaptatersComps/input";
//kk
type ListGroupProps = {
  groups: GroupView[];
  error?: string | null;
  isLoading?: boolean;
}

export const ListGroup = ({ groups, error, isLoading }: ListGroupProps) => {
  const navigate = useNavigate();
  const haveAGroup: GroupView[] = groups.filter((group: GroupView) => group.ImIn || group.ImModo)
  const [open, setOpen] = useState<boolean>(false);

  const [notif] = useState<string>(isLoading ? 'Chargement...' : error ?? (groups.length === 0 || !groups) ? ' Enregistrez votre adresse pour voir les groupes à proximité' : haveAGroup.length === 0 ? 'Vous n\'êtes pas membre d\'un groupe' : '');

  console.log(groups)
  return (
    <div
      className="relative w-respLarge ">
      <Menu
        open={open}
        placement="bottom-start">
        <MenuTrigger
          type="button"
          className={`relative flex justify-between h-max w-full z-50  items-center cursor-pointer ${open ? '!border-b-[0px] !border-slate-500' : '!border-b-[1px] border-slate-300'} mt-1.5 pb-2`}>
          <div
            className="relative flex justify-between h-max w-full">
            <button type='button'
              onClick={() => groups.length > 0 && setOpen(!open)}
              className={"flex flex-col gap-2"}>

              <Typography
                variant="small"
                className={`line-clamp-1`}>

                <span className="!text-gray-500 text-sm font-normal">
                  {haveAGroup.map((group: GroupView) => group.name).join(', ')}
                </span>

              </Typography>
            </button>
            <button type='button'
              onClick={() => groups.length > 0 && setOpen(!open)}
              className={"h-[18px] w-[18px] opacity-70" + (open ? 'rotate-180' : '')}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="h-[1em] w-[1em] translate-x-0 stroke-[1.2]"><path d="M17 8L12 3L7 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 16L12 21L7 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
          </div>
        </MenuTrigger>
        <InputError mt
          error={groups.length === 0 || !groups ? ' Enregistrez votre adresse pour voir les groupes à proximité' : haveAGroup.length === 0 ? 'Vous n\'êtes pas membre d\'un groupe' : ''}
          tips={notif ?? haveAGroup?.length > 1 ? 'Vos groupes' : 'Votre groupe'} />
        <MenuContent className="w-respLarge border-[1px] !-mt-3  bg-transparent !-ml-6 shadow-none border-none ">
          <div className="bg-white divide-y-[1px] p-2 shadow-lg rounded-lg mx-2 border-[1px] border-slate-200">
            {groups.length > 0 && groups.map((group: GroupView) =>
              <ListItem
                onClick={() => navigate(`/groupe/${group.id}`)}
                key={group.id}
                title="Voir les détails du groupe"
                className="justify-between py-1.5">
                <GroupLink group={group} />
                <div className="flex items-center gap-2">
                  <Chip
                    value={group?.ImModo ? '✓' : ''}
                    variant="ghost"
                    className="rounded-full h-max GrayChip flex items-center  !min-w-max "
                    icon={
                      <Icon
                        size="md"
                        icon="diversity_3"
                        fill={group?.ImModo}
                        color={group?.ImModo ? "orange" : "gray"}
                        title={group?.ImModo ? "Je suis conciliateur" : "Je ne suis pas conciliateur"} />}
                  />

                  <Chip
                    value={group?.ImIn ? '✓' : ''}
                    variant="ghost"
                    className="rounded-full  h-max GrayChip flex items-center  !min-w-max "
                    icon={
                      <Icon
                        size="md"
                        icon="groups"
                        fill={group?.ImIn}
                        color={group?.ImIn ? "cyan" : "gray"}
                        title={group?.ImIn ? "Je suis membre" : "Je ne suis pas membre"} />}
                  />
                </div>
              </ListItem>)}
          </div>
        </MenuContent>
      </Menu>
    </div>
  );
}