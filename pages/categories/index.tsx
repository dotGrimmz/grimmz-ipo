import {
  CategoriesProps,
  Category,
  CATEGORIES,
  CompanyProfile,
  CategoryPageProps,
} from "@/types/types.d";
import { useContext } from "react";
import Image from "next/image";
import StockContext from "@/context/StockContextImplementation";
import { StockPanel } from "@/components/StockPanel";
import { useModal } from "@/hooks/useModal";
import { ModalComponent } from "@/components/ModalComponent";
import { SymbolSearch } from "@/components/SymbolSearch";

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/symbols`
    );
    const categories = await res.json();

    return {
      props: {
        categories,
      },
    };
  } catch (err) {
    console.error("Error fetching categories:", err);
    return {
      props: {
        categories: [],
      },
    };
  }
}

export default function Categories({ categories }: CategoryPageProps) {
  const title = "S&P 500";
  const { activeTab, setActiveTab, handleAddSymbol, pendingPost } =
    useContext<any>(StockContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log({ categories });
  const activeTabCompanyProfiles = categories
    ?.filter((category) => category.category_name === activeTab)
    ?.map((category) => category.symbols.map((symbol: any) => symbol.profile));
  console.log({ categories });

  const category = categories?.find(
    (category: any) => category.category_name === activeTab
  );
  const id = category ? category.id : null;

  console.log({ id });
  const tabBtn = (category: Category) => {
    return (
      <div
        key={category}
        onClick={() => setActiveTab(category)}
        style={{
          border: "2px solid black",
          cursor: "pointer",
          padding: "2px",
          borderRadius: "5px",
          borderColor: activeTab === category ? "blue" : "black",
        }}
      >
        {category}
      </div>
    );
  };

  const StockCards = ({ companyProfile }: any) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {companyProfile.map((profile: any, index: number) => {
          return (
            <div
              key={index}
              style={{
                padding: "1rem",
                margin: "1rem",
                borderRadius: "5px",
                width: "400px",
                height: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
                border: "1px solid black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  justifyContent: "space-between",
                }}
              >
                <div>{`SYMBOL: ${profile.ticker}`}</div>
                <div>{`Market Cap: ${profile.marketCapitalization}`}</div>
              </div>
              <div>{`Shares Outstanding: ${profile.shareOutstanding}`}</div>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={profile.logo}
                  alt={profile.ticker}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <div className="btn btn-secondary">Insights</div>
                <div className="btn btn-error">Delete</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div
      style={{
        outline: "1px solid black",
        display: "inline-block",
        overflow: "hidden",
      }}
      className="flex"
    >
      <div
        style={{
          justifySelf: "center",
          paddingTop: "1rem",
        }}
        className="text-5xl font-bold "
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          outline: "1px solid red",
          minHeight: "40px",
          marginLeft: "1rem",
          marginRight: "1rem",
          padding: "1rem",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {CATEGORIES.map((category) => tabBtn(category))}
      </div>
      <StockPanel onClick={openModal} activeTab={activeTab} />

      <div
        style={{
          display: "flex",
          outline: "1px solid red",
          marginLeft: "1rem",
          marginRight: "1rem",
          height: "min-content",
          overflow: "auto",
        }}
      >
        {activeTabCompanyProfiles.map((profile: any, index: number) => {
          return (
            <div key={index}>
              <StockCards companyProfile={profile} />
            </div>
          );
        })}
        <ModalComponent
          title="Enter Stock Symbol"
          isOpen={isModalOpen}
          closeModal={closeModal}
          content={
            <SymbolSearch
              addSymbol={handleAddSymbol}
              category={activeTab}
              id={id}
              pendingPost={pendingPost}
            />
          }
        />
      </div>
    </div>
  );
}
