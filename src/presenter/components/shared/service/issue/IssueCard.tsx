import { Card, CardHeader, Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { ServiceType, } from "../../../../../domain/entities/Service";
import ModifBtnStack from "../../../common/ModifBtnStack";
import { DateChip } from "../../../common/ChipDate";
import { Action } from "../../../../../domain/entities/frontEntities";
import DI from "../../../../../di/ioc";
import { GenereMyActions, isLate } from "../../../../views/viewsEntities/utilsService";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { ServiceView } from "../../../../views/viewsEntities/serviceViewEntity";
import ServiceIssueCard from "./ServiceIssueCard";
import { Icon } from "../../../common/IconComp";
import { PathElement } from "../../../../constants";
import React from 'react';
import { IssueStep } from '../../../../../domain/entities/Issue';
import { User } from "../../../../../domain/entities/User";
import { GroupLink } from "../../../common/GroupLink";
import Chip from "../../../common/adaptatersComps/Chip";

type IssueCardProps = { issue: IssueView, mines?: boolean, change: (e: any) => void, update?: () => void }
const IssueCard: React.FC<IssueCardProps> = ({ mines, change, update, issue }) => {
    const { description, image, createdAt, mine, serviceId, statusS } = issue
    const userService: User = issue?.Service?.type === ServiceType.GET ? issue?.Service.User : issue?.Service?.UserResp || {} as User
    const Service = new ServiceView(issue?.Service, userService)
    const haveImage = image ? true : false
    const withMe = (issue?.onMe || issue?.mine) ? true : false
    const isLateValue = isLate(createdAt, 15)
    const deleteIssue = async (id: number) => await DI.resolve('deleteIssueUseCase').execute(id);
    // const updateIssue = async (id: number, data: IssueDTO) => await DI.resolve('updateServiceStepUseCase').execute(id, data)

    const myActions = GenereMyActions(issue, "concialtion", deleteIssue)
    const takenCTA: Action[] = [

        //// TODO : mettre à jour les actions en fonction du status de la concialtion
        {
            icon: "person_cancel",
            title: `annuler ma réponse à concialtion : ${Service?.title}`,
            body: `annuler ma réponse à concialtion : ${Service?.title}`,
            function: async () => {
                //await updateServiceStep(id, ServiceUpdate.CANCEL_RESP); update && update()
            },
        },
        {
            icon: "groups",
            title: `Relancer concialtion : ${Service?.title}`,
            body: ` Relancer concialtion : ${Service?.title}`,
            function: () => { alert(`Voulez-vous relancer concialtion ?`) },
        },
    ]


    return (
        <>
            <Card className={` ${haveImage ? "FixCard" : "FixCardNoImage !grid-rows-[auto_23%_1fr] "} ${withMe ? "!border-orange-400 !border-[1px]" : ""} `}>
                <CardHeader
                    className={haveImage ? "h-full  lg:!max-h-[16vh] !max-h-[14vh] !mb-0" : "FixCardHeaderNoImage "}
                    floated={haveImage}>
                    <div className={haveImage ? "ChipDiv" : "ChipDivNoImage"}>
                        <div className="flex items-start gap-2 ">
                            <button
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    const cat = e.currentTarget.innerText.toLowerCase();
                                    change(cat)
                                }}>
                                <Chip
                                    size="sm"
                                    value={statusS}
                                    className={`${statusS === IssueStep.STEP_3 && 'GreenChip' || statusS === IssueStep.STEP_4 && 'GrayChip' || 'OrangeChip'} truncate lowercase`}
                                >
                                </Chip>
                            </button>
                        </div>
                        <DateChip
                            start={createdAt}
                            prefix="le" />
                    </div>
                    {image &&
                        <img
                            onError={(e) => e.currentTarget.src = "/image/placeholder.jpg"}
                            title="image de concialtion"
                            src={image as any}
                            alt={Service.title}
                            className="ImageCard"
                        />
                    }
                </CardHeader>
                <CardBody className={` FixCardBody`}>
                    <div className="relative flex items-center justify-between">
                        <div className="flex flex-col md:gap-4 lg:gap-0 justify-between w-full mr-8">
                            <Typography
                                as="h6">
                                Probleme :
                            </Typography>
                            <GroupLink group={Service.Group} />
                        </div>
                        <Icon
                            icon="arrow_circle_right"
                            link={`/${PathElement.ISSUE}/${serviceId}`}
                            title={`voir les details de concialtion  ${Service.title}`}
                            bg clear
                            style="absolute -top-2 -right-3"
                            fill />
                    </div>
                    <Typography className="description ">
                        {description}
                    </Typography>
                </CardBody>

                <CardFooter className="CardFooter  flex-col flex-1  pb-4 ">
                    <ServiceIssueCard service={Service} clamp={true} />
                    <div
                        className="flex items-center justify-between">
                        {mine && mines &&
                            <ModifBtnStack
                                actions={myActions}
                                icon3={isLateValue}
                                update={update}
                            />}
                        {mines &&
                            <ModifBtnStack
                                actions={takenCTA} />}
                    </div>
                </CardFooter>
            </Card >
        </>
    )
}

export default IssueCard;