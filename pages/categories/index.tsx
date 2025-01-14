import {
  CategoriesProps,
  Category,
  CATEGORIES,
  CompanyProfile,
  CategoryPageProps,
} from "@/types/types.d";
import { useContext, useState } from "react";
import Image from "next/image";
import StockContext from "@/context/StockContextImplementation";
import { StockPanel } from "@/components/StockPanel";
import { useModal } from "@/hooks/useModal";
import { ModalComponent } from "@/components/ModalComponent";
import { SymbolSearch } from "@/components/SymbolSearch";

const loadCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/symbols`
  );
  const _categories = await res.json();
  return _categories;
};

export async function getServerSideProps() {
  try {
    const categories = await loadCategories();

    return {
      props: {
        _categories: categories,
      },
    };
  } catch (err) {
    console.error("Error fetching categories:", err);
    return {
      props: {
        _categories: [],
      },
    };
  }
}

export default function Categories({ _categories }: CategoryPageProps) {
  const title = "S&P 500";
  const {
    activeTab,
    setActiveTab,
    handleAddSymbol,
    pendingPost,
    handleDeleteSymbol,
  } = useContext<any>(StockContext);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [categories, setCategories] = useState<any>(_categories);
  console.log({ _categories, categories });

  //ts-ignore
  const activeTabCompanyProfiles = categories
    ?.filter((category: any) => category.category_name === activeTab)
    ?.map((category: any) =>
      category.symbols.map((symbol: any) => {
        const { profile } = symbol;
        return {
          id: symbol.id,
          ...profile,
        };
      })
    );

  //ts-ignore
  const category = categories?.find(
    (category: any) => category.category_name === activeTab
  );
  const categoryId = category ? category.id : null;

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
          const firstLetter = profile.name.charAt(0);
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
                {profile.logo ? (
                  <div className="avatar placeholder">
                    <Image
                      className="rounded-full ring ring-offset-2"
                      width={100}
                      height={100}
                      src={profile.logo || "/no-image.png"}
                      alt={profile.ticker}
                    />
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full ring ring-offset-2">
                      <span className="text-3xl">{firstLetter}</span>
                    </div>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <div className="btn btn-secondary">Insights</div>
                <div
                  className="btn btn-error"
                  onClick={() =>
                    handleDeleteSymbol(profile.id, async () => {
                      console.log("Deleting complete");
                      await loadCategories();
                      console.log("loading completed");
                    })
                  }
                >
                  Delete
                </div>
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
        {activeTabCompanyProfiles.map((profile: any) => {
          return (
            <div key={profile.id}>
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
              id={categoryId}
              pendingPost={pendingPost}
              closeModal={closeModal}
            />
          }
        />
      </div>
    </div>
  );
}
