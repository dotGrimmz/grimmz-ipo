import React from "react";
import { useSymbolSearch } from "@/hooks/useSymbolSearch";
import { Category, PostSymbolData } from "@/types/types.d";

type SymbolSearchProps = {
  category: Category;
  addSymbol: (data: PostSymbolData) => void;
  id: number | null;
  pendingPost: boolean;
};

type SymbolSearchData = {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
};

export const SymbolSearch = ({
  category,
  addSymbol,
  id,
  pendingPost,
}: SymbolSearchProps) => {
  const { query, setQuery, symbols, isLoading } = useSymbolSearch();

  return (
    <div className="p-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex: AAPL"
        className="p-2 border rounded"
      />
      {isLoading && <p>Loading...</p>}
      {pendingPost ? (
        <>{`Adding Symbol to ${category}}`}</>
      ) : (
        <ul className="mt-4">
          {symbols.map((symbolData: SymbolSearchData) => {
            const postData = {
              symbol: symbolData.symbol,
              companyName: symbolData.description,
              sector: category,
              id,
            } as PostSymbolData;
            return (
              // I need to put together the symbolData object to pass to the addSymbol function,,,

              <li
                key={symbolData.symbol}
                onClick={() => {
                  addSymbol(postData);
                }}
                className="p-2 border-b cursor-pointer mt-2 mb-2 hover:bg-gray-100"
              >
                {symbolData.symbol} - {symbolData.description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
