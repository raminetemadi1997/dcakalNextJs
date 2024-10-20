import LoginLayout from "../login/layout";
export const metadata = {
    title: "رمز عبور",
    robots:"noindex",
  };
export default function PasswordLayout({children}){
    return(
        <LoginLayout>
            {children}
        </LoginLayout>
    )
}