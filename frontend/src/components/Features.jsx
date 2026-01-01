import { FeatureBox } from "./FeatureBox";
import { Briefcase } from "lucide-react";

export function Features() {
  return (
    <div id="features" className="bg-[#FAFBFF] dark:bg-[#0F0F0F] py-10">
      <div className="max-w-8xl mx-auto px-5 md:px-12 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <span className="text-3xl font-semibold">
            Everything you need to succeed
          </span>
          <span className="text-[#5E5E5E]">
            Stop using spreadsheets. Upgrade to a purpose-built tool designed
            for the modern job hunt.
          </span>
        </div>
        <div className="grid grid-cols-12 text-lg gap-y-8 gap-x-2 md:gap-x-8">
          <FeatureBox
            icon={Briefcase}
            heading="Application Tracking"
            text="Keep all your applications in one place. Filter by status, company, or date."
          />
          <FeatureBox
            icon={Briefcase}
            heading="Application Tracking"
            text="Keep all your applications in one place. Filter by status, company, or date."
          />
          <FeatureBox
            icon={Briefcase}
            heading="Application Tracking"
            text="Keep all your applications in one place. Filter by status, company, or date."
          />
        </div>
      </div>
    </div>
  );
}
