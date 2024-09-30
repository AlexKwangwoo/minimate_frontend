import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/login": true,
  "/register": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  // 세선아이디가 쿠키에 없는 사람들 중에..(로그인이 안된 상태면) 위에포함된 url에 갈려고하는걸 제외하면 다 리다이렉할것임
  // 로그인해야만 다른 페이지를 갈수있음!
  if (!session.user) {
    // 유저가 로그인안되어있으면 보면안되는 페이지에서 어디로 이동시킬것인지
    // if (!exists) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
  } else {
    if (exists) {
      //로그인한 유저가 create account 및 로그인화면으로 가는건 아니기에 리다이렉해줌!
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
