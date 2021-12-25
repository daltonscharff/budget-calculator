import { useEffect, useState } from "react";
import { Item } from "../store/firebase";
import displayCurrency from "../utils/displayCurrency";
import GroupedItems from "./GroupedItems";
import StickyFooterLayout from "./StickyFooterLayout";

type Props = {
  items: Item[];
  budget: string;
  selectedItems: Map<string, Item>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Map<string, Item>>>;
  priceRange: { low: number; high: number };
};

function ItemPage({
  items,
  budget,
  priceRange,
  selectedItems,
  setSelectedItems,
}: Props) {
  const [itemsByType, setItemsByType] = useState(new Map<string, Item[]>());

  const handleItemSelect = (item: Item) => {
    const isSelected = selectedItems.get(item.type) === item;
    const selected = new Map(selectedItems);
    if (isSelected) {
      selected.delete(item.type);
    } else {
      selected.set(item.type, item);
    }
    setSelectedItems(selected);
  };

  useEffect(() => {
    const itemsByType = new Map<string, Item[]>();
    for (let item of items) {
      let itemsArray = itemsByType.get(item.type);
      if (itemsArray === undefined) {
        itemsByType.set(item.type, [item]);
      } else {
        itemsByType.set(item.type, [...itemsArray, item]);
      }
    }
    setItemsByType(itemsByType);
    setSelectedItems(new Map<string, Item>());
  }, [items]);

  const footer = (
    <div className="p-4 border-t-2">
      Estimated Cost:&nbsp;
      {priceRange.low === priceRange.high
        ? `${displayCurrency(priceRange.low)}`
        : `${displayCurrency(priceRange.low)} - ${displayCurrency(
            priceRange.high
          )}`}
    </div>
  );
  return (
    <StickyFooterLayout footer={footer}>
      <div className="container mx-auto px-4 flex flex-col gap-8">
        {Array.from(itemsByType.keys()).map((type, index) => {
          const items = itemsByType.get(type) || [];

          return (
            <GroupedItems
              type={type}
              items={items}
              selectedItem={selectedItems.get(type)}
              onItemSelect={handleItemSelect}
            />
          );
        })}
      </div>
    </StickyFooterLayout>
  );
}

export default ItemPage;
