import { Item } from "../store/firebase";
import displayCurrency from "../utils/displayCurrency";

type Props = {
  item: Item;
  onSelect: (item: Item) => void;
  selected: boolean;
};

function SingleItem({ item, onSelect, selected }: Props) {
  return (
    <div
      className={`p-8 text-center border-2 rounded-lg cursor-pointer ${
        selected
          ? "bg-blue-50 border-blue-50"
          : " border-gray-100 hover:bg-gray-100"
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
