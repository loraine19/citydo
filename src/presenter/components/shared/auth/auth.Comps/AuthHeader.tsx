

export function AuthHeader(props: { className?: string }) {
    return (
        <header className={`!min-h-[6rem] h-max py-auto  flex gap-3 items-center justify-center ${props.className}`}>
            <div className="relative flex items-center justify-center flex-1 pt-2">
                <img
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://citydo.fr/image/logo.svg' }}
                    className="h-[3.5rem] w-[3.5rem]  object-cover object-center"
                    src="image/logo.svg"
                    alt="logo" />
                <h1
                    className="!font-quicksand md3-text-cyan font-[600] md3-text-cyan
-mt-1 -ml-4                text-[2.8rem] ">
                    &nbsp; City'do &nbsp;
                </h1>




            </div>
        </header>
    )
}