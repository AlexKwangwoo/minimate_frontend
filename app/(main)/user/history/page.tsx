import ProfileForm from "@/components/Profile/profileForm";
import getSession from "@/lib/session";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { getOrderHistory } from "./actions";
import HistoryTable from "@/components/OrderHistory/historyTable";

const getCachedOrderHistories = nextCache(getOrderHistory, ["order"], {
  tags: ["order-history"],
});

const OrderHistory = async () => {
  const { user: me, token } = await getSession();
  const orderHistories = await getCachedOrderHistories(token).then(
    (result) => result.data
  );

  // console.log("orderHistories", orderHistories);
  return <HistoryTable orderHistories={orderHistories} me={me} />;
};

export default OrderHistory;
