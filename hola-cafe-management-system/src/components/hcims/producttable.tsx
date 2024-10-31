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

const ProductTable = ({ products, categories, suppliers }: ProductTableProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  return (
    <>
      <Table className="overflow-hidden rounded-md w-full shadow-md">
        <TableHeader className="bg-custom-paleButter hover:bg-custom-paleButter ">
          <TableRow>
            <TableHead className="text-center text-custom-charcoalOlive">Items</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive ">Quantity</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive">Price</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive">Cost Price</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive">Supplier</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive">Created at</TableHead>
            <TableHead className="text-center text-custom-charcoalOlive"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium inline-flex items-center gap-1">
                <img
                  src={placeholder}
                  alt={product.name}
                  className="w-12 object-center rounded-sm"
                />
                <span className="text-center">{toTitleCase(product.name)}</span>
              </TableCell>
              <TableCell className="text-center">{product.quantity}</TableCell>
              <TableCell className="text-center">{product.price}</TableCell>
              <TableCell className="text-center">{product.cost_price}</TableCell>
              <TableCell className="text-center">{product.supplier.name}</TableCell>
              <TableCell className="text-center">{dateFormatter(product.created_at)}</TableCell>
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
