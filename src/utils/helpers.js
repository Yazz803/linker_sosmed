import { db } from "yazz/config/firebase";
import {
  query,
  collection,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { message } from "antd";

export default function GetCollection(
  collectionName,
  costumQuery = { orderBy: ["createdAt", "desc"], limit: 1000 }
) {
  const resQuery = query(
    collection(db, collectionName),
    orderBy(costumQuery?.orderBy[0], costumQuery?.orderBy[1]),
    limit(costumQuery?.limit)
  );
  // return resQuery;
  const [data] = useCollection(resQuery);
  return data?.docs || [];
}

export function GetSubCollection(
  colPath,
  costumQuery = { orderBy: ["createdAt", "desc"], limit: 1000 }
) {
  const resQuery = query(
    collection(db, ...colPath.split("/")),
    orderBy(costumQuery?.orderBy[0], costumQuery?.orderBy[1]),
    limit(costumQuery?.limit)
  );
  // return resQuery;
  const [data] = useCollection(resQuery);
  return data?.docs || [];
}

export async function addDataSubCollection(
  collectionName,
  docId,
  subCollectionName,
  data
) {
  try {
    const docRef = doc(db, collectionName, docId);
    const colRef = collection(docRef, subCollectionName);
    await addDoc(colRef, data);
  } catch (error) {
    console.error("Error adding sub collection: ", error);
    message.error("Error adding sub collection");
  }
}

export async function addDataDoc(collectionName, data) {
  try {
    let result = await addDoc(collection(db, collectionName), data);
    return result;
  } catch (error) {
    console.error("Error adding data document: ", error);
    message.error("Error adding data document");
  }
}

export async function updateDataDoc(collectionName, docId, data) {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
  } catch (error) {
    console.error("Error updating data document: ", error);
    message.error("Error updating data document");
  }
}

export function randomInt(range) {
  let angka = "1234567890";
  let result = [];

  for (let i = 0; i < range; i++) {
    result.push(angka[Math.floor(Math.random() * angka.length)]);
  }

  return result.join("");
}

export function modifyWord(word, count) {
  let modifiedWord = "";

  for (let i = 0; i <= word.length; i++) {
    if (modifiedWord.length === count) {
      break;
    }
    modifiedWord += word[i].toLowerCase();
  }

  return modifiedWord.split(" ").join("");
}
