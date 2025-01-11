import IPOContext from "@/context/IpoContextImplementation";
import IpoLogo from "@/public/Ipologo2.png";
import Image from "next/image";
import { useContext } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const {} = useContext<any>(IPOContext);
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen max-h-screen bg-primary">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-primary to-accent block">
          <Image alt="company-logo" src={IpoLogo} height={200} width={200} />
        </div>
      </div>
      {children}
    </div>
  );
};
