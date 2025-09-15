import { Typography } from "@material-tailwind/react";

export function AuthHeader(props: { className?: string }) {
    return (
        <header className={`!min-h-[6rem] h-max py-auto  flex gap-3 items-center justify-center ${props.className}`}>
            <div className="relative flex items-center justify-center flex-1 pt-2">
                <img
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                    className="h-[4rem] w-[4rem] -mr-5 -mt-1 object-cover object-center"
                    src="image/logo.svg"
                    alt="logo" />
                <Typography
                    variant="h1"
                    className="!font-comfortaa !font-black !text-slate-600
                text-[3rem] ">
                    &nbsp; City'Do &nbsp;
                </Typography>




            </div>
        </header>
    )
}