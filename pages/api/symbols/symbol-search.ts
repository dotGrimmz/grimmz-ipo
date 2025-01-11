import type { NextApiRequest, NextApiResponse } from "next";
const finnhub = require("finnhub");
const finhubApiKey = process.env.FINHUB_API_KEY as string;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = finhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.query;
  console.log({ query });

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Call Finnhub's symbol lookup endpoint
    finnhubClient.symbolSearch(query, (error: any, data: any) => {
      if (error) {
        return res.status(500).json({ error: "Error fetching symbols" });
      }
      return res.status(200).json(data.result);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
