import getSession from "@/lib/session";
import HeaderDropdown from "./headerDropdown";

const HeaderDropdownCover = async ({}: {}) => {
  const { user: me } = await getSession();
  return (
    <div>
      <HeaderDropdown me={me} />
    </div>
  );
};

export default HeaderDropdownCover;
