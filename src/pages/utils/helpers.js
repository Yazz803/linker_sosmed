import { db } from "yazz/config/firebase";
import { query, collection, orderBy, limit, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

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

export async function addDataDoc(collectionName, data) {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.error("Error adding message document: ", error);
  }
}
