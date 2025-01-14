export const CATEGORIES = [
  "Technology",
  "Healthcare",
  "Energy",
  "Financials",
  "Materials",
] as const;

// Type derived from the CATEGORIES array
export type Category = (typeof CATEGORIES)[number];

export type Categories = {
  id: number;
  category_name: Category;
};
export type Symbol = {
  id: number;
  symbol: string;
  company_name: string;
  category_id: number;
  sector: string;
};

export type CompanyProfile = {
  country: string;
  currency: string;
  exchange: string;
  name: string;
  ticker: string;
  ipo: string;
  marketCapitalization: number;
  shareOutstanding: number;
  logo: string;
  phone: string;
  weburl: string;
  finnhubIndustry: string;
};

// because I am sending the categories array in as props (an object)
// ill have to redetermine the type required for this component
export type CategoriesProps = Categories & {
  symbols: Symbol[] & {
    profile: CompanyProfile;
  };
};

export type CategoryPageProps = {
  _categories: CategoriesProps[];
};

export type PostSymbolData = {
  symbol: string;
  companyName: string;
  sector: Category;
  id: number;
};
