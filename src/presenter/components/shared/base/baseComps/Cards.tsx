import { ReactNode, HTMLAttributes, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import React from "react";
import { Icon } from "../../../common/IconComp";

type CardVariant = "elevated" | "filled" | "outlined" | "tonal";
type ImagePosition = "top" | "left";

interface CardMDProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    color?: string;
    children?: ReactNode;
    image?: ReactNode;
    imagePosition?: ImagePosition;
    link?: string;
    autoFit?: boolean;

}

//// SUB-COMPONENTS ////

//// CARD IMAGE
export const CardImage: React.FC<{
    src: string;
    alt?: string;
    position?: ImagePosition;
    className?: string;
    onClick?: () => void;
    children?: ReactNode;
}> = ({ src, alt, className, children, onClick }) => (
    <div className={`md3-card-image-container ${className} ${onClick ? "cursor-pointer" : ""} flex-1 `}
        onClick={() => onClick && onClick()}>
        <img onError={(e: any) => { e.currentTarget.src = 'public/image/placeholder.jpg' }}
            className={`md3-card-image`}
            src={src}
            alt={alt}
        />
        {children &&
            <div className="md3-card-image-children">
                {children}
            </div>}
    </div>
);

//// CARD HEADER
export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-header ${className}`}>{children}</div>
);

//// CARD CHIPS
export const CardChips: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-chips ${className}`}>{children}</div>
);

//// CARD HEADLINE
export const CardHeadline: React.FC<{ children: ReactNode; className?: string, onClick?: () => void }> = ({ children, className }) => (
    <div className={`md3-card-headline ${className}`} >{children}</div>
);

//// CARD SUBHEAD
export const CardSubhead: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-subhead ${className}`}>{children}</div>
);

//// CARD SUPPORTING TEXT
export const CardSupportingText: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-supporting-text ${className}`}>{children}</div>
);

//// CARD MEDIA
export const CardMedia: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-media ${className}`}>{children}</div>
);

//// CARD FOOTER
export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-footer ${className}`}>{children}</div>
);

//// CARD MID SECTION
export const CardMidSection: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-mid-section   ${className}`}>{children}</div>
);

//// MAIN CARD COMPONENT
export const CardMD: React.FC<CardMDProps> & {
    Header: typeof CardHeader;
    Footer: typeof CardFooter;
    Headline: typeof CardHeadline;
    Image: typeof CardImage;
    Subhead: typeof CardSubhead;
    SupportingText: typeof CardSupportingText;
    Media: typeof CardMedia;
    Chips: typeof CardChips;
    MidSection: typeof CardMidSection;
} = ({
    variant = "elevated",
    color,
    children,
    className,
    image,
    imagePosition = "top",
    link,
    autoFit = false,
    ...props
}) => {


        const [screenSmall, setScreenSmall] = useState<boolean>(window.innerWidth < 640);


        useEffect(() => {
            const handleResize = () => setScreenSmall(window.innerWidth < 640);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        const navigate = useNavigate();
        //// CARD CSS
        const cardClasses = `md3-card-${variant} 
        ${image ? `md3-card-with-image-${!autoFit ? imagePosition : screenSmall ? 'left' : 'top'}` : "md3-card"}
          ${className}`;

        //// IMAGE CARD 
        if (image) {

            const imageProps = (image as any).props || {};

            return (
                <div
                    data-md3-card className={`${cardClasses} `} {...props}>
                    <CardImage
                        onClick={imageProps.onClick ? imageProps.onClick : link ? () => navigate(link) : undefined}
                        src={imageProps.src}
                        alt={imageProps.alt}
                        position={imagePosition}
                        className={imageProps.className}
                    >
                        {imageProps.children}
                    </CardImage>
                    <div className={"md3-card-content"}>
                        {children}
                    </div>
                </div>
            );
        }

        //// REGULAR CARD
        return (
            <div className={cardClasses} data-md3-card {...props}>
                <div className="md3-card-content">
                    {children}
                </div>
            </div>
        );
    };

CardMD.Header = CardHeader;
CardMD.Footer = CardFooter;
CardMD.Headline = CardHeadline;
CardMD.Image = CardImage;
CardMD.Subhead = CardSubhead;
CardMD.SupportingText = CardSupportingText;
CardMD.Media = CardMedia;
CardMD.Chips = CardChips;
CardMD.MidSection = CardMidSection;


interface CardLargeProps extends Omit<CardMDProps, "imagePosition"> {
    image: ReactNode;
    sheetClassName?: string;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

// CardLarge: Composed like CardMD but with a large image and a content sheet, supports all CardMD subcomponents
export const CardLarge: React.FC<CardLargeProps> & {
    Header: typeof CardHeader;
    Footer: typeof CardFooter;
    Headline: typeof CardHeadline;
    Image: typeof CardImage;
    Subhead: typeof CardSubhead;
    SupportingText: typeof CardSupportingText;
    Media: typeof CardMedia;
    Chips: typeof CardChips;
    MidSection: typeof CardMidSection;
    expanded?: boolean;
    setExpanded?: (expanded: boolean) => void;
} = ({
    variant = "elevated",
    color,
    children,
    className,
    image,
    link,
    autoFit = false,
    sheetClassName,
    expanded,
    setExpanded,
    ...props
}) => {
        const [screenSmall, setScreenSmall] = useState<boolean>(window.innerWidth < 640);
        // const [expanded, setExpanded] = useState<boolean>(false);

        useEffect(() => {
            const handleResize = () => setScreenSmall(window.innerWidth < 640);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
            console.log('resize', screenSmall);
        }, []);


        // Extract image props if image is a React element
        const imageProps = (image as any)?.props || {};

        // Card classes
        const cardClasses = `md3-card-large  !min-h-fit md3-card-${variant} ${className || ""}`;

        return (
            <div className={`${cardClasses} !bg-transparent !border-none relative min-h-full flex flex-1 overflow-hidden`} data-md3-card
                {...props}>
                {/* Large Image */}
                <div className={`  absolute top-0 anim md3-card-large-image-container h-[50%] `}  >
                    <img
                        src={imageProps.src}
                        alt={imageProps.alt}
                        className={`md3-card-large-image ${imageProps.className || ""}`}
                    />
                    {imageProps.children && (
                        <div className="md3-card-large-image-children" >
                            {imageProps.children}
                        </div>
                    )}
                </div>

                {/* Pull handle and expandable content */}
                <div className={` 
                            ${!expanded ? " animSheetRev max-h-[60%] lg:max-h-[55%]  overflow-hidden " :
                        "  max-h-[calc(100%-4rem)]  !h-fit overflow-auto animSheet "}
                            md3-card-large-sheet  ${sheetClassName || ""}`}>
                    {/* Pull handle */}
                    <div className="md3-card-large-sheet-handle">
                        <button
                            className="md3-card-large-sheet-handle-button "
                            onDrag={() => { setExpanded(!expanded) }}
                            onDragEnd={() => { setExpanded(!expanded) }}
                            onClick={() => {
                                setExpanded(!expanded);
                            }}
                            tabIndex={0}
                            aria-label="Expand card content" />

                    </div>
                    {/* Expandable content */}
                    <div className={`md3-sheet-content `}  >
                        {children}
                    </div>
                </div>
                {!expanded && (
                    <div className="absolute bottom-0 px-4 w-full py-2 bg-gradient-to-t from-white to-white/10">
                        <Icon
                            bg fill clear
                            size='xl'
                            onClick={() => setExpanded(!expanded)}
                            icon='more_horiz' />
                    </div>)}
            </div>
        );
    };

// Attach CardMD subcomponents for composition
CardLarge.Header = CardHeader;
CardLarge.Footer = CardFooter;
CardLarge.Headline = CardHeadline;
CardLarge.Image = CardImage;
CardLarge.Subhead = CardSubhead;
CardLarge.SupportingText = CardSupportingText;
CardLarge.Media = CardMedia;
CardLarge.Chips = CardChips;
CardLarge.MidSection = CardMidSection;
/**
 * Example usage of CardMD and CardLarge components
 */

export const CardExample = () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Simple CardMD example */}
        <CardMD variant="outlined" style={{ width: 320 }}>
            <CardMD.Header>
                <CardMD.Headline>Card Headline</CardMD.Headline>
                <CardMD.Subhead>Subhead</CardMD.Subhead>
            </CardMD.Header>
            <CardMD.SupportingText>
                This is some supporting text for the card.
            </CardMD.SupportingText>
            <CardMD.Footer>
                <button>Action</button>
            </CardMD.Footer>
        </CardMD>

        {/* CardMD with image */}
        <CardMD
            variant="elevated"
            image={
                <CardMD.Image
                    src="https://placekitten.com/400/200"
                    alt="Kitten"
                />
            }
            style={{ width: 320 }}
        >
            <CardMD.Header>
                <CardMD.Headline>Card with Image</CardMD.Headline>
            </CardMD.Header>
            <CardMD.SupportingText>
                This card has an image at the top.
            </CardMD.SupportingText>
        </CardMD>


    </div>
);
