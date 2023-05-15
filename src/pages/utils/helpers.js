import { db } from "yazz/config/firebase";
import { query, collection, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export const GetCollection = (collectionName, costumQuery) => {
  const testingRef = query(
    collection(db, collectionName),
    orderBy(costumQuery?.orderBy[0], costumQuery?.orderBy[1]),
    limit(costumQuery?.limit)
  );
  const [data] = useCollection(testingRef);
  return data?.docs || [];
};
