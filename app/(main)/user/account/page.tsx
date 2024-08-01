import ProfileForm from "@/components/Profile/profileForm";
import getSession from "@/lib/session";

const Account = async () => {
  const { user: me } = await getSession();
  return <ProfileForm me={me} />;
};

export default Account;
