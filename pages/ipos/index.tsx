import { IpoPanel } from "@/components/IpoPanel";
import IPOContext, { IpoContext } from "@/context/IpoContextImplementation";
import { IPOCalenderData } from "@/types/ipoData";
import { GetServerSideProps } from "next";
import { useEffect, useContext } from "react";

export default function IPOS({
  data,
}: {
  data: Record<string, IPOCalenderData[]>;
}) {
  const ipoData = data.ipoCalendar;

  const { setIpos, navigateToIpo } = useContext<any>(IPOContext);

  useEffect(() => {
    if (data) {
      console.log({ data });
      setIpos(data.ipoCalendar);
    }
  }, []);

  return (
    <div className="flex overflow-auto gap-3">
      <div className="flex flex-wrap justify-center">
        {ipoData?.map((item: IPOCalenderData, index: number) => {
          return (
            <div
              key={index}
              className="flex m-3"
              onClick={() => navigateToIpo(item.symbol)}
            >
              <IpoPanel IpoData={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log({ ctx });
  const res = await fetch(`http://localhost:3000/api/symbols/get-symbols`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
