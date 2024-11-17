import { Product } from "@/models/product";
import { Category } from "@/models/category";
import { Supplier } from "@/models/supplier";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import placeholder from "./../../assets/images/placeholder.png";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Button } from "../ui/button";
import { Dice1, EyeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ProductPreview from "./productpreview";
import SupplierPreview from "./supplierpreview";
import SearchInput from "../search";
import DemoPage from "./product_table/page";
import { Checkbox } from "../ui/checkbox";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  onproductDeleted: () => void;
  onproductUpdated: () => void;
  onCategoryDeleted: () => void;
  onCategoryUpdated: () => void;
  onSupplierDeleted: () => void;
  onSupplierUpdated: () => void;
}

const ProductTablee = ({
  products,
  categories,
  suppliers,
  onproductDeleted,
  onproductUpdated,
  onSupplierDeleted,
  onSupplierUpdated,
}: ProductTableProps) => {
  return (
    <main className="w-full">
      {/* Dropdown to switch tables */}
      <div className="float-end flex items-center my-3.5 gap-2">
        <SearchInput />
        <Select>
          <SelectTrigger className="px-4 border border-gray-300 rounded-full w-[180px] ">
            <SelectValue placeholder="Filtered by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="products">Filter 1</SelectItem>
              <SelectItem value="suppliers">Filter 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="w-full border-none hover:bg-none">
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Stock Image
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Stock Id
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Name
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Quantity
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Unit Price
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Date Shelved
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Expiration Date
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                is Stocked By
              </TableHead>
              <TableHead className="text-center font-semibold text-custom-char">
                Status
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white mt-4 w-full">
            {products.map((product) => (
              <TableRow className="border  border-black p-3.5  hover:bg-none data-[state=selected]:bg-none">
                <TableCell className="my-10">
                  <Checkbox />
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  Image
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  #3123
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  Name Here
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  20
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  10
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  September 10, 2024
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  January 28, 2026
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  Dominic Molino
                </TableCell>
                <TableCell className="text-center font-normal text-custom-char">
                  status here
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table content */}
      {/* {selectedTable === "products" && (
        <Table className="overflow-hidden rounded-md w-full shadow-md">
          <TableHeader className="bg-custom-sunnyGold hover:bg-custom-sunnyGold">
            <TableRow>
              <TableHead className=" text-custom-charcoalOlive ">
                Items
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive ">
                Quantity
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive">
                Price
              </TableHead>
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
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-3 px-6 py-4">
                  <img
                    src={product.image?.image_url || placeholder}
                    alt={product.name}
                    className="w-11 object-center rounded-sm"
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
                    onOpenChange={(open) => !open && closeSheet()}
                  >
                    <SheetTrigger asChild>
                      <Button
                        onClick={() => setSelectedItem(product)}
                        className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3"
                      >
                        <EyeIcon className="w-5 text-black " />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-[35%] min-h-screen overflow-y-scroll">
                      <ProductPreview
                        product={selectedItem as Product}
                        onClose={closeSheet}
                        onproductDeleted={onproductDeleted}
                        onproductUpdated={onproductUpdated}
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
      )}

      {selectedTable === "suppliers" && (
        <Table className="overflow-hidden rounded-md w-full shadow-md">
          <TableHeader className="bg-custom-sunnyGold hover:bg-custom-sunnyGold">
            <TableRow>
              <TableHead className=" text-custom-charcoalOlive ">
                Name
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive ">
                Contact Person
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive ">
                Phone Number
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive ">
                Address
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive ">
                Email
              </TableHead>
              <TableHead className=" text-custom-charcoalOlive"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="border border-gray-300">
                <TableCell className="font-medium px-6 py-4">
                  {supplier.name}
                </TableCell>
                <TableCell className="font-medium px-6 py-4">
                  {supplier.contact_person}
                </TableCell>
                <TableCell className="font-medium px-6 py-4">
                  {supplier.phone_number}
                </TableCell>
                <TableCell className="font-medium px-6 py-4">
                  {supplier.address}
                </TableCell>
                <TableCell className="font-medium px-6 py-4">
                  {supplier.email}
                </TableCell>
                <TableCell>
                  <Sheet
                    open={!!selectedItem}
                    onOpenChange={(open) => !open && closeSheet()}
                  >
                    <SheetTrigger asChild>
                      <Button
                        onClick={() => setSelectedItem(supplier)}
                        className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3"
                      >
                        <EyeIcon className="w-5 text-black " />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-[35%] min-h-screen overflow-y-scroll">
                      <SupplierPreview
                        supplier={selectedItem as Supplier}
                        onClose={closeSheet}
                        onSupplierDeleted={onSupplierDeleted}
                        onSupplierUpdated={onSupplierUpdated}
                      />
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )} */}
    </main>
  );
};

export default ProductTablee;
