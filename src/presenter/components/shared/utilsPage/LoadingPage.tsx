
import { AppFooter } from '../../common/appComps/AppFooter';
import AppBar from '../../common/appComps/AppBar';
import { SkeletonGrid, } from '../../common/Skeleton';

export const LoadingPage = () => {



    return (
        <>
            <header>
                <AppBar />

            </header>
            <main>

                <SkeletonGrid />
            </main>
            <AppFooter />
        </>

    )
}


