import { Menu } from '../shared/base/baseComps/Menu';
import { CardMD } from '../shared/base/baseComps/Cards';
import { Button, Md3Variants } from '../shared/base/baseComps/Buttons';

type popUpProps = {
    variant: Md3Variants,
    text: string,
    content: any, classNames: any
}
export default function PopUp(props: popUpProps) {
    const { variant, text, content, classNames }: popUpProps = props

    return (
        <>
            <Menu
                menuRef={undefined}
                open={true}
                placement="auto"
                trigger={
                    <Button variant={variant}
                        color='primary'
                        className={classNames} >
                        {text}
                    </Button>}>

                <CardMD.SupportingText className='flex !max-h-[25vh]  overflow-auto'>
                    {content}
                </CardMD.SupportingText>
            </Menu>
        </>
    )
}