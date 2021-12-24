import { Item } from "../store";
import SingleItem from "./SingleItem";

type Props = {
  type: string;
  items: Item[];
  onItemSelect: (item: Item) => void;
  selectedItem?: Item;
};

function GroupedItems({ type, items, onItemSelect, selectedItem }: Props) {
  return (
    <div key={type}>
      <h1 className="font-bold text-2xl mb-2">{type.replaceAll("_", " ")}:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item) => (
          <SingleItem
            item={item}
            selected={selectedItem === item}
            onSelect={onItemSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default GroupedItems;
