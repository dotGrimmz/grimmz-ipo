import { Category } from "@/types/types.d";
import { createContext } from "react";

export type StockContext = {
  setActiveTab: (category: Category) => void;
  activeTab: Category;
  handleAddSymbol: (data: any) => void;
  pendingPost: boolean;
};

const StockContext = createContext<StockContext | undefined>(undefined);

export default StockContext;
