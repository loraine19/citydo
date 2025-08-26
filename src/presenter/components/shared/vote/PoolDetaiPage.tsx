import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Action } from '../../../../domain/entities/frontEntities';
import CTAMines from '../../common/CTA';
import SubHeader from '../../common/SubHeader';
import PoolDetailCard from './voteCards/PoolDetailCard';
import { GenereMyActions } from '../../../views/viewsEntities/utilsService';
import DI from '../../../../di/ioc';
import { Skeleton } from '../../common/Skeleton';
import { VoteCard } from './voteCards/VoteCard';
import { Button } from '@material-tailwind/react';
import { Icon } from '../../common/IconComp';
import { PoolSurveyStatus } from '../../../../domain/entities/PoolSurvey';

export default function PoolDetailPage() {
    const pageColor = 'orange'

    // PARAMS
    const { id } = useParams();
    const idS = id ? parseInt(id) : 0

    // VIEW MODEL
    const poolIdViewModelFactory = DI.resolve('poolIdViewModel');
    const { pool, isLoading, refetch, error } = poolIdViewModelFactory(idS)

    // FUNCTIONS
    const deletePool = async (id: number) => await DI.resolve('deletePoolUseCase').execute(id)
    const myActions: Action[] = pool && GenereMyActions(pool, "vote/cagnotte", deletePool)
    const [openVote, setOpenVote] = useState(false);

    return (<>
        {openVote &&
            <VoteCard
                open={openVote}
                close={() => setOpenVote(false)}
                vote={pool}
                refetch={refetch} />}
        <main>
            <div className='sectionHeader'>
                <SubHeader
                    type={`Cagnotte `}
                    link={`/vote`}
                    closeBtn />
            </div>
            <section>
                {isLoading || !pool || error ?
                    <Skeleton /> :
                    <PoolDetailCard
                        pool={pool}
                        setOpen={setOpenVote} />
                }
            </section>
            {pool?.mine ?
                <CTAMines actions={myActions} /> :
                <footer className={`CTA`}>
                    <Button
                        disabled={pool?.status !== PoolSurveyStatus.PENDING}
                        size='md'
                        className={` bg-${pageColor} lgBtn`}
                        onClick={() => setOpenVote(true)}>
                        <Icon
                            size='lg'
                            fill
                            icon='smart_card_reader'
                            color='white' />
                        {pool.IVoted ? 'Modifier mon vote' :
                            pool.status === PoolSurveyStatus.PENDING ?
                                'Voter' : 'Cette cagnotte est terminé'}
                    </Button>
                </footer>
            }
        </main>
    </>
    )
}

