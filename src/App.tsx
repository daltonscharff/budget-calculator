import { useState, useEffect } from "react";
import { getItems, Item } from "./store";
import "./App.css";

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [itemsByType, setItemsByType] = useState(new Map<string, Item[]>());
  const [budget, setBudget] = useState(0);
  const [selectedItems, setSelectedItems] = useState(
    {} as Map<string, Item | null>
  );

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

  return (
    <div className="App">
      {items.map((item, i) => (
        <div key={item.type + item.name + i}>
          type: {item.type}, name: {item.name}, lowPrice: {item.lowPrice},
          highPrice: {item.highPrice}
        </div>
      ))}
    </div>
  );
}

export default App;
