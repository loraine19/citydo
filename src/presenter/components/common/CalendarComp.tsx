import { useEffect, useState } from 'react';
import { EventCard } from '../shared/event/eventComps/EventCard';
import { Icon } from './IconComp';
import DI from '../../../di/ioc'
import { dayMS } from '../../../domain/entities/frontEntities';
import { getLabel } from '../../views/viewsEntities/utilsService';
import { eventCategories } from '../../constants';
import { EventStatus } from '../../../domain/entities/Event';
import { CardMD } from '../shared/base/baseComps/Cards';
import { Menu } from '../shared/base/baseComps/Menu';
import { useNavigate } from 'react-router';

export default function CalendarCompLarge(props: { logo?: boolean, divRef?: React.RefObject<HTMLDivElement> }) {
    const { logo } = props || {}
    const [numberOfwweks, setNumberOfwweks] = useState<number>(2)
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayMS));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString())
    const { weeks, loadingEvents, errorEvents, fetchNextPage, hasNextPage, refetch } = DI.resolve('eventsWeekViewModel')(startDate, numberOfwweks)

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    //// NAVIGATE WEEK BTN 
    const addWeek = () => { setStartDate((new Date(new Date(startDate).getTime() + 7 * dayMS)).toDateString()) }
    const removeWeek = () => { setStartDate((new Date(new Date(startDate).getTime() - 7 * dayMS)).toDateString()) }
    const resetWeek = () => { setStartDate(startDateBackup.toDateString()) }
    let num = 3
    const [col, setCol] = useState<number>(num)
    const addCol = () => { col < 7 ? (num = col + 1) : (num = 7), setCol(num) }
    const removeCol = () => { col > 1 ? (num = col - 1) : (num = 1), setCol(num) }
    const resetCol = () => { num = 2, setCol(num) }

    //// USE EFFECT 
    window.addEventListener('resize', () => {
        if (window.innerWidth < 900) setNumberOfwweks(1)
        else setNumberOfwweks(2)
    })
    useEffect(() => {
        if (window.innerWidth < 900) setNumberOfwweks(1)
        else setNumberOfwweks(2)
    }, [])

    useEffect(() => {
        hasNextPage && fetchNextPage()
        if (!weeks) refetch()

    }, [startDate, numberOfwweks, loadingEvents, errorEvents])

    const colClass = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7']

    return (
        <div className='flex flex-col flex-1 px-4 gap-2'
            data-cy="calendar">
            <CardMD.Subhead className="flex overflow-auto w-full p-0 justify-between gap-2 items-center">
                {logo &&
                    <div className='flex flex-1  w-full items-center '>
                        <Icon
                            fill bg
                            color='cyan'
                            icon='today'
                            link="/evenement?view=view_agenda"
                            size="md"
                            title='Voir tous les événements' />
                        <div className="hidden lg:flex pl-2">
                            Évenements
                        </div>
                    </div>}



                {/* DAY SETTING */}
                <div className={`flex flex-1 justify-center gap-1 items-center font-normal text-sm `}>
                    jour
                    <Icon
                        icon='do_not_disturb_on'
                        size='sm'
                        onClick={removeCol} />
                    <button
                        onClick={resetCol}
                        className='!px-2'>
                        {col}
                    </button>
                    <Icon
                        icon='add_circle'
                        size='sm'
                        onClick={addCol} />
                </div>

                {/* WEEKS SETTING */}
                {!logo &&
                    <div className='flex justify-center flex-1 gap-2 px-4 items-center font-normal'>
                        semaine
                        <Icon
                            icon='do_not_disturb_on'
                            size='sm'
                            onClick={() => setNumberOfwweks(numberOfwweks > 1 ? numberOfwweks - 1 : 1)} />
                        <button
                            className='px-2'
                            onClick={() => setNumberOfwweks(2)}>
                            {numberOfwweks}

                        </button>
                        <Icon
                            icon='add_circle'
                            size='sm'
                            onClick={() => setNumberOfwweks(numberOfwweks < 4 ? numberOfwweks + 1 : 4)} />
                    </div>}


                {/* DATE NAVIGATION */}
                <div className='flex flex-1 justify-end items-center font-normal'>
                    <Icon
                        icon='arrow_back_ios'
                        size='sm'
                        onClick={removeWeek} />
                    <button
                        onClick={resetWeek}
                        className='px-2 font-normal text-sm'>
                        {(new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'numeric', day: 'numeric' }))}
                    </button>
                    <Icon
                        icon='arrow_forward_ios'
                        size='sm'
                        onClick={addWeek} />
                </div>
            </CardMD.Subhead>

            {/* CALENDAR */}
            <div className='relative max-h-full w-full flex flex-1 '>

                (<div className='absolute flex flex-col flex-1 h-full p-1 gap-1 w-full rounded-xl bg-white shadow'>
                    {weeks.map((week: any, key: number) => (
                        <div
                            key={key}
                            className={`grid rounded-xl h-full overflow-auto pb-3 border-slate-200 !bg-slate-200/50 border
                                ${colClass[col - 1]}`}>
                            {week.map((day: any, index: number) =>
                                <div className={`flex flex-col text-center h-full border-r border-slate-100/50  `}
                                    key={index}>
                                    <p className={`${new Date(day.date).toDateString() === new Date().toDateString() && '!text-orange-500 underline underline-offset-4 text-font-bold'} 'w-full !text-xs pt-0 min-h-4 sticky top-0 text-center bg-slate-100`}>
                                        {day.date.toLocaleDateString('fr-FR', { weekday: 'narrow', month: 'numeric', day: 'numeric' })}
                                    </p>
                                    <div className='min-h-4 h-full flex flex-col w-full items-center gap-0.5' key={index}>
                                        {day.events.sort((a: any, b: any) => a.id - b.id).map((event: any, indexEvent: number) => {
                                            const eventDays = event.days.map((d: any) => new Date(d).toDateString());
                                            const currentDay = new Date(new Date(day.date).getTime()).toDateString();
                                            return (
                                                <div
                                                    key={indexEvent}
                                                    className='w-full grid rounded-xl  '>
                                                    <Menu
                                                        key={'event-menu' + event.id + currentDay}
                                                        open={open}

                                                        closeIcon={
                                                            <Icon
                                                                icon="close"
                                                                bg style='self-start' color='slate' size="sm" />}
                                                        className='-ml-2 px-2 pt-2 bg-slate-100'
                                                        ref
                                                        blurBack
                                                        placement='center'
                                                        trigger={
                                                            <button
                                                                data-cy='event-handler'
                                                                title={'Voir événement' + ' ' + event.title}
                                                                className=' min-w-full rounded-xl'

                                                            >
                                                                <div
                                                                    className=
                                                                    {`${!event.actif && 'invisible'} 
                                                                             ${event.status !== EventStatus.VALIDATED ? `!bg-slate-400/80` : `bg-cyan-500`} shadow-md px-[0.5rem] mb-[0.2rem]  text-white h-5 truncate flex items-center justify-center font-normal z-50  w-full
                                                        text-[0.80rem]
                                                        ${(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) ? 'rounded-l-xl !justify-start !z-50 pl-3 !font-medium capitalize' : 'italic text-opacity-70'}
                                                        ${(eventDays[eventDays.length - 1] === currentDay || new Date(day.date).getDay() === 0) && 'rounded-r-xl '}
                                                    `}>
                                                                    {(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) ? getLabel(event.category, eventCategories) + '...' : `Jour ${eventDays.indexOf(currentDay) + 1}`}
                                                                </div>
                                                            </button>}>


                                                        <EventCard
                                                            variant='outlined'
                                                            event={event}
                                                            change={() => {
                                                                setOpen(false);
                                                                setInterval(() => {
                                                                    navigate(
                                                                        `/evenement?category=${event.category}`
                                                                    );
                                                                })

                                                            }} />

                                                    </Menu>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>)
            </div>
        </div>
    )
}