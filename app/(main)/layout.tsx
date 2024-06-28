import Footer from "../../components/footer";
import Header from "../../components/Header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full h-[100vh] font-poppins bg-[#ffffff]"
      // style={{
      //   backgroundImage: location.pathname === '/' ? `url('${BgImg}')` : '',
      //   backgroundSize: '8%',
      //   backgroundRepeat: 'repeat',
      //   minHeight: '100vh',
      // }}
    >
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
