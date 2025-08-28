import { Typography } from "@material-tailwind/react";

export function AuthHeader() {
    return (
        <header className="!min-h-[7rem] py-[5%] -ml-1 lg:pt-[1%] flex gap-3 items-center justify-center">
            <img
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                className="h-[4rem] w-[4rem] object-cover object-center "
                src="image/logo.svg"
                alt="logo" />
            <Typography
                variant="h1"
                className="!font-comfortaa  text-[3rem] font-bold">
                City'Do
            </Typography>
        </header>
    )
}