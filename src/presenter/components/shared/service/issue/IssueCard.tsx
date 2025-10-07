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
import { CardMD } from "../../base/baseComps/Cards";

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
            <CardMD
                image={haveImage ? image as any : undefined}
                variant="outlined"
                className={`${withMe ? "!border-orange-400 !border-[1px]" : ""} `}
                key={issue.serviceId} >
                <CardMD.Chips className="!justify-between">
                    <Chip
                        onClick={(e) => {
                            const cat = e.currentTarget.innerText.toLowerCase();
                            change(cat)
                        }}
                        value={statusS}
                        className={`${statusS === IssueStep.STEP_3 && 'greenChip' || statusS === IssueStep.STEP_4 && 'grayChip' || 'orangeChip'} truncate lowercase`}
                    >
                    </Chip>
                    <DateChip
                        start={createdAt}
                        prefix="le" />

                </CardMD.Chips>
                <CardMD.Headline className="!justify-between flex pt-2">
                    Probleme :
                    <Icon
                        color='slate'
                        size="sm"
                        icon="keyboard_arrow_right"
                        link={`/${PathElement.ISSUE}/${serviceId}`}
                        title={`voir les details de concialtion  ${Service.title}`}
                        bg
                        fill />
                </CardMD.Headline>
                <CardMD.Subhead>
                    <div className="grid">
                        <GroupLink group={Service.Group} />
                    </div>


                </CardMD.Subhead>
                <CardMD.SupportingText className="!line-clamp-1">
                    {description}
                </CardMD.SupportingText>

                <CardMD.Footer className="flex flex-1 flex-col !pb-0">
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
                </CardMD.Footer>
            </CardMD >
        </>
    )
}

export default IssueCard;