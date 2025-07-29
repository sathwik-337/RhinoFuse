import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty. <Link to="/products" className="text-blue-400">Shop now</Link></p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-gray-700 py-4">
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p className="text-gray-400">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 text-black p-1 rounded"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => removeFromCart(item.id)} className="bg-red-600 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 text-right">
              <p className="text-xl mb-4">Total: ₹{total}</p>
              <Link to="/checkout" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
