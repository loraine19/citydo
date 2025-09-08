import { HTMLAttributes, ReactNode, useRef } from "react";
import { Button } from "./Buttons";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ children, className, ...props }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className={`md3-carousel ${className || ''}`} ref={carouselRef} data-md3 {...props}>
                {children}
            </div>
            <div className="md3-carousel-nav">
                <Button onClick={scrollLeft} variant="outlined">Précédent</Button>
                <Button onClick={scrollRight} variant="outlined" style={{ marginLeft: '1rem' }}>Suivant</Button>
            </div>
        </div>
    );
};