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
  const [stocks, setStocks] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<any[]>([]);
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
      
      // Check if the response contains multiple stocks or a single stock
      if (Array.isArray(response)) {
        // Filter out expired stocks if the response is an array
        const validStocks = response.filter(stock => !stock.is_expired);
        setStocks(validStocks);
        console.log("Fetched valid stocks:", validStocks);
        setFilteredStocks(validStocks);
      } else if (!response.stock.is_expired) {
        // If the response is a single stock object and it's valid
        setStocks([response]);
        console.log("Fetched stock:", response);
        setFilteredStocks([response]);
      } else {
        console.log("Stock is expired");
      }
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
      const endPoint = `/api/stock-transactions/stock-cart/`;
      const method = "GET";

      const response = await dataFetch(endPoint, method, {}, token);
      setCart(response);
      console.log("Fetched cart:", response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (stockId: number, quantity: number) => {
    const cartItem = cart.find((stock: any) => stock.stock?.id === stockId) as { stock: { id: number }, quantity: number } | undefined;
    const stockItem = stocks.find((stock: { id: number; quantity: number }) => stock.id === stockId) as { id: number; quantity: number } | undefined;
    console.log("Stock item:", stockItem);
    console.log("Cart item:", cartItem);
    if (cartItem && cartItem.quantity + quantity > stockItem!.quantity) {
      toast.error("Insufficient stock quantity", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
      return;
    }
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }

      // Fetch the current cart data
      const endPoint = `/api/stock-carts/`;
      const method = "GET";
      const response = await dataFetch(endPoint, method, {}, token);

      // Find if the stock already exists in the cart
      const existingCartItem = response.find(
        (item: any) => item.stock === stockId
      );

      if (existingCartItem) {
        // If the stock exists, update its quantity
        const updatedQuantity = existingCartItem.quantity + quantity;

        // Update the cart
        const updateEndPoint = `/api/stock-carts/${existingCartItem.id}/`;
        const updateMethod = "PUT";
        const updatePayload = {
          quantity: updatedQuantity,
          service_crew: id,
          stock: stockId,
        };
        console.log(updateEndPoint, updateMethod, updatePayload);

        const updatedCartItem = await dataFetch(
          updateEndPoint,
          updateMethod,
          updatePayload,
          token
        );
        toast("stock successfully added to the cart", {
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
        // If the stock doesn't exist, add a new item to the cart
        const newCartItem = {
          service_crew: id,
          stock: stockId,
          quantity,
        };

        // Send a request to add the new cart item
        const createEndPoint = "/api/stock-carts/";
        const createMethod = "POST";
        const createPayload = newCartItem;

        const addedCartItem = await dataFetch(
          createEndPoint,
          createMethod,
          createPayload,
          token
        );
        toast("stock successfully added to the cart", {
          duration: 2000,
          icon: <CircleCheck className="fill-green-500 text-white" />,
          className: "bg-white text-custom-charcoalOlive",
        });

        // update the cart state or UI to reflect the new item
        setCart((prevCart) => [...prevCart, addedCartItem]);
      }
      fetchCart();
    } catch (error) {
      toast.error("Failed to add stock to the cart", {
        icon: <X className="text-red-500" />,
        className: "bg-white text-red-500 ",
      });
      console.error("Error adding stock to cart:", error);
    }
  };

  const createTransaction = async (payload: {
    service_crew: number;
  }) => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }
      const endPoint = "/api/stock-transactions/";
      const response = await dataFetch(endPoint, "POST", payload, token);
      console.log("Transaction created successfully", response);
      toast("Transaction completed", {
        duration: 2000,
        icon: <CircleCheck className="fill-green-500 text-white" />,
        className: "bg-white text-custom-charcoalOlive",
      });
      setIsTransactionPopupOpen(false);
      fetchCart(); // Refresh cart after transaction
      fetchStocks();
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
        const stockPrice = parseFloat(item.stock.price);
        const quantity = item.quantity;
        return total + stockPrice * quantity;
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
        cartStocks={cart}
        openTransactionPopup={openTransactionPopup}
        refreshCart={fetchCart}
      />

      {/* Transaction Popup */}
      {isTransactionPopupOpen && (
        <TransactionPopup
          onClose={closeTransactionPopup}
          onSubmitTransaction={createTransaction}
          totalPrice={calculateTotalPrice()}
          stocks={cart}
          serviceCrewId={service_crew}
          open={true}
        />
      )}
    </div>
  );
};

export default StockPosPage;
