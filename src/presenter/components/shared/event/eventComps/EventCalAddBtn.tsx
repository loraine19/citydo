import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../../common/IconComp";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";
import { Menu, MenuItem } from "../../base/baseComps/Menu";



interface EventCalAddBtnProps {
    event: EventView;
    className?: string;
    iconClass?: string;
}

const EventCalAddBtn: React.FC<EventCalAddBtnProps> = ({ event, className, iconClass }) => {
    const { id, title, agendaLink, agendaICalLink } = event;

    return (
        <Menu
            key={id + "add"}
            placement="center_up"
            onClose={() => { }}
            closeIcon={<></>}
            className={className + ' hover:z-50 min-h-max hover:cursor-pointer '}
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
                leadingIcon={<Icon icon="calendar_add_on" bg fill color="cyan" size="lg" />}>
                <Link to={agendaLink}
                    className="pb-1"
                    target="_blank"
                    rel="noopener noreferrer" >
                    <h6>Google Agenda</h6>
                </Link>
            </MenuItem>
            <MenuItem
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
