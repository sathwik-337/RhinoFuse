import { useCart } from "../context/CartContext";
import { useState } from "react";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");

  const handleCheckout = () => {
    alert(`Order placed! Payment: ${payment}`);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address"
          className="w-full p-3 mb-4 text-black rounded"
        />

        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="COD"
              checked={payment === "COD"}
              onChange={(e) => setPayment(e.target.value)}
            />{" "}
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="Card"
              checked={payment === "Card"}
              onChange={(e) => setPayment(e.target.value)}
            />{" "}
            Credit/Debit Card
          </label>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
