import { MutableRefObject } from "react";

export interface HandleScrollParams {
    divRef: MutableRefObject<any>;
    hasNextPage: boolean;
    fetchNextPage: () => any;
    setIsBottom: (isBottom: boolean) => void;
}
export interface HandleHideParams {
    divRef: MutableRefObject<any>,
    setHide: (hide: boolean) => void,
    max?: number,
}


interface UtilsInterface {
    handleScroll: (params: HandleScrollParams) => Promise<void>;
    handleHide: (params: HandleHideParams) => void;
}

export class UtilsUseCase implements UtilsInterface {

    //// Handle scroll
    async handleScroll({
        divRef,
        fetchNextPage,
        setIsBottom,
        hasNextPage,
    }: HandleScrollParams) {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            const callNeeded = (scrollTop + clientHeight + 2 >= scrollHeight);
            if (!callNeeded) {
                setIsBottom(false);
                return;
            } else if (callNeeded) {
                if (hasNextPage) {
                    setIsBottom(true);
                    await fetchNextPage();
                }
            }
        }
    }


    //// handle hide 
    private init = 0;
    private lastShouldHide: boolean | null = null;
    handleHide = (params: HandleHideParams) => {
        let { divRef, setHide, max = 50 } = params;

        if (!divRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
        if (scrollTop >= 10) {
            if (scrollTop + clientHeight + max / 2 >= scrollHeight) return;
            let shouldHide = (scrollTop >= max && (this.init <= scrollTop));
            this.init = scrollTop;

            // Avoid flickering: only update if value changes
            if (this.lastShouldHide !== shouldHide) {
                this.lastShouldHide = shouldHide;
                setTimeout(() => setHide(shouldHide), max * 2);
            }
        }
    }

}
