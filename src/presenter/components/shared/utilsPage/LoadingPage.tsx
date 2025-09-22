
import { AppFooter } from '../../common/appComps/AppFooter';
import AppBar from '../../common/appComps/AppBar';
import { SkeletonGrid, } from '../../common/Skeleton';
import SubHeader from '../../common/appComps/SubHeader';

export const LoadingPage = () => {



    return (
        <>
            <header>
                <AppBar />

            </header>
            <main>
                <div className="sectionHeader w-full">
                    <SubHeader type={"Chargement "} />
                </div>
                <SkeletonGrid />
            </main>
            <AppFooter />
        </>

    )
}


