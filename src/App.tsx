import { useState, useEffect } from "react";
import { getItems, Item } from "./store";
import "./App.css";
import GroupedItems from "./components/GroupedItems";

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [itemsByType, setItemsByType] = useState(new Map<string, Item[]>());
  const [budget, setBudget] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Map<string, Item>());
  const [priceRange, setPriceRange] = useState({ low: 0, high: 0 });

  const onItemSelect = (item: Item) => {};

  useEffect(() => {
    (async () => {
      const items = await getItems();
      const hashList = new Map<string, boolean>();
      const filteredItems: Item[] = [];
      for (let item of items) {
        const hash = `${item.type}${item.name}${item.lowPrice}${item.highPrice}`;
        if (!hashList.has(hash)) {
          hashList.set(hash, true);
          filteredItems.push(item);
        }
      }
      setItems(filteredItems);
    })();
  }, []);

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

  useEffect(() => {
    const items = Array.from(selectedItems.values());
    const low = items.reduce(
      (total, item) => (item ? total + item.lowPrice : total),
      0
    );
    const high = items.reduce(
      (total, item) => (item ? total + item.highPrice : total),
      0
    );
    setPriceRange({ low, high });
  }, [selectedItems]);

  return (
    <div className="container mx-auto px-4">
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
      />
      <div className="flex flex-col gap-8">
        {Array.from(itemsByType.keys()).map((type, index) => {
          const items = itemsByType.get(type) || [];

          return (
            <GroupedItems
              type={type}
              items={items}
              selectedItem={selectedItems.get(type)}
            />
          );

          // return (
          //   <div key={type + index}>
          //     <h2>{type}</h2>
          //     {items?.map((item, index) => {
          //       const selected = selectedItems.get(type) === item;
          //       return (
          //         <div>
          //           <SingleItem
          //             item={item}
          //             selected={selected}
          //             onSelect={(item: Item) => {
          //               setSelectedItems(
          //                 new Map(selectedItems).set(type, selected ? null : item)
          //               );
          //             }}
          //           />
          //         </div>
          //       );
          //     })}
          //   </div>
          // );
        })}
      </div>
      <h3>
        Estimated Total: ${priceRange.low} - ${priceRange.high}
      </h3>
    </div>
  );
}

export default App;
