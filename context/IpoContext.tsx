import { useMemo, useState } from "react";
import IPOContext from "./IpoContextImplementation";
import { IPOCalenderData } from "@/types/ipoData";
import { useRouter } from "next/router";

export const IpoProvider = ({ children }: { children: any }) => {
  const [ipos, setIpos] = useState<IPOCalenderData[]>([]);
  const router = useRouter();

  const navigateToIpo = (symbol: IPOCalenderData["symbol"]) => {
    //this function needs to take the symbol and pass it to the dynamic route
    // since the ipos are here we can just pass down the required data from context

    /**
     * I need to get the exchanges that will be used to get the symbols needed
     * for the dashboard
     *
     */

    router.push(`/ipos/${symbol}`);
  };

  const getIpo = (
    symbol: IPOCalenderData["symbol"]
  ): IPOCalenderData | undefined => {
    return ipos.find((ipo: IPOCalenderData) => ipo.symbol === symbol);
  };
  const getExchanges = () => {
    return [""];
  };

  const getStockCandles = (symbol: any) => {};
  const data = useMemo(() => {
    return {
      ipos,
      setIpos,
      navigateToIpo,
      getIpo,
      getExchanges,
    };
  }, [ipos?.length, setIpos, navigateToIpo, getIpo]);

  return <IPOContext.Provider value={data}>{children}</IPOContext.Provider>;
};
