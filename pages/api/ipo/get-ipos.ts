import { format, subMonths } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
const finnhub = require("finnhub");
const finhubApiKey = process.env.FINHUB_API_KEY as string;

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = finhubApiKey;
const finnhubClient = new finnhub.DefaultApi();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const monthCount = req.body.monthCount || 1;
  const today = format(new Date(), "yyyy-MM-dd");
  const aMonthAgo = format(subMonths(today, monthCount), "yyyy-MM-dd");
}

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
