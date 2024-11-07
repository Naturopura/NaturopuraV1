import Image from "next/image";
import React from "react";
import handsoil from "@/assets/handsoil.png";
import handsoil2 from "@/assets/handsoil2.png";
import handsoil3 from "@/assets/handsoil3.png";

const SoilConditioner = () => {
  return (
    <div>
      <div className="mt-[-50px] ml-[330px]">
        <div className="mx-auto px-6 lg:px-12 py-16 sm:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="rounded-xl p-4 flex flex-col items-center relative">
              {/* Rectangle Image - Positioned below */}
              {/* <Image
                width={200}
                height={200}
                src={rectangle}
                alt="Rectangle"
                className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
              /> */}

              {/* Handsoil Image - Positioned above */}
              <Image
                width={280}
                height={280}
                src={handsoil}
                alt="Handsoil"
                className="relative z-10 ml-10"
              />
            </div>

            {/* Card 2 */}
            <div className="rounded-xl p-4 flex flex-col items-center relative">
              {/* Rectangle Image - Positioned below */}
              {/* <Image
                width={200}
                height={200}
                src={rectangle}
                alt="Rectangle"
                className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
              /> */}

              {/* Handsoil Image - Positioned above */}
              <Image
                width={280}
                height={280}
                src={handsoil2}
                alt="Handsoil 2"
                className="relative z-10 ml-10"
              />
            </div>

            {/* Card 3 */}
            <div className="rounded-xl p-4 flex flex-col items-center relative">
              {/* Rectangle Image - Positioned below */}
              {/* <Image
                width={200}
                height={200}
                src={rectangle}
                alt="Rectangle"
                className="absolute left-[10px] bottom-0 w-52 h-52 object-cover"
              /> */}

              {/* Handsoil Image - Positioned above */}
              <Image
                width={280}
                height={280}
                src={handsoil3}
                alt="Handsoil 3"
                className="relative z-10 ml-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilConditioner;
