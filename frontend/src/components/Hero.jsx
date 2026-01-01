import heroimg from "../assets/heroimg.jpg"

export function Hero(){
    return (
        <div className="px-5 py-8 md:px-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex flex-col gap-5 md:gap-10 flex-1">
                <span className="text-4xl sm:text-7xl text-center md:text-start font-bold">Structure your path to <span className="text-[#2681D1]"> professional success</span></span>
                <span className="text-[#5E5E5E] text-lg text-center md:text-start">Track applications, manage interviews, and see your success ratio with AI-driven insights that help you land roles faster</span>
                <button class="mx-auto md:mx-0 w-fit px-6 py-3 bg-[#2681D1] text-white cursor-pointer rounded">
                    Start Tracking
                </button>
            </div>
            <div className="flex-1 flex justify-center">
                <img
                    src={heroimg}
                    alt="Hero"
                    className="
                        max-w-[300px]
                        md:max-w-[400px]
                        lg:max-w-[500px]
                        h-auto
                        rounded-lg
                        w-auto
                        object-contain
                    "
                />
            </div>
        </div>
    )
}