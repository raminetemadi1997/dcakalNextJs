import CartLayout from "../cart/layout";
export const metadata = {
    title: "آدرس",
    robots:"noindex",
  };
  
export default function AddressLayout({ children }) {
    return (
      <CartLayout>
        {children}
      </CartLayout>
    )
  }