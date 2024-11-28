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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { Stock } from "@/models/stock";
import { dateFormatter } from "@/utils/formatter";
import { Info } from "lucide-react";

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

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

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
            {stocks.map((stock) => (
              <CarouselItem key={stock.id}>
                <Card className="w-full bg-white border-none">
                  <CardContent>
                    <div className="grid grid-cols-2   gap-2 ">
                      <div className="border-2 border-gray-500 rounded-lg w-full min-h-72 h-full ">
                        <img
                          src={stock.image?.image_url}
                          alt={stock.name}
                          className="h-full w-full object-contain rounded-lg"
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

                    <div className="w-full flex items-center gap-1.5    mt-3">
                      <span className="bg-green-500 w-1/4   block h-5 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"></span>
                      <div className="w-full">
                        <p className="underline text-wrap text-xl">
                          We have {stock.quantity} stocks left
                        </p>
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
