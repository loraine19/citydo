import React from "react";
import { Icon } from "../../../common/IconComp";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Menu, MenuItem } from "../../base/baseComps/Menu";



interface EventCalAddBtnProps {
    event: EventView;
    className?: string;
    iconClass?: string;
    ref?: boolean;
}

const EventCalAddBtn: React.FC<EventCalAddBtnProps> = ({ event, className, iconClass, ref }) => {
    const { id, title, agendaLink, agendaICalLink, } = event;
    const [open, setOpen] = React.useState(false);

    return (
        <Menu
            open={open}
            setOpen={setOpen}
            key={id + "add"}
            blurBack
            placement={'auto'}
            onClose={() => { }}
            className={`${className} hover:z-[2] ${!ref ? '' : '  '}`}

            trigger={
                <Icon
                    reverse
                    fill
                    color="cyan"
                    icon="calendar_add_on"
                    title={`ajouter a mon agenda  : ${title}`}
                    bg={true}
                    size="xl"
                    style={iconClass + ' !px-1.5 '}
                />
            }>


            <MenuItem
                onClick={() => {
                    setOpen(false);
                    window.open(agendaLink, "_blank", "noopener,noreferrer");
                }}
                className="px-4"
                leadingIcon={
                    <Icon icon="calendar_add_on" bg fill color="cyan" size="lg" />}>

                Google Agenda
            </MenuItem>
            <MenuItem
                onClick={() => {
                    setOpen(false);
                    window.open(agendaICalLink, "_blank", "noopener,noreferrer");
                }}
                className="px-4 "
                leadingIcon={<Icon icon="calendar_add_on" bg fill color="orange" size="lg" />}
            >

                iCal / Autres agendas
            </MenuItem>
        </Menu>
    );
};

export default EventCalAddBtn
