import { Workflow, Github } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="px-4">
        <div className=" bg-black">
          <div className="py-4 flex items-center justify-between">
            <div className="relative">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F7AABE,#B57CEC,#E472D1)] blur-md"></div>
              <Workflow className="h-10 w-10 inline-flex justify-center items-center rounded-lg" />
            </div>
            <div className="border border-white border-opacity-30 h-10 w-15 ml-2 inline-flex justify-center items-center rounded-lg sm:hidden">
              <img
                src="../../assets/icons/menu.svg"
                alt="Menu"
                className="text-white"
              />
            </div>
            <nav className="text-white gap-6 items-center hidden sm:flex">

            <a href="https://github.com/ChiragAgg5k/flow-forge" target="_blank" rel="noopener noreferrer">
                <button className="inline-flex items-center justify-center gap-2 border border-white text-white py-2 px-6 rounded-full font-medium shadow-lg hover:bg-gray-800 transition-all duration-300">
                  <Github className="h-5 w-5" />
                  Star Us on GitHub
                </button>
              </a>
            <a href="/sign-in">
 
            <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Get Started for free
            </button>
  
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
