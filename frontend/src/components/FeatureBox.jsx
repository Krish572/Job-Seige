export function FeatureBox({ icon: Icon, heading, text }) {
  return (
    <div className="transition-all duration-500 ease-in-out col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-5 bg-[#F0F3FF] dark:bg-[#16171A] p-8 rounded-md shadow-xl hover:-translate-y-2">
      <Icon className="w-8 h-8" />
      <span className="text-xl font-bold">{heading}</span>
      <span className="text-[#5E5E5E] text-base w-full">{text}</span>
    </div>
  );
}
