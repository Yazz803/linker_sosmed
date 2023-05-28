import { useAuth } from "yazz/context/AuthContext";
import { GetSubCollection, getUser } from "./helpers";

export const GetCountVisitors = () => {
  let countVisitor = 0;
  let { currentUser } = useAuth();
  const user =getUser("uid", currentUser?.uid);
  let historyVisitors = GetSubCollection(`users/${user?.id}/history_visitors`);
  countVisitor = historyVisitors.length;
  return countVisitor;
};
