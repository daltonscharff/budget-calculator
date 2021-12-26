import { useEffect, useState } from "react";
import { Item } from "../store/firebase";
import displayCurrency from "../utils/displayCurrency";
import GroupedItems from "../components/GroupedItems";
import StickyFooterLayout from "../components/StickyFooterLayout";

type Props = {
  items: Item[];
  selectedItems: Map<string, Item>;
  setSelectedItems: React.Dispatch<React.SetStateAction<Map<string, Item>>>;
  priceRange: { low: number; high: number };
};

function ItemPage({
  items,
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
    <div className="flex p-4 border-t-2">
      <div className="grow">
        <span className="uppercase font-extrabold">Estimated Cost:&nbsp;</span>
        <span>
          {priceRange.low === priceRange.high
            ? `${displayCurrency(priceRange.low)}`
            : `${displayCurrency(priceRange.low)} - ${displayCurrency(
                priceRange.high
              )}`}
        </span>
      </div>
      <div></div>
    </div>
  );
  return (
    <StickyFooterLayout footer={footer}>
      <div className="container mx-auto p-4 flex flex-col gap-8">
        <div className="text-3xl text-center font-extrabold uppercase">
          Select items for your design
        </div>
        {Array.from(itemsByType.keys())
          .sort()
          .map((type, index) => {
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
