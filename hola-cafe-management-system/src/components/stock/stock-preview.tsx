  import { useState, useEffect, useCallback, useRef } from "react";
  import { type CarouselApi } from "@/components/ui/carousel";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  import { Card, CardContent } from "@/components/ui/card";
  import { Stock } from "@/models/stock";
  import { dateFormatter } from "@/utils/formatter";
  import { Info } from "lucide-react";
  import dataFetch from "@/services/data-service";
  import { useAuth } from "@/context/authContext";
  import PlaceHolder from "../../assets/images/hola_logo.jpg"

  interface StockPreviewProps {
    isOpen: boolean;
    stocks: Stock[];
    selectedStock: Stock | null;
    onClose: () => void;
    callback?: () => void;
  }

  const StockPreview = ({
    isOpen,
    stocks = [],
    selectedStock = null,
    onClose,
    callback,
  }: StockPreviewProps) => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const maxQuantityRef = useRef<number>(Number(selectedStock?.quantity));
    const [quantity, setQuantity] = useState(1); // Start with 1 as default quantity
    const { token } = useAuth();
    const [updatedStocks, setUpdatedStocks] = useState<Stock[]>(stocks);

    const handleQuantityChange = (change: number) => {
      setQuantity((prev) => Math.max(0, prev + change)); // Prevent quantity from going below 0
    };    

    const modifyStockQuantity = async (newQuantity: number, supplierId: number, stockName: string, stockId: number) => {
      try {
        if (!token) throw new Error("Token not found");
    
        const response = await dataFetch(
          `api/stocks/${stockId}/`,
          "PUT",
          { quantity: newQuantity, supplier: supplierId, name: stockName },
          token
        );
    
        console.log("Stock quantity updated:", response);
    
        // Update local stock state to reflect changes in the UI
        setUpdatedStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.id === stockId ? { ...stock, quantity: newQuantity.toString() } : stock
          )
        );
        if (callback) {
          callback();
        }
      } catch (error) {
        console.error("Failed to update stock quantity", error);
      }
    };
        

    console.log(maxQuantityRef);
    useEffect(() => {
      if (carouselApi && selectedStock) {
        const index = stocks.findIndex((stock) => stock.id === selectedStock.id);
        if (index >= 0) {
          carouselApi.scrollTo(index);
          setCurrentIndex(index);
        }
      }
    }, [carouselApi, selectedStock, stocks]);

    useEffect(() => {
      if (!carouselApi) return;

      const handleSelect = () => {
        setCurrentIndex(carouselApi.selectedScrollSnap());
      };

      carouselApi.on("select", handleSelect);

      return () => {
        carouselApi.off("select", handleSelect);
      };
    }, [carouselApi]);

    useEffect(() => {
      if (selectedStock) {
        maxQuantityRef.current = Number(selectedStock.quantity);
      }
    }, [selectedStock, updatedStocks]);
    

    const getStockStatus = (quantity: number): string => {
      if (quantity === 0) return "Out of Stock";
      if (quantity <= 20) return "Low Stock";
      return "In Stock";
    };
    

    if (!isOpen || stocks.length === 0) return null;

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl min-h-96 h-fit">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1">
              <span>Stocks Preview</span>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="w-4 h-4 text-green-500 " />
                </HoverCardTrigger>
                <HoverCardContent
                  align="center"
                  side="right"
                  alignOffset={25}
                  sideOffset={16}
                >
                  <p className="text-xs ">Note: Stock Preview is swipeable</p>
                </HoverCardContent>
              </HoverCard>
            </DialogTitle>
          </DialogHeader>
          <Carousel setApi={setCarouselApi}>
            <CarouselContent className="max-w-[750px]">
              {updatedStocks.map((stock) => (
                <CarouselItem key={stock.id}>
                  <Card className="w-full bg-white border-none">
                    <CardContent>
                      <div className="grid grid-cols-2   gap-2 ">
                        <div className="border-2 border-gray-500 rounded-lg w-full min-h-80 h-52 ">
                          <img
                            src={stock.image?.image_url || PlaceHolder}
                            alt={stock.name}
                            className="h-full w-full object-cover rounded-lg"
                          />
                        </div>
                        <div className=" w-full flex flex-col gap-5 justify-start text-wrap">
                          <div className="flex flex-col w-full">
                            <h1 className="font-semibold tracking-wide text-2xl">
                              {stock.name}
                            </h1>
                            <span className="text-sm tracking-wide">
                              #{stock.id}
                            </span>
                          </div>
                          <div>
                            <p className="text-3xl font-medium tracking-wide">
                              ₱{stock.unit_price}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm tracking-wide">
                              <h1 className="font-normal text-xl">
                                Date Shelved
                              </h1>
                              <span className="text-xs underline">
                                {dateFormatter(stock.created_at)}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm tracking-wide">
                              <h1 className="font-normal text-xl">
                                Expiration Date
                              </h1>
                              <span className="text-xs underline">
                                {dateFormatter(stock.expiration_date)}
                              </span>
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm tracking-wide">
                              <h1 className="font-normal text-sm">
                                is Shelved By
                              </h1>
                              <span className="text-lg underline">
                                {stock.supplier.name}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center justify-between mb-4">
                            <button
                              className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                              onClick={() => {
                                if (Number(stock.quantity) > 0) {
                                  handleQuantityChange(-1);
                                  modifyStockQuantity(Number(stock.quantity) - 1, stock.supplier.id, stock.name, stock.id);
                                }
                              }}
                              disabled={Number(stock.quantity) <= 0} // Disable button if quantity is 0
                            >
                              -
                            </button>
                            <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
                              <span className="text-lg font-semibold">{Number(stock.quantity).toFixed(2)}</span>
                            </div>
                            <button
                              className="px-2 py-1 text-lg font-bold bg-transparent hover:border-gray-400 rounded border border-gray-300"
                              onClick={() => {
                                handleQuantityChange(1);
                                modifyStockQuantity(Number(stock.quantity) + 1, stock.supplier.id, stock.name, stock.id);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex items-center gap-1.5 mt-3">
                        <span
                          className={`block h-5 w-24 rounded-full ${
                            getStockStatus(Number(stock.quantity)) === "Out of Stock"
                              ? "bg-red-500"
                              : getStockStatus(Number(stock.quantity)) === "Low Stock"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></span>
                        <div className="flex flex-col">
                          <p className="text-xl font-semibold">
                            {`We have ${Number(stock.quantity).toFixed(2)} stocks left`}
                          </p>
                          <span
                            className={`text-sm font-medium ${
                              getStockStatus(Number(stock.quantity)) === "Out of Stock"
                                ? "text-red-500"
                                : getStockStatus(Number(stock.quantity)) === "Low Stock"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            {getStockStatus(Number(stock.quantity))}
                          </span>
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </DialogContent>
      </Dialog>
    );
  };

  export default StockPreview;
