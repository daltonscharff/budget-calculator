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
              <div>
                <label
                  htmlFor={type + index}
                  onClick={() => {
                    setSelectedItems(new Map(selectedItems).set(type, item));
                  }}
                >
                  <input
                    type="radio"
                    id={type + index}
                    name={type}
                    value={index}
                  />
                  {item.name}: ${item.lowPrice} - ${item.highPrice}
                </label>
              </div>
            ))}
          </div>
        );
      })}
      <h3>
        Estimated Total: ${priceRange.low} - ${priceRange.high}
      </h3>
    </div>
  );
}

export default App;
