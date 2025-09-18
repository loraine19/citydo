import React from "react";
import { Link } from "react-router-dom";
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

    return (
        <Menu
            ref={ref}
            key={id + "add"}
            blurBack
            placement={!ref ? "center_up" : "full_center"}
            onClose={() => { }}
            className={`${className} hover:z-50 ${!ref ? '' : '  '}`}

            trigger={
                <Icon
                    color="cyan"
                    icon="calendar_add_on"
                    title={`ajouter a mon agenda  : ${title}`}
                    bg={true}
                    size="xl"
                    style={iconClass}
                />
            }>


            <MenuItem
                className="px-4"
                leadingIcon={
                    <Icon icon="calendar_add_on" bg fill color="cyan" size="lg" />}>
                <Link to={agendaLink}
                    className="pb-1"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <h6>Google Agenda</h6>
                </Link>
            </MenuItem>
            <MenuItem
                className="px-4 "
                leadingIcon={<Icon icon="calendar_add_on" bg fill color="orange" size="lg" />}
            >
                <Link
                    className="pb-1"
                    to={agendaICalLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    <h6>iCal / Autres agendas</h6>
                </Link>
            </MenuItem>
        </Menu>
    );
};

export default EventCalAddBtn
