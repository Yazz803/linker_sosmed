import { useAuth } from "yazz/context/AuthContext";
import { GetSubCollection, getUser } from "./helpers";

export const GetCountLinkClicks = (linkDoc) => {
  let countClickers = 0;
  let { currentUser } = useAuth();
  const user = getUser("uid", currentUser?.uid);
  let historyClickers = GetSubCollection(
    `users/${user?.id}/links/${linkDoc?.id}/history_link_clicks`
  );
  // Count without current user
  // historyClickers = historyClickers.filter(
  //   (doc) => doc.data().uid !== user?.data().uid
  // );
  countClickers = historyClickers.length;
  return countClickers;
};
