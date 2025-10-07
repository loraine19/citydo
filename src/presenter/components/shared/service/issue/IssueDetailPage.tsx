import { useParams } from 'react-router-dom';
import { IssueForm } from './IssueDetailCard';
import { Skeleton } from '../../../common/Skeleton';
import DI from '../../../../../di/ioc';
export default function IssueDetailPage() {
    const { id } = useParams()
    const idS = id ? parseInt(id) : 0;
    const issueIdViewModelFactory = DI.resolve('issueIdViewModel');
    const { issue, isLoading, error } = issueIdViewModelFactory(idS);

    return (
        <>

            {isLoading || !issue || error ?
                <Skeleton className="" /> :
                <IssueForm
                    key={issue.id}
                    formik={undefined}
                    service={undefined}
                    issue={issue} />
            }


        </>
    )
}

