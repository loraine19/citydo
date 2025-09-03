import { Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import PopOver from "../../../common/adaptatersComps/PopOver";
import { Icon } from "../../../common/IconComp";
import { EventView } from "../../../../views/viewsEntities/eventViewEntities";



interface EventCalAddBtnProps {
    event: EventView;
    className?: string;
    iconClass?: string;
}

const EventCalAddBtn: React.FC<EventCalAddBtnProps> = ({ event, className, iconClass }) => {
    const { id, title, agendaLink, agendaICalLink, Igo } = event;

    return (
        <PopOver
            key={id + "add"}
            className={className + ' hover:cursor-pointer '}
            trigger={
                <Icon
                    icon="calendar_add_on"
                    title={`ajouter a mon agenda  : ${title}`}
                    bg={true}
                    fill
                    size="lg"
                    style={iconClass}
                    color={Igo ? "cyan" : "gray"}
                />
            }
            children={
                <Card className="card">
                    <CardHeader className="px-4 py-2 flex items-center gap-4">

                        <h4>
                            Ajouter à votre agenda
                        </h4>
                    </CardHeader>
                    <CardBody className="FixCardBody flex flex-col items-center justify-center divide-y  ">
                        <Link to={agendaLink}
                            className="w-full flex items-center gap-3 border-t px-4 py-3 "
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon icon="calendar_add_on" bg fill color="cyan" size="lg" />
                            <h6>Google Agenda</h6>
                        </Link>
                        <Link
                            to={agendaICalLink}
                            className="w-full flex items-center gap-3 px-4 py-3 !border-b "
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon icon="calendar_add_on" bg fill color="orange" size="lg" />

                            <h6>iCal / Autres agendas</h6>
                        </Link>
                    </CardBody>
                    <CardFooter className="CardFooter">
                        <small>
                            Synchronisez facilement cet événement avec votre agenda préféré
                        </small>
                    </CardFooter>
                </Card>
            }
        />
    );
};

export default EventCalAddBtn
