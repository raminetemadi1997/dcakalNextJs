import SnakebarContextProvider from "../../../context/snakebar";
export const metadata = {
  title: "ورود",
  robots:"noindex",
};
export default function LoginLayout({ children }) {
  return (
      <main>
        <SnakebarContextProvider>{children}</SnakebarContextProvider>
      </main>
  );
}
