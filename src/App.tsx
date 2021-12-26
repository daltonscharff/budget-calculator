import { useState, useEffect } from "react";
import { getItems, Item } from "./store/firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemPage from "./pages/ItemsPage";
import BudgetInputPage from "./pages/BudgetInputPage";
import PageNotFound from "./pages/PageNotFound";
import SummaryPage from "./pages/SummaryPage";
import "./App.css";

function App() {
  const [items, setItems] = useState([] as Item[]);
  const [budget, setBudget] = useState(0);
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
        <Route
          path="/"
          element={<BudgetInputPage budget={budget} setBudget={setBudget} />}
        />
        <Route
          path="/items"
          element={
            <ItemPage
              items={items}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              priceRange={priceRange}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <SummaryPage
              budget={budget}
              priceRange={priceRange}
              selectedItems={selectedItems}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
