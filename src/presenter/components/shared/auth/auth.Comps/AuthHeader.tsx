import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <header className="!min-h-[7rem] h-max py-auto ml-2 flex gap-3 items-center justify-center">
            <div className="relative flex items-center justify-center flex-1">
                <Typography
                    variant="h1"
                    className="!font-comfortaa text-cyan-500 brightness-[0.95] font-[900] underline decoration-orange-400/90 decoration-from-font  underline-offset-[0.55rem] 
                text-[3rem] ">
                    &nbsp; City'Do &nbsp;
                </Typography>
                <img
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                    className="h-[4rem] w-[4rem] object-cover object-center drop-shadow-sm 
                    absolute left-[calc(50%-8rem)]  -translate-x-1/2"
                    src="image/logo.svg"
                    alt="logo" />



            </div>
        </header>
    )
}