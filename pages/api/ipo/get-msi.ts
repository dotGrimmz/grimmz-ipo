import { NextApiRequest, NextApiResponse } from "next";
const finnhub = require("finnhub");
const finhubApiKey = process.env.FINHUB_API_KEY as string;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = finhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

/*
get MSI endpoint
1) fetch basic financials for the 52 week ratio data
2) fetch quote api for current price
3) calculate the msi and return 
MSI= 
52-Week High−52-Week Low / 
Current Price−52-Week Low
​

*/

const calculateMSI = (
  currentPrice: string,
  high52: string,
  low52: string,
  avg10: string,
  beta: string
): number => {
  const normalizedPrice =
    (parseFloat(currentPrice) - parseFloat(low52)) /
    (parseFloat(high52) - parseFloat(low52));

  const volumeFactor = parseFloat(avg10);
  const volatilityAdjustment = parseFloat(beta);
  return normalizedPrice;
  // Adjust MSI with volume and beta
  return normalizedPrice * volumeFactor * volatilityAdjustment;
};
const fetchBasicFinancials = (symbol: string): Promise<any> =>
  new Promise((resolve, reject) => {
    finnhubClient.companyBasicFinancials(
      symbol,
      "52WeekHigh,52WeekLow,10DayAverageTradingVolume,beta",
      (error: any, data: any) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      }
    );
  });

const fetchQuote = (symbol: string): Promise<any> =>
  new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error: any, data: any) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const symbol = req.body.symbol;

  try {
    const symbol = req.body.symbol || "GTSG";

    // Fetch both data sets concurrently
    const [basicFinancials, quote] = await Promise.all([
      fetchBasicFinancials(symbol),
      fetchQuote(symbol),
    ]);

    const requiredData = {
      "52WeekHigh": basicFinancials.metric["52WeekHigh"],
      "52WeekLow": basicFinancials.metric["52WeekLow"],
      "10DayAverageTradingVolume":
        basicFinancials.metric["10DayAverageTradingVolume"],
      beta: basicFinancials.metric["beta"],
      currentPrice: quote["c"],
    };

    const msiData = calculateMSI(
      requiredData.currentPrice,
      requiredData["52WeekHigh"],
      requiredData["52WeekLow"],
      requiredData["10DayAverageTradingVolume"],
      requiredData.currentPrice
    );
    // Return the results
    return res.status(200).send({ msiData, requiredData });
  } catch (error) {
    console.error("Finnhub API error:", error);
    return res.status(500).send({ error: `Finnhub API error: ${error}` });
  }
}
