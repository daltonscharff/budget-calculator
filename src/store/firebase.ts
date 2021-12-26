import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";
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

export type BudgetResponse = {
  budget: number;
  items: Item[];
};

export async function getItems(): Promise<Item[]> {
  const itemsCol = collection(db, "items");
  const itemSnapshot = await getDocs(itemsCol);
  const itemList = itemSnapshot.docs.map((doc) => doc.data() as Item);
  return itemList;
}

export async function postBudgetResponse(
  budgetResponse: BudgetResponse
): Promise<string> {
  const myDoc = doc(db, "daltonScharffBudgetResponses", "abc123");
  const docRef = await setDoc(myDoc, budgetResponse);
  return "abc123";
}

export async function getBudgetResponses(): Promise<BudgetResponse[]> {
  const myCol = collection(db, "daltonScharffBudgetResponses");
  const budgetResponseSnapshot = await getDocs(myCol);
  const budgetResponseList = budgetResponseSnapshot.docs.map(
    (doc) => doc.data() as BudgetResponse
  );
  return budgetResponseList;
}
