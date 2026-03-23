import GridBackgroundDemo from "@/components/grid-background-demo";
import { Features } from "./features";
import { HowItWorks } from "./howitworks";
import { Pricing } from "./pricing";
import { Footer } from "./footer";


export const Hero = () => {


    return (
        <div>
            <div className="h-[40rem] w-full h-screen bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
                <GridBackgroundDemo />
            </div>
            <div>
                <Features /></div>
            <div><HowItWorks /></div>
            <div>
                <Pricing />
            </div>

            <div><Footer /></div>



        </div>
    )
}