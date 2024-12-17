import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStockNotifications } from "@/hooks/useStockNotifications";
import PosHeader from "@/components/stock-pos/header";
import PosMenus from "@/components/stock-pos/menus";
import PosTransaction from "@/components/stock-pos/transaction";
import TransactionPopup from "@/components/stock-pos/popup";

const StockPosPage = () => {
  const [stocks, setStocks] = useState([]);
  const [cart, setCart] = useState<any[]>([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isTransactionPopupOpen, setIsTransactionPopupOpen] = useState(false); // Popup state
  const { token, id } = useAuth();
  const [service_crew] = useState(id);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    fetchStocks();
    fetchCart();
  }, []);

  const fetchStocks = async () => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }
      const endPoint = "api/image/is-stocked-by/supplier/stock/";
      const method = "GET";

      const response = await dataFetch(endPoint, method, {}, token);
      setStocks(response);
      console.log("Fetched menus:", response);
      setFilteredStocks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }
      const endPoint = `/api/product/service-crew/cart`;
      const method = "GET";

      const response = await dataFetch(endPoint, method, {}, token);
      setCart(response);
      console.log("Fetched cart:", response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }

      // Fetch the current cart data
      const endPoint = `/api/carts/?service_crew=${id}`;
      const method = "GET";
      const response = await dataFetch(endPoint, method, {}, token);

      // Find if the product already exists in the cart
      const existingCartItem = response.find(
        (item: any) => item.product === productId
      );

      if (existingCartItem) {
        // If the product exists, update its quantity
        const updatedQuantity = existingCartItem.quantity + quantity;

        // Update the cart
        const updateEndPoint = `/api/carts/${existingCartItem.id}/`;
        const updateMethod = "PUT";
        const updatePayload = {
          quantity: updatedQuantity,
          service_crew: id,
          product: productId,
        };
        console.log(updateEndPoint, updateMethod, updatePayload);

        const updatedCartItem = await dataFetch(
          updateEndPoint,
          updateMethod,
          updatePayload,
          token
        );
        toast("Product successfully added to the cart", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });
        console.log("Updated cart item:", updatedCartItem);

        //update the cart state or UI to reflect the updated item
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === existingCartItem.id
              ? { ...item, quantity: updatedQuantity }
              : item
          )
        );
      } else {
        // If the product doesn't exist, add a new item to the cart
        const newCartItem = {
          service_crew: id,
          product: productId,
          quantity,
        };

        // Send a request to add the new cart item
        const createEndPoint = "/api/carts/";
        const createMethod = "POST";
        const createPayload = newCartItem;

        const addedCartItem = await dataFetch(
          createEndPoint,
          createMethod,
          createPayload,
          token
        );
        toast("Product successfully added to the cart", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });

        // update the cart state or UI to reflect the new item
        setCart((prevCart) => [...prevCart, addedCartItem]);
      }
      fetchCart();
    } catch (error) {
      toast.error("Failed to add product to the cart", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
      console.error("Error adding product to cart:", error);
    }
  };

  const createTransaction = async (payload: {
    total_price: string;
    payment_method: string;
    service_crew: number;
  }) => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }
      const endPoint = "/api/transactions/";
      const response = await dataFetch(endPoint, "POST", payload, token);
      console.log("Transaction created successfully", response);
      toast("Transaction completed", {
        duration: 2000,
        icon: <CircleCheck className="fill-green-500 text-white" />,
        className: "bg-white text-custom-charcoalOlive",
      });
      setIsTransactionPopupOpen(false);
      fetchCart(); // Refresh cart after transaction
    } catch (error) {
      toast.error("Failed to create transaction", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
      console.error("Error creating transaction:", error);
    }
  };

  const openTransactionPopup = () => {
    setIsTransactionPopupOpen(true);
  };

  const closeTransactionPopup = () => {
    setIsTransactionPopupOpen(false);
  };

  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0) return 0;
    return cart
      .reduce((total, item) => {
        const productPrice = parseFloat(item.product.price);
        const quantity = item.quantity;
        return total + productPrice * quantity;
      }, 0)
      .toFixed(2); // Keep 2 decimal places for currency format
  };

  const handleFilterChange = (categoryName: string) => {
    if (categoryName === "all") {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(
        (menu: { category: { name: string } }) =>
          menu.category.name === categoryName
      );
      setFilteredStocks(filtered);
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    const filtered = stocks.filter((menu: { name: string }) =>
      menu.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStocks(filtered);
  };

  return (
    <div className="flex">
      <Toaster position="top-right" />
      {/* Main content */}
      <div className="flex-1 p-6">
        <PosHeader
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
        <PosMenus stocks={filteredStocks} addToCart={addToCart} />
      </div>

      {/* Transaction Panel */}
      <PosTransaction
        cartProducts={cart}
        openTransactionPopup={openTransactionPopup}
        refreshCart={fetchCart}
      />

      {/* Transaction Popup */}
      {isTransactionPopupOpen && (
        <TransactionPopup
          onClose={closeTransactionPopup}
          onSubmitTransaction={createTransaction}
          totalPrice={calculateTotalPrice()}
          products={cart}
          serviceCrewId={service_crew}
          open={true}
        />
      )}
    </div>
  );
};

export default StockPosPage;
