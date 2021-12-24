import { Item } from "../store";

type Props = {
  item: Item;
  onSelect: (item: Item) => void;
  selected: boolean;
};

function displayCurrency(price: number): string {
  price /= 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function SingleItem({ item, onSelect, selected }: Props) {
  return (
    <div
      className={`p-8 text-center border-2 rounded-lg box-shadow ${
        selected ? "border-sky-500" : "border-slate-200"
      }`}
      onClick={() => {
        onSelect(item);
      }}
    >
      <h1 className="text-2xl font-bold">{item.name}</h1>
      <p className="pt-2">
        {displayCurrency(item.lowPrice)} - {displayCurrency(item.highPrice)}
      </p>
    </div>
  );
}

export default SingleItem;
