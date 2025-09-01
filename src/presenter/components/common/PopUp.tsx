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
                <PopoverContent className="flex w-resp !max-h-[25vh] !max-w-[90%] mx-[5%]  !p-4">
                    <div className='flex overflow-auto'>
                        {content}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}