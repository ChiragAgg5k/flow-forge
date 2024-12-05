"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "../auth-provider";
import { Spotlight } from "@/components/landing-page/Spotlight";

export const Hero = () => {
  const user = useUser();

  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#1A0738_34%)] py-[85px] sm:py-40 relative overflow-clip">
      <div className="relative">
        {/* Adjust the Spotlight positioning */}
        <Spotlight
          className="-top-60 left-0 md:left-60 md:-top-40" 
          fill="white"
        />

        <div className="flex justify-center mt-8">
          <motion.h1
            className="text-8xl sm:text-8xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-t from-gray-400 to-white"
            style={{
              lineHeight: '1.2',
              paddingBottom: '0.1em',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
          >
            Flow Forge
          </motion.h1>
        </div>

        {/* Subtitle with gradient text */}
        <div className="flex justify-center">
          <motion.p
            className="text-xl text-center mt-6 max-w-md text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Streamline your GitHub workflow with FlowForge, automating{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              issue management
            </span>{" "}
            and{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              PR reviews
            </span>{" "}
            from one powerful dashboard.
          </motion.p>
        </div>

        {/* Call to Action */}
        <div className="flex justify-center mt-8">
          {user.current ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={"/dashboard"}>
                <button className="bg-white text-black py-4 px-8 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-gray-200 transition-all duration-300">
                  Go to Dashboard
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={"/sign-in"}>
              <button className="bg-gradient-to-r from-[#6B2FA1] to-[#D6A0E4] text-white py-4 px-12 font-medium shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out rounded-full hover:bg-[#8c3d9f] hover:shadow-[#6B2FA1] hover:shadow-2xl">
  Get Started!
</button>




              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
