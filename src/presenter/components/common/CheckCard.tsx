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
    const colorShade = (color: string): string => `${color}-500 `;
    const colorShadeDark = (color: string): string => `${color}-500 `;

    return (
        <div className={`flex w-full  ${style} `}>
            <div className="w-full !m-0 h-full !max-w-[calc(100vw)] overflow-auto pl-2 !flex items-center rounded-xl">
                <List className="flex-row h-full flex w-full !min-w-max justify-evenly items-center !p-0  ">
                    {categoriesArray.map((category, index) => (
                        <List.Item className="px-0.5 h-full w-full min-w-max hover:!bg-transparent" key={index}>
                            <label htmlFor={category} className="flex flex-1">
                                <List.ItemStart className={`bg-slate-400 h-7 relative w-full !px-0 py-0.5 !m-0 flex items-center justify-center rounded-full !shadow-sm border-[1px] border-${color}-500 shadow-sm ${checkedState[index] ?
                                    ` ${color}Style  ` :
                                    ` bg-transparent !text-${color}-500  border-current opacity-70`}`}>
                                    <Checkbox
                                        checked={checkedState[index]}
                                        id={category}
                                        value={category}
                                        className="absolute !flex !justify-start !shadow-none rounded-full w-full h-full !bg-transparent border-none"
                                        onChange={(e: any) => handleCheckboxChange(index, e.target.checked)}
                                    >

                                    </Checkbox>
                                    <Typography
                                        as="label"
                                        htmlFor="default-checkbox"
                                        className={`${checkedState[index] ? `text-${colorShadeDark(color)} ` : `text-${colorShade(color)} text-opacity-90`} whitespace-nowrap text-sm font-normal !min-w-max  px-4`}
                                    >{category}</Typography>
                                </List.ItemStart>

                            </label>
                        </List.Item>
                    ))}
                </List>
            </div>
            <div className="flex opacity-95 items-center px-0.5 rounded-full">
                <Icon
                    icon="cancel"
                    size="lg"
                    fill={checkedState.some(Boolean)}
                    style='opacity-70'
                    color={color ?? 'slate'}
                    onClick={() => {
                        setBoxSelected([]);
                        setCheckedState(new Array(categoriesArray.length).fill(false));
                    }}
                ></Icon>
                <Icon
                    fill={!checkedState.every(Boolean)}
                    style='opacity-70'
                    icon="check_circle"
                    size="lg"
                    color={color ?? 'slate'}
                    onClick={() => {
                        setBoxSelected(categoriesArray);
                        setCheckedState(new Array(categoriesArray.length).fill(true));
                    }} />
            </div>

        </div>
    );
}
