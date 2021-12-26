import { Item } from "../store/firebase";
import SingleItem from "./SingleItem";

type Props = {
  type: string;
  items: Item[];
  onItemSelect: (item: Item) => void;
  selectedItem?: Item;
};

function itemSort(type: string, a: Item, b: Item): number {
  if (type === "LIGHTING") {
    const aNum = parseInt(a.name.split(/-|\+/)[0]);
    const bNum = parseInt(b.name.split(/-|\+/)[0]);
    return aNum - bNum;
  }
  return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
}

function GroupedItems({ type, items, onItemSelect, selectedItem }: Props) {
  items.sort((a, b) => itemSort(type, a, b));
  return (
    <div key={type}>
      <h1 className="font-light text-2xl mb-2 text-center">
        {type.replaceAll("_", " ")}
      </h1>
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
