import CartLayout from "../cart/layout";
export const metadata = {
  title: "پرداخت",
  robots: "noindex",
};

export default function PaymentLayout({ children }) {
  return (
    <CartLayout>
        {children}
    </CartLayout>
  );
}
