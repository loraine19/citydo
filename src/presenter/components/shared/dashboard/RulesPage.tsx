import { Card, CardBody, Typography, } from '@material-tailwind/react';
import SubHeader from '../../common/SubHeader';
import { Skeleton } from '../../common/Skeleton';
import { useUserStore } from '../../../../application/stores/user.store';
import { Group } from '../../../../domain/entities/Group';
import { useState } from 'react';


export default function RulesPage() {
    const { user } = useUserStore(state => state)
    const groups: Group[] = user?.GroupUser.map((group) => group.Group)
    const [dot, setDot] = useState<number>(0)


    return (
        <>
            <main>
                <div className="sectionHeader ">
                    <SubHeader
                        qty={''}
                        type={`Réglements de vos groupes`}
                        place={' '}
                        closeBtn
                        link='/' />

                </div>

                <section className='flex pb-4 pt-6'>

                    {!groups ?
                        <Skeleton className=' m-auto !h-full !rounded-3xl' /> :
                        <Card className='FixCardNoImage !pb-0 !px-0 flex w-max overflow-x-visible'>
                            <CardBody className='FixCardBody !p-0 '>
                                <div className='p-6 h-full w-full grid grid-cols-1 gap-x-4 grid-rows-1 overflow-x-hidden'>
                                    <div className='flex  overflow-x-auto scrollbar-hide snap-x snap-mandatory'>
                                        {groups.map((group) => (
                                            <div
                                                key={group?.id}
                                                className='
                                            justify-between   flex  w-full h-full flex-col gap-2 pt-8 px-8 snap-center shrink-0'>
                                                <div>
                                                    <Typography variant='h5'>
                                                        {group?.name} :
                                                    </Typography>
                                                    <Typography>{group?.rules}</Typography>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex justify-center gap-3 p-4 '>
                                        {groups.map((_, index) => (
                                            <div
                                                onClick={() => {
                                                    const scrollContainer = document.querySelector('.scrollbar-hide');
                                                    if (scrollContainer) {
                                                        const scrollAmount = scrollContainer.clientWidth * index;
                                                        scrollContainer.scrollTo({
                                                            left: scrollAmount,
                                                            behavior: 'smooth'
                                                        });
                                                        setDot(index);
                                                    }
                                                }}
                                                key={index}
                                                className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 
                                                ${dot === index ? 'bg-cyan-700 scale-125' : 'bg-cyan-500 hover:scale-110'}`}
                                            >
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>}
                </section>
            </main>
        </>
    )
}

