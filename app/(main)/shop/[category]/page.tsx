import { getCategory } from "./actions";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import { Category_type, General_data_type } from "@/type/general_type";
// import ItemsList from "@/components/Shop/itemsList";
// import dynamic from "next/dynamic";
import ItemsListServerTest from "@/components/Shop/itemsListServerTest";
import ItemsList from "@/components/Shop/itemsList";
import Link from "next/link";
import AddToCartBar from "@/components/Shop/addToCartBar";
import getSession from "@/lib/session";

// const ItemsList = dynamic(() => import("@/components/Shop/itemsList"), {
//   ssr: false,
// });

const getCachedCategories = nextCache(getCategory, ["category"], {
  revalidate: 360, // 360초는 지나야 최신정보를 호출할것임!
});

// 페이지를 강제로 다이나믹하게 만들어준다!
// export const dynamic = "force-dynamic";

// static으로 돌아갈것임
export const revalidate = 5; // 5초가 지나서 유저가 요청을 한다면.. nextjs가 다시 만들어서 html 파일을 전송해 줄것임..
// 60초안에 요구하면 똑같은 페이지를 줄것임 이동안 suspense를 이용하거나 loading.tsx 페이지를 이용하면된다

export default async function Shop({
  params,
}: {
  params: { category: string };
}) {
  const selectedCategory = params.category;
  const categories = await getCachedCategories();
  const { user: me } = await getSession();

  const revalidate = async () => {
    "use server";
    // 정확한 주소를 줘야 revalidate함! /shop 하면 안함
    // /shop/all 안에있는 모든 데이터를 새로고침함!
    revalidatePath("/shop/all");
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#fff9e7] flex pb-28 sm:pb-12 pt-12 px-10 sm:px-20 md:px-40">
      <div className="flex flex-col w-full h-full ">
        <form action={revalidate}>
          <div className="mb-4 text-3xl font-bold md:text-4xl md:mb-8 ">
            SHOP
            <br />
            <button className="text-[12px]">Cate Revalidate Button</button>
          </div>
        </form>
        <div className="grid items-center w-full h-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <Link
            className={`cursor-pointer w-full h-full text-sm text-center px-5 py-2 rounded-lg border ${
              selectedCategory.toLowerCase() === "all"
                ? " bg-black text-white shadow-md border-white"
                : "border-[#ddd] bg-white shadow-md hover:bg-[#00000052]"
            } flex items-center justify-center`}
            href={`/shop/all`}
          >
            All
          </Link>
          {categories.data
            .filter(
              (category: Category_type) =>
                // category.name.toLowerCase().includes("private")
                category.kind.toLowerCase() === "shop"
              // category.length > 0
            )
            .map((category: Category_type) => (
              <Link
                key={category._id}
                className={`cursor-pointer w-full text-sm text-center px-5 py-2 rounded-lg border ${
                  selectedCategory === category.name.toLowerCase()
                    ? "bg-black text-white shadow-md border-white"
                    : "border-[#ddd] bg-white shadow-md hover:bg-[#00000052]"
                }`}
                // onClick={() => handleCategoryClick(category._id)}
                href={`/shop/${category.name.toLowerCase()}`}
              >
                {category.name}
              </Link>
            ))}
        </div>
        {/* 서스펜스는 서버컴포넌트일때만 작동 */}
        {/* <Suspense
          key={selectedCategory}
          fallback={<div className="w-[200px] bg-black h-[300px]">Loading</div>}
        >
          <ItemsList />
        </Suspense> */}

        <ItemsList me={me} />
      </div>
    </div>
  );
}
