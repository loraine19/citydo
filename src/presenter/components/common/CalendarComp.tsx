import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, Typography } from '@material-tailwind/react';
import { EventCard } from '../shared/event/eventComps/EventCard';
import { Icon } from './IconComp';
import DI from '../../../di/ioc'
import { dayMS } from '../../../domain/entities/frontEntities';
import { getLabel } from '../../views/viewsEntities/utilsService';
import { eventCategories } from '../../constants';
import { EventStatus } from '../../../domain/entities/Event';

export default function CalendarCompLarge(props: { logo?: boolean }) {
    const { logo } = props || {}
    const [numberOfwweks, setNumberOfwweks] = useState<number>(2)
    const [startDateBackup] = useState<Date>(new Date().getDay() > 0 ? new Date() : new Date(new Date().getTime() - 1 * dayMS));
    const [startDate, setStartDate] = useState<string>(startDateBackup.toDateString())
    const [open, setOpen] = useState<boolean>(false)
    const [popId, setPopId] = useState<string>('')
    const { weeks, loadingEvents, errorEvents, fetchNextPage, hasNextPage } = DI.resolve('eventsWeekViewModel')(startDate, numberOfwweks)

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
        if (window.innerWidth < 900) { setNumberOfwweks(1) } else { setNumberOfwweks(2) }
    })
    useEffect(() => { if (window.innerWidth < 900) { setNumberOfwweks(1); } else { setNumberOfwweks(2) } }, [])
    useEffect(() => { hasNextPage && fetchNextPage() }, [startDate, numberOfwweks, loadingEvents])

    const colClass = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7']

    return (
        <div className='flex flex-col flex-1 pt-3 '
            data-cy="calendar">
            <div className="flex overflow-auto w-full pb-1 justify-between gap-2 items-center p-0">
                {logo &&
                    <div className='flex flex-1  w-full items-center '>
                        <Icon
                            fill bg
                            color='cyan'
                            icon='today'
                            link="/evenement"
                            size="md"
                            title='Voir tous les événements' />
                        <div>
                            <Typography className="hidden lg:flex pl-2">
                                Évenements
                            </Typography>
                        </div>
                    </div>}



                {/* DAY SETTING */}
                <div className={`flex flex-1 justify-center gap-1 items-center font-normal text-sm `}>
                    <Typography>jour</Typography>
                    <Icon
                        icon='do_not_disturb_on'
                        size='sm'
                        onClick={removeCol} />
                    <Typography
                        as='button'
                        onClick={resetCol}
                        className='!font-extralight underline underline-offset-4 pt-0.5'>
                        {col}
                    </Typography>
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
                        <Typography as='button'
                            className='!font-extralight underline underline-offset-4 text-base pt-0.5'
                            onClick={() => setNumberOfwweks(2)}>
                            {numberOfwweks}

                        </Typography>
                        <Icon
                            icon='add_circle'
                            size='sm'
                            onClick={() => setNumberOfwweks(numberOfwweks < 4 ? numberOfwweks + 1 : 4)} />
                    </div>}


                {/* DATE NAVIGATION */}
                <div className='flex flex-1 justify-end items-center'>
                    <Icon
                        icon='arrow_back_ios'
                        size='sm'
                        onClick={removeWeek} />
                    <Typography
                        as='button'
                        onClick={resetWeek}
                        className='!font-extralight !text-slate-600/80 underline underline-offset-4 pt-1'>
                        {(new Date().toLocaleDateString('fr-FR', { weekday: 'short', month: 'numeric', day: 'numeric' }))}
                    </Typography>
                    <Icon
                        icon='arrow_forward_ios'
                        size='sm'
                        onClick={addWeek} />
                </div>
            </div>

            {/* CALENDAR */}
            <div className='relative max-h-full w-full flex flex-1 '>
                {loadingEvents || errorEvents ? (
                    <div className='absolute flex flex-col flex-1 h-full p-2 gap-2 w-full rounded-2xl bg-white shadow '>
                        <div className={`grid grid-cols-${num} rounded-lg h-full overflow-auto pb-3 bg-slate-50 divide-x divide-cyan-500 divide-opacity-20`}>
                            {[...Array(num)].map((_, index) => (
                                <div key={index} className='text-xs w-full flex flex-col text-center h-full'>
                                    <p className='w-full sticky top-0 pt-1 text-center bg-slate-50'>
                                        &nbsp;
                                    </p>
                                    <div className='flex flex-col h-full w-full items-center gap-3'>
                                        {[...Array(numberOfwweks)].map((_, eventIndex) => (
                                            <div key={eventIndex}
                                                className='w-full rounded-xl bg-gray-300 h-7 animate-pulse'>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) :
                    (<div className='!border !border-slate-300/80 absolute flex flex-col flex-1 h-full p-2 gap-2  w-full rounded-2xl bg-white shadow-md '>
                        {weeks && weeks.map((week: any, key: number) => (
                            <div
                                key={key}
                                className={`grid rounded-xl h-full overflow-auto pb-3 !border border-slate-200 !bg-slate-200/50
                                ${colClass[col - 1]}`}>
                                {week.map((day: any, index: number) =>
                                    <div className={`flex flex-col text-center h-full  border-r border-slate-100/50  `}
                                        key={index}>
                                        <p className={`${new Date(day.date).toDateString() === new Date().toDateString() && '!text-orange-500  underline underline-offset-4 text-font-bold'} 'w-full !text-xs pt-0  min-h-4 sticky top-0 text-center bg-slate-100`}>
                                            {day.date.toLocaleDateString('fr-FR', { weekday: 'narrow', month: 'numeric', day: 'numeric' })}
                                        </p>
                                        <div className='min-h-4 h-full flex flex-col w-full items-center gap-0.5' key={index}>
                                            {day.events.sort((a: any, b: any) => a.id - b.id).map((event: any, indexEvent: number) => {
                                                const eventDays = event.days.map((d: any) => new Date(d).toDateString());
                                                const currentDay = new Date(new Date(day.date).getTime()).toDateString();
                                                return (
                                                    <div key={indexEvent} className='w-full rounded-xl  '>
                                                        <Popover
                                                            open={open && popId === event.id + day.date} >
                                                            <button
                                                                data-cy='event-handler'
                                                                title={'Voir événement' + ' ' + event.title}
                                                                className=' w-full rounded-xl'
                                                                onClick={() => { setOpen(true); setPopId(event.id + day.date) }}>
                                                                <PopoverTrigger className='w-full'>
                                                                    <div
                                                                        className=
                                                                        {`${!event.actif && 'invisible'} 
                                                                             ${event.status !== EventStatus.VALIDATED ? `!bg-slate-400/80` : `bg-cyan-500`} shadow-md px-[0.5rem] mb-[0.2rem]  text-white h-5 truncate flex items-center justify-center font-normal z-50 
                                                        ${(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) && 'rounded-l-2xl !justify-start !z-50 pl-4 !font-medium'}
                                                        ${(eventDays[eventDays.length - 1] === currentDay || new Date(day.date).getDay() === 0) && 'rounded-r-2xl '}
                                                    `}>
                                                                        {(eventDays[0] === currentDay || new Date(day.date).getDay() === 1) ? getLabel(event.category, eventCategories) + '...' : `Jour ${eventDays.indexOf(currentDay) + 1}`}
                                                                    </div>
                                                                </PopoverTrigger>
                                                            </button>
                                                            <PopoverContent
                                                                className='bg-transparent backdrop-blur 
                                                                h-[calc(100vh-8rem)] w-screen flex items-center justify-center
                                                                !absolute  shadow-none z-40 border-none p-0 !top-[4rem] !-translate-x-[0%]  flex-col'>
                                                                <div className=' p-4 flex flex-col gap-6 items-end'>
                                                                    <Icon
                                                                        fill
                                                                        title='Fermer'
                                                                        icon="cancel"
                                                                        size="3xl"
                                                                        onClick={() => setOpen(false)}
                                                                        style='' />
                                                                    <EventCard event={event} change={() => { }} />

                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>)
                }
            </div>
        </div>
    )
}
