import { Checkbox, List, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Icon } from "./IconComp";
import { useUxStore } from "../../../application/stores/ux.store";

type checkCardProps = {
    categoriesArray: string[];
    setBoxSelected: (selected: string[]) => void;
    boxSelected: string[];
    style?: string;
};

export default function CheckCard(props: checkCardProps) {
    const { categoriesArray, boxSelected, setBoxSelected, style = '' } = props;

    useEffect(() => {
        setCheckedState(categoriesArray.map(category => boxSelected.includes(category)));
    }, [boxSelected, categoriesArray]);

    const [checkedState, setCheckedState] = useState<boolean[]>(categoriesArray.map(category => boxSelected.includes(category)));

    const handleCheckboxChange = (index: number, checked: boolean) => {
        const updatedCheckedState = checkedState.map((item, idx) => (idx === index ? checked : item));
        setCheckedState(updatedCheckedState);

        const updatedBoxSelected = categoriesArray.filter((_, idx) => updatedCheckedState[idx]);
        setBoxSelected(updatedBoxSelected);
    };
    const { color } = useUxStore((state) => state);

    return (
        <div className={`flex w-full h-full  ${style} overflow-hidden gap-3`}>
            <div className="w-full !m-0 h-full !max-w-[calc(100vw)] overflow-auto !flex items-center rounded-full ">
                <List className="flex-row h-full flex w-full !min-w-max justify-evenly items-center  !p-0  ">
                    {categoriesArray.map((category, index) => (
                        <List.Item className="px-0.5 h-full w-full min-w-max hover:!bg-transparent" key={index}>
                            <label htmlFor={category} className="flex flex-1">
                                <List.ItemStart className={` min-h-8 relative w-full !px-0 py-0.5 !m-0 flex items-center justify-center rounded-full border-[1px]  ${checkedState[index] ? ` ${` ${color}Style !border-none `} ` : ` md3-${color}-outlined  `}`}>
                                    <Checkbox
                                        checked={checkedState[index]}
                                        id={category}
                                        value={category}
                                        className="absolute !flex !justify-start !shadow-none rounded-full w-full h-full !bg-transparent flex-1 border-none"
                                        onChange={(e: any) => handleCheckboxChange(index, e.target.checked)}
                                    >

                                    </Checkbox>
                                    <Typography
                                        as="label"
                                        htmlFor="default-checkbox"
                                        className={` flex items-center justify-center whitespace-nowrap text-sm font-roboto !min-w-max  rounded-3xl  text-center w-full  lg:gap-2 gap-0.5 ${checkedState[index] ? 'pr-4 pl-2 font-medium' : 'px-4'} `}
                                    >
                                        {checkedState[index] && <Icon
                                            color={color ?? 'slate'}
                                            size={"lg"}
                                            icon={'check'} />}

                                        {category}
                                    </Typography>
                                </List.ItemStart>

                            </label>
                        </List.Item>
                    ))}
                </List>
            </div>
            <div className="flex items-center sm:px-1 sm:gap-1 rounded-full">
                <Icon
                    disabled={checkedState.some(Boolean) ? false : true}
                    icon="cancel"
                    size="xl"
                    fill={checkedState.some(Boolean)}
                    color={color ?? 'slate'}
                    onClick={() => {
                        setBoxSelected([]);
                        setCheckedState([...new Array(categoriesArray.length).fill(false)]);
                    }}
                ></Icon>
                <Icon
                    disabled={checkedState.every(Boolean) ? true : false}
                    fill={checkedState.every(Boolean) ? false : true}
                    icon="check_circle"
                    size="xl"
                    color={color ?? 'slate'}
                    onClick={() => {
                        setBoxSelected([...categoriesArray]);
                        setCheckedState([...new Array(categoriesArray.length).fill(true)]);

                    }} />
            </div>

        </div>
    );
}
