import { IPOCalenderData } from "@/types/ipoData";
import { createContext } from "react";

export type IpoContext = {
  ipos: IPOCalenderData[];
  setIpos: (ipos: IPOCalenderData[]) => void;
  navigateToIpo: (symbol: IPOCalenderData["symbol"]) => void;
  getIpo: (symbol: IPOCalenderData["symbol"]) => IPOCalenderData | undefined;
  getExchanges: () => string[];
};

const IPOContext = createContext<IpoContext | undefined>(undefined);

export default IPOContext;
