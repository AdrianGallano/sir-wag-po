import { Product } from "@/models/stock";
import { useState, useEffect } from "react";
import { Toaster } from "../ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface ProductPreviewProps {
  isOpen: boolean;
  product: Product[];
  selectedProduct: Product | null;
  onClose: () => void;
}

const ProductPreview = ({
  isOpen,
  product,
  selectedProduct,
  onClose,
}: ProductPreviewProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (selectedProduct) {
      const index = product.findIndex((p) => p.id === selectedProduct.id);
      setSelectedIndex(index >= 0 ? index : 0);
    }
  }, [selectedProduct, product]);

  if (!isOpen || !product.length) return null;

  console.log("Product preview", product);
  console.log("Selected Product preview", selectedProduct);

  return (
    <div className="w-full">
      {/* <SheetHeader>
        <SheetDescription className="w-full">
          <img
            src={selectedImageUrl || placeholder}
            alt={product.name}
            className="w-full h-52 rounded-md border border-gray-300 object-contain"
          />
        </SheetDescription>

        <SheetTitle className="md:text-3xl sm:text-sm">
          {toTitleCase(product.name)}
        </SheetTitle>
        <SheetDescription className="md:text-base sm:text-sm text-gray-600">
          {product.description}
        </SheetDescription>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <SheetDescription className="space-y-1 w-full">
          <div>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Price:</span> {product.price}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Cost Price:</span> {product.cost_price}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Quantity:</span> {product.quantity}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Expiration Date:</span>{" "}
              {dateFormatter(product.expiration_date)}
            </p>
            <p className="md:text-base sm:text-sm text-gray-600">
              <span>Category:</span> {toTitleCase(product.category.name)}
            </p>

            <Popover>
              <PopoverTrigger>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Supplier:</span> {toTitleCase(product.supplier.name)}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Name:</span> {toTitleCase(product.supplier.name)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Contact Person:</span>{" "}
                  {toTitleCase(product.supplier.contact_person)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Phone Number:</span>{" "}
                  {toTitleCase(product.supplier.phone_number)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Address:</span> {toTitleCase(product.supplier.address)}
                </p>
                <p className="md:text-base sm:text-sm text-gray-600">
                  <span>Email:</span> {toTitleCase(product.supplier.email)}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </SheetDescription>
      </SheetHeader> */}

      <Carousel className="w-full max-w-xs">
        {" "}
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </DialogContent>
        </Dialog>
      </Carousel>

      <Toaster position="top-right" />
    </div>
  );
};

export default ProductPreview;
