- npx create-next-app@latest

✔ What is your project named? … minimate
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/\*)? › No

서버컴포넌트 이용해야하는이유
서버쪽에서 바로 백앤드와 이야기 가능하다!
브라우저에서 <-> api <-> DB 이렇게 할필요없다
즉 meta (SEO) 사용도 가능하고!
보안에 좋음! 백앤드가 바로 db랑 대화하기에 그다음 백앤드에서 결과를 랜더해서 클라이언트에게줌.. 그동안 loading page에 나둔 것을 미리 보여줄것임!!

즉 export default function Page() {
<--- 여기 공간에 아무 말이나 써도됨,, 왜냐하면 백엔드에서 다 HTML 로 바꿀꺼임.. 여기는 안보일거임.. --- >
<--- client 사이드만 hydration 될때 자바스크립트 부분이 적용될것임! ---->
return ()
}

start

- 헤더나 authrization 같은거 토큰 넣어줘야하는 api는 특별 인자를 넣어줘야한다! 그래야 캐쉬가 작동함
- loading 페이지 안넣으면 서버사이드에서 데이터 패칭중일떄는 화면이 바로 안나타남.. !!(중요!!) 그래서 느려보인다 생각할수있음!
- 파일넣어도 page 가없으면 렌더 되지 않음!
- server component에 데이터 패치 있으면 파일 명 funtion에 async 붙여줘야함
- 패치 되면 서버컴포넌트에서.. 캐쉬가 된다 그래서 리프레쉬 해도 바로나올것임 로딩없이
- Page 단위 로딩 => loading.tsx page에 await없으면 작동안할것임, 서버 컴포넌트 단위 로딩 => Suspense
- 마찬가지로 페이지 단위로 에러를 표시할수있다!
- suspense, loading page 전부 서버컴포넌트에서만 이용가능

------------ 캐쉬!!!

- server component 사용해야 fetch도 캐쉬 사용해서 다시 부르는걸 방지할것임!

- cart 페이지에 실험해봤음!! key가 영향을 끼치는지 결과 : key + 함수명으로 조합하는듯 하다
  즉 함수내용이 같아도 함수 명과 key 조합에 의해서 revalidate에 의해 함수가 몇번 불릴지 결정됨!
- const getCachedCarts = nextCache(
  getCarts,
  ["cart"], //cart는 고유해야함.. key값은 고유해야함!!
  { tags: ["cart-list","haha"] } // tag는 중복되도돔! 여러개 가능!
  );
- revalidateTag 를 쓰면 테그만 같으면 다른 key일지라도 같이 revalidate 될것임!

// 캐쉬!! fetch를사용해 주소로 데이터를 주고받으면 자동으로 캐쉬가 될것임! 단!
// get이고 cookies나 header를 쓰지않아야함! 인증관련일수도있고
// 많은 기밀상항이 올수있기에 캐쉬안함!
async function getProduct2(id: number) {
fetch("https://api.com", {
next: {
revalidate: 60,
tags: ["hello"],
},
});
}

- 여기서 fetch 의 테그와 nextCache의 tag는 같은 저장소이므로 revalidateTag 에 같이 작용함!

- // 페이지를 강제로 다이나믹하게 만들어준다!
  // export const dynamic = "force-dynamic";
- //export const revalidate = 5; // 5초가 지나서 유저가 요청을 한다면.. nextjs가 다시 만들어서 html 파일을 전송해 줄것임..
  // 60초안에 요구하면 똑같은 페이지를 줄것임 이동안 suspense를 이용하거나 loading.tsx 페이지를 이용하면된다
