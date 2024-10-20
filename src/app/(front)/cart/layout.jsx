import CartHeader from "@/components/cart/CartHeader";
import styles from "@/assets/css/cart/Cart.module.css";
import PurchaseSteps from "@/components/cart/PurchaseSteps";
import dynamic from "next/dynamic";
import CartContext from "@/context/CartContext";

const CartFooter = dynamic(() => import("@/components/cart/CartFooter"), {
  ssr: false,
});



export default function CartLayout({ children }) {
 

  return (
    <>
      <CartContext>
        <title>سبد خرید شما</title>
        <meta name="robots" content="noindex" />
        <CartHeader />
        <main className={styles.container}>
          <PurchaseSteps />
          {children}
        </main>
        <CartFooter />
      </CartContext>
    </>
  );
}
