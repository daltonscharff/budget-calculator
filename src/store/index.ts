import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import config from "../config.json";

const firebaseConfig = config.firebase;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type Item = {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
};

export async function getItems(): Promise<Item[]> {
  const itemsCol = collection(db, "items");
  const itemSnapshot = await getDocs(itemsCol);
  const itemList = itemSnapshot.docs.map((doc) => doc.data() as Item);
  return itemList;
}
