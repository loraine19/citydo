import { ReactNode, HTMLAttributes, Children } from "react";
import { useNavigate } from "react-router";

type CardVariant = "elevated" | "filled" | "outlined" | "tonal";
type ImagePosition = "top" | "left";

interface CardMDProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    color?: string;
    children: ReactNode;
    image?: ReactNode;
    imagePosition?: ImagePosition;
    link?: string;

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
}> = ({ src, alt, position = "top", className, children, onClick }) => (
    <div className={`md3-card-image-container-${position} ${className} ${onClick ? "cursor-pointer" : ""} flex-1 `}
        onClick={() => onClick && onClick()}>
        <img

            onError={(e: any) => { e.currentTarget.src = 'public/image/placeholder.jpg' }}
            className={`md3-card-image-${position} `}
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

//// CARD FOOTER
export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`md3-card-footer ${className}`}>{children}</div>
);


//// MAIN CARD COMPONENT
export const CardMD: React.FC<CardMDProps> & {
    Header: typeof CardHeader;
    Footer: typeof CardFooter;
    Headline: typeof CardHeadline;
    Image: typeof CardImage;
    Subhead: typeof CardSubhead;
    SupportingText: typeof CardSupportingText;
} = ({
    variant = "elevated",
    color,
    children,
    className,
    image,
    imagePosition = "top",
    link,
    ...props
}) => {
        const findElement = (type: string) => Children.toArray(children).find((child: any) => (child as any).type.name === type);
        const navigate = useNavigate()
        console.log(Children.toArray(children).map((child: any) => (child as any).type.name));
        //// CARD CSS
        const cardClasses = `${image ? "md3-card-with-image" : "md3-card"} md3-card-${variant} ${className ?? ""}`;

        //// IMAGE CARD 
        if (image) {

            const imageProps = (image as any).props || {};

            return (
                <div

                    className={`${cardClasses} ${imagePosition === "left" ? "!flex-row" : ""} `}
                    data-md3-card
                    {...props}
                >
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
                        {findElement("CardHeadline")}
                        {findElement("CardSubhead")}
                        {findElement("CardSupportingText")}

                    </div>

                    {findElement("CardFooter")}
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

