import { useMemo, useState } from "react";
import StockContext from "./StockContextImplementation";
import { Category } from "@/types/types.d";
export const StockProvider = ({ children }: { children: any }) => {
  const [activeTab, setActiveTab] = useState<Category>("Technology");
  const [pendingPost, setPendingPost] = useState<boolean>(false);
  const handleAddSymbol = async (symbolData: any) => {
    console.log({ symbolData });
    setPendingPost(true);
    try {
      const response = await fetch("/api/symbols", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(symbolData),
      });

      if (!response.ok) {
        throw new Error("Failed to add symbol");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPendingPost(false);
    }
  };
  const data = useMemo(() => {
    return {
      setActiveTab,
      activeTab,
      handleAddSymbol,
      pendingPost,
    };
  }, [activeTab, setActiveTab]);

  return <StockContext.Provider value={data}>{children}</StockContext.Provider>;
};
