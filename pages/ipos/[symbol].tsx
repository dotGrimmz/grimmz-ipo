import IPOContext from "@/context/IpoContextImplementation";
import { IPOCalenderData } from "@/types/ipoData";
import { useContext } from "react";

export default function IpoPage({
  symbol,
}: {
  symbol: IPOCalenderData["symbol"];
}) {
  const { getIpo } = useContext<any>(IPOContext);
  const ipoData = getIpo(symbol);
  // console.log({ ipoData });
  /* Calculating the RSI (Relative Strength Index)
  1) I need the close prices over 14 days in a number array
  2) Calculate gains and loss values - calculate the daily gain- when the stock closes higher than the previous day and
   daily loss when it closes loser

*/
  return (
    <div>
      <div>This is the IPO page</div>
    </div>
  );
}

export const getServerSideProps = (ctx: {
  params: { symbol: IPOCalenderData["symbol"] };
}) => {
  return {
    props: {
      symbol: ctx.params.symbol,
    },
  };
};
