import React from "react";
import { useSymbolSearch } from "@/hooks/useSymbolSearch";
import { Category, PostSymbolData } from "@/types/types.d";

type SymbolSearchProps = {
  category: Category;
  addSymbol: (data: PostSymbolData, closeModal: () => void) => void;
  id: number | null;
  pendingPost: boolean;
  closeModal: () => void;
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
  closeModal,
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
              <li
                key={symbolData.symbol}
                onClick={() => {
                  addSymbol(postData, closeModal);
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
