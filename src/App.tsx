import { useState, useEffect } from "react";
import { getItems, Item } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./components/ItemPage";
import "./App.css";

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [budget, setBudget] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Map<string, Item>());
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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<div>Hello from Index</div>} />
        <Route
          path="/items"
          element={
            <ItemPage
              items={items}
              budget={budget}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              priceRange={priceRange}
            />
          }
        />
        <Route path="/summary" element={<div>Hello from Summary</div>} />
        <Route path="*" element={<div>Hello from Error</div>} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   {/* <input
    //     type="number"
    //     placeholder="Budget"
    //     value={budget}
    //     onChange={(event) => setBudget(event.target.value)}
    //   /> */}
    //   <ItemPage
    //     items={items}
    //     budget={budget}
    //     selectedItems={selectedItems}
    //     setSelectedItems={setSelectedItems}
    //     priceRange={priceRange}
    //   />
    // </div>
  );
}

export default App;
