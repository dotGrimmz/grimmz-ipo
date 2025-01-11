// export interface IPOEvent {
//   date: string;
//   exchange: string;
//   name: string;
//   numberOfShares: number;
//   price: string;
//   status: string;
//   symbol: string;
//   totalSharesValue: number;
// }

// export interface IPOCalendar {
//   data: IPOEvent[];
//   error?: string; // Assuming there might be an error field in the response
// }
// declare module "finnhub" {
//   interface FinnhubClient {
//     someMethod(arg1: string): void;
//     anotherMethod(): number;
//   }

//   const Finnhub: {
//     Client: (apiKey: string) => FinnhubClient;
//   };

//   export = Finnhub;
// }

declare module "finnhub" {
  const content: any;
  export = content;
}
