import { Button, Popover, PopoverContent, PopoverTrigger } from '@material-tailwind/react';

type popUpProps = {
    variant: 'solid' | 'outline' | 'ghost' | 'gradient',
    text: string,
    content: any, classNames: any
}
export default function PopUp(props: popUpProps) {
    const { variant, text, content, classNames }: popUpProps = props

    return (
        <>
            <Popover offset={10}>
                <PopoverTrigger>
                    <Button variant={variant} color='primary' className={classNames} >{text}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-resp max-h-[50%] m-auto overflow-auto p-4">
                    <div> {content}</div>
                </PopoverContent>
            </Popover>
        </>
    )
}