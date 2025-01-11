type status = "expected" | "priced" | "withdrawn" | "filed";
export type IPOCalenderData = {
  symbol: string;
  date: string;
  name: string;
  numberOfShares: number;
  totalSharesValue: number;
  status: status;
  price: string;
};

export type IPOStockCandleData = any;
