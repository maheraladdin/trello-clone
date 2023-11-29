// Third Party Dependencies
import {Medal} from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import {Poppins} from "next/font/google";

// Alias Dependencies
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

// Local Dependencies



const headerFont = localFont({
   src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  return (
    <section className={"flex flex-col items-center justify-center"}>
      <div className={cn(
          "flex flex-col items-center justify-center",
          headerFont.className,
      )}>
          {/* Medal Padge */}
          <div className={"mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase"}>
              <Medal className={"h-6 w-6 mr-2"}/>
              <span className={"tracking-widest"}>No 1 task management</span>
          </div>
          {/* Title */}
          <h1 className={"text-3xl md:text-6xl font-bold text-center text-neutral-800 mb-6"}>
              Taskify helps team move
          </h1>
          {/* Subtitle */}
          <div className={"text-3xl md:text-6xl font-bold text-center text-white bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 pb-4 pt-2 rounded-md"}>
            work forward.
          </div>
      </div>
      <p className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
            textFont.className,
      )}>
          Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique — accomplish it all with Taskify.
      </p>
      <Button className={"mt-8"} size={"lg"} asChild>
        <Link href={"/sign-up"}>
          Get Taskify for free
        </Link>
      </Button>
    </section>
  );
}