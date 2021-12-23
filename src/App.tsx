import { useState, useEffect } from "react";
import { getItems, Item } from "./store";
import "./App.css";

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [itemsByType, setItemsByType] = useState(new Map<string, Item[]>());
  const [budget, setBudget] = useState(0);
  const [selectedItems, setSelectedItems] = useState(
    new Map<string, Item | null>()
  );
  const [priceRange, setPriceRange] = useState({ low: 0, high: 0 });

  useEffect(() => {
    (async () => {
      const items = await getItems();
      setItems(items);
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
    <div className="App">
      {Array.from(itemsByType.keys()).map((type, index) => {
        const items = itemsByType.get(type);

        return (
          <div key={type + index}>
            <h2>{type}</h2>
            {items?.map((item, index) => (
              <p key={item.type + item.name + index}>
                type: {item.type}, name: {item.name}, lowPrice: {item.lowPrice},
                highPrice: {item.highPrice}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
