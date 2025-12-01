import { useEffect, useMemo, useState } from 'react';
import { Icon } from '../../common/IconComp';
import { useSearchParams } from 'react-router-dom';
import { useNavStore } from '../../../../application/stores/nav.store';
import FormHeadSection from '../base/baseComps/FormHeadSection';
import { CardMD } from '../base/baseComps/Cards';
import { List, ListItem } from '../base/baseComps/Lists';
import { faqData } from '../../../../domain/constants/faqData';


export default function FAQPage() {
    /// FAQ DATA



    //// PARAMS
    const [Params, setParams] = useSearchParams();



    //// TO NAV BAR
    const { setSearchSection } = useNavStore((state) => state);

    const SearchSection = useMemo(() => (
        <FormHeadSection
            isLoading={false}
            notif={''}
            infosChipValue={`faq`} >

        </FormHeadSection>
    ), []);

    useEffect(() => {
        setSearchSection(SearchSection);
        return () => {
            setSearchSection(undefined);
        }
    }, [SearchSection, open]);


    const [openQuestionIndex, setOpenQuestionIndex] = useState<string | null>(null);
    const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(Params.get('category') ? faqData.findIndex(faq => faq.id === Params.get('category')) : null);

    return (
        <main className="hBottomFab">
            <section
                id='refDiv'
                className='flex !px-2 pt-3 pb-2  !overflow-hidden '>

                <CardMD className={` 
                        '!min-h-full !min-h-[100%] p!-0 grid !static `}>
                    <div className=' grid max-h-full h-full relative'>
                        <div className='overflow-y-auto overflow-x-hidden divide-y-4 '>

                            {faqData.map(({ category, id, color, icon, items }, index) =>
                                <div className={`${openCategoryIndex === index ? "pb-6 " : ""} py-1  px-3 flex- justify-center items-center cursor-pointer`}>
                                    <div onClick={() => {
                                        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
                                        setParams({ category: id })
                                        console.log('PARAMS', Params.get('category'));
                                    }}
                                        className={` p-4 gap-4 flex  items-center `}>
                                        <Icon
                                            fill={openCategoryIndex === index}
                                            color={color}
                                            icon={icon}
                                            size='xl' bg />
                                        <h6
                                            key={index}
                                            className={`${openCategoryIndex === index ? `  border-b-[2px] md3-border-${color}` : "underline-offset-0"} -mb-1 font-semibold flex-1`}>
                                            {category}
                                        </h6>
                                    </div>
                                    <List className={`${openCategoryIndex === index ? "flex" : " hidden"} px-3 gap-2 flex !rounded-3xl `}>
                                        {items.map(({ question, answer, icon }, index2) =>
                                            <ListItem
                                                className={`!w-full items-start rounded-xl overflow-hidden !flex !flex-1 hover:md3-${color}
                                                        md3-${color}-container opacity-90 flex-col`}
                                                key={index2}
                                                ItemStart=
                                                {<div
                                                    onClick={() => setOpenQuestionIndex(openQuestionIndex === index2 + category ? null : index2 + category)}
                                                    className='relative flex items-center gap-3 px-1'>
                                                    <Icon reverse fill={openQuestionIndex === index2 + category}
                                                        color={color} icon={icon} size='md' bg />
                                                    <p className='flex-1 font-medium text-md break-normal'>
                                                        {question}
                                                    </p>
                                                </div>}>
                                                <div className={` flex-1 !min-w-full !w-full flex-col pl-10 ${openQuestionIndex === index2 + category ? "flex" : " hidden"}`}>
                                                    <div className="font-[300] !justify-between flex flex-row flex-1 !pr-6 pb-1 pl-4">

                                                        {answer}
                                                    </div>
                                                </div>
                                            </ListItem>
                                        )}
                                    </List>
                                </div>
                            )}

                        </div>

                    </div>
                </CardMD>
            </section>
        </main >
    )
}
