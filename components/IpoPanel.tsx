import { IPOCalenderData } from "@/types/ipoData";
import { format } from "date-fns";

export const IpoPanel = ({ IpoData }: { IpoData: IPOCalenderData }) => {
  const {
    name,
    numberOfShares,
    status,
    symbol,
    price,
    date,
    totalSharesValue,
  } = IpoData;
  return (
    <div className="flex flex-col gap-3 bg-accent cursor-pointer w-[270px] text-black transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 rounded-md p-2">
      <div>{`Name: ${name}`}</div>
      <div>{`Date: ${format(new Date(date), "MM-dd-yyyy")}`}</div>
      <div>{`Symbol: ${symbol}`}</div>
      <div>{`Price: ${price}`}</div>
      <div>{`Number of Shares: ${numberOfShares}`}</div>
      <div>{`Status: ${status}`}</div>
      <div>{`Total Shares Value: ${totalSharesValue}`}</div>
    </div>
  );
};
