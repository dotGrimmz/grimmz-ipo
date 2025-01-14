import { Category } from "@/types/types.d";
import { createContext } from "react";

export type StockContext = {
  setActiveTab: (category: Category) => void;
  activeTab: Category;
  handleAddSymbol: (data: any, cb: () => void) => void;
  pendingPost: boolean;
  handleDeleteSymbol(id: any, cb: () => void): void;
};

const StockContext = createContext<StockContext | undefined>(undefined);

export default StockContext;
