import { db } from "@/config/firebase"
import {
  DocumentData,
  DocumentReference,
  OrderByDirection,
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"

import { useCollection } from "react-firebase-hooks/firestore"

interface CustomQuery {
  orderBy: [string, OrderByDirection]
  limit: number
}

interface SubCollectionData {
  [key: string]: any // benerin ndak tw
}

export default function GetCollection(
  collectionName: string,
  customQuery: CustomQuery = {
    orderBy: ["createdAt", "desc"],
    limit: 1000,
  }
) {
  const { orderBy: orderByValue, limit: limitValue } = customQuery
  const [data] = useCollection(
    query(
      collection(db, collectionName),
      orderBy(orderByValue[0], orderByValue[1]),
      limit(limitValue)
    )
  )
  return data?.docs || []
}

export function GetSubCollection(
  colPath: string,
  customQuery: CustomQuery = {
    orderBy: ["createdAt", "desc"],
    limit: 1000,
  }
) {
  const { orderBy: orderByValue, limit: limitValue } = customQuery
  const [data] = useCollection(
    query(
      collection(db, colPath.split("/").join("/")),
      orderBy(orderByValue[0], orderByValue[1]),
      limit(limitValue)
    )
  )
  return data?.docs || []
}

export async function addDataSubCollection(
  collectionName: string,
  docId: string,
  subCollectionName: string,
  data: SubCollectionData
) {
  try {
    const docRef = doc(db, collectionName, docId)
    const colRef = collection(docRef, subCollectionName)
    await addDoc(colRef, data)
  } catch (error) {
    console.error("Error adding sub collection: ", error)
  }
}

export async function addDataDoc(
  collectionName: string,
  data: object
): Promise<DocumentReference<DocumentData>> {
  try {
    let result = await addDoc(collection(db, collectionName), data)
    return result
  } catch (error) {
    console.error("Error adding data document: ", error)
    throw error
  }
}

export async function updateDataDoc(
  collectionName: string,
  docId: string,
  data: SubCollectionData
) {
  try {
    await updateDoc(doc(db, collectionName, docId), data)
  } catch (error) {
    console.error("Error updating data document: ", error)
  }
}

export function randomInt(range: number): string {
  let number = "1234567890"
  let result: string[] = []

  for (let i = 0; i < range; i++) {
    result.push(number[Math.floor(Math.random() * number.length)])
  }

  return result.join("")
}

export function modifyWord(word: string, count: number): string {
  let modifiedWord = ""

  for (let i = 0; i < word.length; i++) {
    if (modifiedWord.length === count) {
      break
    }
    modifiedWord += word[i].toLowerCase()
  }

  return modifiedWord.split(" ").join("")
}
