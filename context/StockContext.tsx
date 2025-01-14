import { useMemo, useState } from "react";
import StockContext from "./StockContextImplementation";
import { Category } from "@/types/types.d";
import { useToast } from "./ToastContext";
export const StockProvider = ({ children }: { children: any }) => {
  const [activeTab, setActiveTab] = useState<Category>("Technology");
  const [pendingPost, setPendingPost] = useState<boolean>(false);
  const { showToast } = useToast(); // Access the showToast function from the context

  const handleDeleteSymbol = async (id: any, cb: () => void) => {
    setPendingPost(true);
    console.log({ id }, "inside context");
    try {
      const response = await fetch(`/api/symbols?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        showToast(`Failed to delete symbol`, "error", 2000);
        throw new Error("Failed to delete symbol");
      }

      const result = await response.json();
      showToast(result.message, "success", 2000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPendingPost(false);
      cb();
    }
  };

  const handleAddSymbol = async (symbolData: any, cb: () => void) => {
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
        showToast(
          `Failed to add ${symbolData.symbol} to ${activeTab}`,
          "error",
          2000
        );

        throw new Error("Failed to add symbol");
      }

      const result = await response.json();
      showToast(result.message, "success", 2000);
      console.log({ result });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPendingPost(false);
      cb();
    }
  };
  const data = useMemo(() => {
    return {
      setActiveTab,
      activeTab,
      handleAddSymbol,
      pendingPost,
      handleDeleteSymbol,
    };
  }, [activeTab, setActiveTab]);

  return <StockContext.Provider value={data}>{children}</StockContext.Provider>;
};
