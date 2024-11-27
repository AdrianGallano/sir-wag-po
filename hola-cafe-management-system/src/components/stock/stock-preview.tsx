import { useState, useEffect, useCallback } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Stock } from "@/models/stock";
import { dateFormatter } from "@/utils/formatter";

interface StockPreviewProps {
  isOpen: boolean;
  stocks: Stock[];
  selectedStock: Stock | null;
  onClose: () => void;
}

const StockPreview = ({
  isOpen,
  stocks = [],
  selectedStock = null,
  onClose,
}: StockPreviewProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    // Cleanup on unmount
    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  if (!isOpen || stocks.length === 0) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Stock Preview</DialogTitle>
        </DialogHeader>
        <Carousel setApi={setCarouselApi}>
          <CarouselContent>
            {stocks.map((stock) => (
              <CarouselItem key={stock.id}>
                <Card className="border-none">
                  <CardContent>
                    <div className="w-full flex items-center justify-center gap-2 ">
                      <div className="border-2 border-gray-500 rounded-lg max-w-72 max-h-72 ">
                        <img
                          src={stock.image?.image_url}
                          alt={stock.name}
                          className="h-full w-full object-contain rounded-lg"
                        />
                      </div>
                      <div className="w-full flex flex-col gap-5 justify-start">
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
                            ₱{stock.cost_price}
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
                      </div>
                    </div>
                    <div></div>
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
