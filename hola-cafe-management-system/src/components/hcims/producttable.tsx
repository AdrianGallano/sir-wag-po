import { Product } from "@/models/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import placeholder from "./../../assets/images/hola_logo.jpg";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ProductPreview from "./productpreview";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  onproductDeleted: () => void;
  onproductUpdated: () => void;
}

const ProductTable = ({
  products,
  categories,
  suppliers,
  onproductDeleted,
  onproductUpdated,
}: ProductTableProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  // monitor product changes
  useEffect(() => {
    if (!selectedItem) {
      console.log("No product selected");
      closeSheet();
    } else {
      console.log("Selected product:", selectedItem);
    }
  }, [selectedItem]);

  // close the sheet
  const closeSheet = () => {
    setSelectedItem(null);
    console.log("Closing preview");
  };

  return (
    <>
      <Table className="overflow-hidden rounded-md w-full shadow-md">
        <TableHeader className="bg-custom-sunnyGold hover:bg-custom-paleButter ">
          <TableRow>
            <TableHead className=" text-custom-charcoalOlive  ">
              Items
            </TableHead>
            <TableHead className=" text-custom-charcoalOlive ">
              Quantity
            </TableHead>
            <TableHead className=" text-custom-charcoalOlive">Price</TableHead>
            <TableHead className=" text-custom-charcoalOlive">
              Cost Price
            </TableHead>
            <TableHead className=" text-custom-charcoalOlive">
              Supplier
            </TableHead>
            <TableHead className=" text-custom-charcoalOlive">
              Expiration Date
            </TableHead>
            <TableHead className=" text-custom-charcoalOlive"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white ">
          {products.map((product) => (
            <TableRow key={product.id} className=" border border-gray-300 ">
              <TableCell className="font-medium flex items-center gap-1 px-6 py-4">
                <img
                  src={product.image?.image_url || placeholder}
                  alt={product.name}
                  className="w-12 object-center rounded-sm"
                />
                <span className="md:text-base sm:text-sm ">
                  {toTitleCase(product.name)}
                </span>
              </TableCell>
              <TableCell className="md:text-base sm:text-sm">
                {product.quantity}
              </TableCell>
              <TableCell className="md:text-base sm:text-sm">
                {product.price}
              </TableCell>
              <TableCell className="md:text-base sm:text-sm">
                {product.cost_price}
              </TableCell>
              <TableCell className="md:text-base sm:text-sm">
                {product.supplier.name}
              </TableCell>
              <TableCell className="md:text-base sm:text-sm">
                {dateFormatter(product.expiration_date)}
              </TableCell>
              <TableCell>
                <Sheet
                  open={!!selectedItem}
                  onOpenChange={(open) => {
                    if (!open) closeSheet();
                  }}
                >
                  <SheetTrigger asChild>
                    <Button
                      onClick={() => setSelectedItem(product)}
                      className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3 "
                    >
                      <EyeIcon className="w-5 text-black " />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    style={{
                      scrollbarWidth: "none",
                    }}
                    className=" min-w-[35%] min-h-screen overflow-y-scroll"
                  >
                    <ProductPreview
                      product={selectedItem}
                      categories={categories}
                      suppliers={suppliers}
                      onClose={closeSheet}
                      onproductDeleted={onproductDeleted}
                      onproductUpdated={onproductUpdated}
                    />
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ProductTable;
