import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-5 sm:mb-0 flex flex-col items-start">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between mb-4">
              <h1 className="text-3xl sm:text-5xl font-black bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-base sm:text-xl text-base-content/60">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group sm:px-8 sm:py-4 px-6 py-3 w-full lg:w-auto bg-linear-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90"
          >
            <div className=" flex items-center justify-center gap-3 text-white font-bold text-base sm:text-lg">
              <ZapIcon className="sm:w-6 sm:h-6 w-5 h-5" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;