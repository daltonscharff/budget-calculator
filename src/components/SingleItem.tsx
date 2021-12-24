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
      onClick={() => {
        onSelect(item);
      }}
    >
      <h1>{item.name}</h1>
      <p>selected: {selected.toString()}</p>
      <p>
        {displayCurrency(item.lowPrice)} - {displayCurrency(item.highPrice)}
      </p>
    </div>
  );
}

export default SingleItem;
