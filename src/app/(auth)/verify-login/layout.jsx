import LoginLayout from "../login/layout";

export const metadata = {
    title:'کد تایید',
    robots:"noindex",
}

export default function VerifyLoginLayout({children}) {
    return(
        <LoginLayout>
            {children}
        </LoginLayout>
    )
}