import { Item } from "../store";
import SingleItem from "./SingleItem";

type Props = {
  type: string;
  items: Item[];
  selectedItem?: Item;
  onItemSelect?: (selected: Item, item: Item) => void;
};

function GroupedItems({ type, items, selectedItem }: Props) {
  return (
    <div key={type}>
      <h1 className="font-bold text-2xl mb-2">{type.replaceAll("_", " ")}:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items?.map((item, index) => (
          <SingleItem
            item={item}
            selected={selectedItem === item}
            onSelect={(item: Item) => {
              // setSelectedItems(
              //   new Map(selectedItems).set(type, selected ? null : item)
              // );
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GroupedItems;
