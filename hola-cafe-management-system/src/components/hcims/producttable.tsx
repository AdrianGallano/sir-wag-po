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
import { useState } from "react";
import ProductPreview from "./productpreview";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
}

const ProductTable = ({
  products,
  categories,
  suppliers,
}: ProductTableProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  return (
    <>
      <Table className="overflow-hidden rounded-md w-full shadow-md ">
        <TableHeader className="bg-custom-paleButter hover:bg-custom-paleButter ">
          <TableRow>
            <TableHead className=" text-custom-charcoalOlive">Items</TableHead>
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
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium flex items-center gap-1 px-6 py-4">
                <img
                  src={placeholder}
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
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      onClick={() => setSelectedItem(product)}
                      className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3 "
                    >
                      <EyeIcon className="w-5 text-black " />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="min-w-[35%]">
                    <ProductPreview
                      product={selectedItem}
                      categories={categories}
                      suppliers={suppliers}
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
