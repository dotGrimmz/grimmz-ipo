import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export const useSymbolSearch = () => {
  const [query, setQuery] = useState("");
  const [symbols, setSymbols] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchSymbols = async () => {
      if (!debouncedQuery) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/symbols/symbol-search?query=${debouncedQuery}`
        );
        if (!response.ok) throw new Error("Error fetching symbols");
        const data = await response.json();
        // I want to filter out the data where the symbolData.symbol includes "."

        const symbolDataArr = data.filter(
          (symbolData: any) => !symbolData.symbol.includes(".")
        );
        setSymbols(symbolDataArr);
      } catch (error) {
        console.error("Error fetching symbols:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSymbols();
  }, [debouncedQuery]);

  return { query, setQuery, symbols, isLoading };
};
