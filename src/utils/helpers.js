import { db } from "yazz/config/firebase";
import {
  query,
  collection,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
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

export function getUser(field, compareField) {
  const users = GetCollection("users");
  const user = users.find((doc) => doc.data()[field] === compareField);
  return user;
}

export function getAppearance(userId) {
  const result = GetSubCollection(`users/${userId}/appearance_settings`)[0];
  return result;
}

export async function addDataDoc(colPath, data) {
  try {
    let result = await addDoc(collection(db, ...colPath.split("/")), data);
    return result;
  } catch (error) {
    console.error("Error adding data document: ", error);
    message.error("Error adding data document");
  }
}

export async function updateDataDoc(colPath, docId, data) {
  try {
    await updateDoc(doc(db, ...colPath.split("/"), docId), data);
  } catch (error) {
    console.error("Error updating data document: ", error);
    message.error("Error updating data document");
  }
}

export async function deleteDataDoc(colPath, docId) {
  try {
    await deleteDoc(doc(db, ...colPath.split("/"), docId));
  } catch (error) {
    console.error("Error deleting data document: ", error);
    message.error("Error deleting data document");
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

export function generateUsername(username) {
  let result = modifyWord(username, 5) + randomInt(4);
  return result;
}

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  return message.success("Link berhasil di copy!");
}
