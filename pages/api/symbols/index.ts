import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAllCategories,
  getAllSymbols,
  addSymbol,
  deleteSymbol,
} from "../../../lib/db";
import { Symbol } from "@/types/types.d";
import { addSymbolToStore, deleteSymbolFromStore } from "@/lib/filehandler";
const finnhub = require("finnhub");
const finhubApiKey = process.env.FINHUB_API_KEY as string;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = finhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

const getCompanyProfile2 = async (symbol: string): Promise<any> => {
  return new Promise((res, rej) => {
    finnhubClient.companyProfile2({ symbol }, (error: any, data: any) => {
      if (error) {
        console.error("Finnhub API error:", error);
        rej(error);
      }
      res(data);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === "GET") {
    try {
      // Get symbol data and parse out all the symbols
      const symbols = await getAllSymbols();
      const symbolArray = symbols.map(
        (symbolData: Symbol) => symbolData.symbol
      );
      // fetch company profiles for all the symbols
      const companyProfiles = await Promise.all(
        symbolArray.map((symbol) => getCompanyProfile2(symbol))
      );
      // attach the company profiles to the symbols
      const enrichedSymbols = symbols.map((symbol, index) => ({
        ...symbol,
        profile: companyProfiles[index],
      }));

      // Get all the categories and attach the corresponding symbols to them
      const categoryData = await getAllCategories();
      const categories = categoryData.map((category) => {
        const categorySymbols = enrichedSymbols.filter(
          (symbol) => symbol.category_id === category.id
        );
        return { ...category, symbols: categorySymbols };
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching exchanges:", error);
      res.status(500).json({ error: "Database query failed" });
    }
  } else if (req.method === "POST") {
    const { symbol, companyName, sector, id } = req.body;

    try {
      await addSymbol(symbol, companyName, id, sector);
      // get categories to parse the name and id
      // Add symbol to SQLite DB

      // Prepare symbol data for JSON file storage
      const symbolData = {
        symbol,
        companyName,
        categoryId: id,
        sector,
      };

      // Add symbol to JSON file store
      await addSymbolToStore(symbolData);

      res.status(200).json({ message: "Symbol added successfully" });
    } catch (error) {
      console.error("Error fetching exchanges:", error);
      res.status(500).json({ error: "Failed to add Symbol " });
    }

    /**
     * 
     * 
     *  "category_id": 1,
      "symbol": "AAPL",
      "company_name": "Apple Inc.",
      "sector": "Technology"
        params needed to create a new symbol
       symbol TEXT NOT NULL UNIQUE, - from request
        company_name TEXT NOT NULL, - from request
        category_id INTEGER, match from the category name from request
        sector TEXT NOT NULL, from categories table or just pass the category name
     * 
      how will i validate that it is a legit symbol? 
      call the finhub api and make a request to see if it successfully returns a company profile

      this strategy is probably not the best way to do it. might just 
      allow the user to determine the category instead of a strict validation
     * 
     */
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    console.log("Delete ID:", id);

    try {
      await deleteSymbolFromStore(id);
      await deleteSymbol(id);
      res
        .status(200)
        .json({ success: `Successfully deleted symbol with id: ${id}` });
    } catch (error) {
      console.error("Error deleting symbol:", error);
      res.status(500).json({ error: "Failed to delete symbol" });
    }

    // const deletedFromStore = await deleteSymbolFromStore(id);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
