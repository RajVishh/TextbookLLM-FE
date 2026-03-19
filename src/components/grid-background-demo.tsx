import { cn } from "@/lib/utils";
import { HeroButton } from "@/app_components/herobutton";
import { useNavigate } from "react-router-dom";

export default function GridBackgroundDemo() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  }
  return (
    <div className="relative flex flex-col h-[50rem] w-full items-center justify-center bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Textbook<span className="text-[#D97857]">LLM</span>
      </p>
      <p className="text-white opacity-50">Turn your notes into intelligence.</p>

      <HeroButton onClick={handleLogin} />
    </div>
  );
}
