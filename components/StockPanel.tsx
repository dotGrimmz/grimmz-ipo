import { Category } from "@/types/types.d";

export const StockPanel = ({
  activeTab,
  onClick,
}: {
  activeTab: Category;
  onClick: () => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        outline: "1px solid green",
        minHeight: "40px",
        marginLeft: "1rem",
        marginRight: "1rem",
        padding: "1rem",
        justifyContent: "flex-end",
        gap: "1rem",
      }}
    >
      <div
        onClick={onClick}
        className="btn btn-secondary"
      >{`Add Stock to ${activeTab} Category`}</div>
    </div>
  );
};
