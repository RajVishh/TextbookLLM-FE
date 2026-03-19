
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function HeroButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="m-10 flex justify-center text-center">
            <HoverBorderGradient
                onClick={onClick}
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
            >
                <span>Try now</span>
            </HoverBorderGradient>
        </div>
    );
}
