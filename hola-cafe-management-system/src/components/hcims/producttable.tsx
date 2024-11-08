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
import placeholder from "./../../assets/images/hola_logo.jpg";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import ProductPreview from "./productpreview";
import CategoryPreview from "./categorypreview";
import SupplierPreview from "./supplierpreview";

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

const ProductTable = ({
  products,
  categories,
  suppliers,
  onproductDeleted,
  onproductUpdated,
  onCategoryDeleted,
  onCategoryUpdated,
  onSupplierDeleted,
  onSupplierUpdated,
}: ProductTableProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | Category | Supplier | null>(null);
  const [selectedTable, setSelectedTable] = useState<"products" | "categories" | "suppliers">("products");

  const closeSheet = () => {
    setSelectedItem(null);
    console.log("Closing preview");
  };

  useEffect(() => {
    console.log("Selected table: ", selectedItem);
  }, [selectedItem]);

  // Helper function to handle column truncation for longer text
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      {/* Dropdown to switch tables */}
      <div className="flex justify-end">
      <Select value={selectedTable} onValueChange={(value) => setSelectedTable(value as "products" | "categories" | "suppliers")}>
        <SelectTrigger className="mb-4 p-2 border border-gray-300 rounded mr-24 w-[180px]">
          <SelectValue placeholder="Select a table" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tables</SelectLabel>
            <SelectItem value="products">Products</SelectItem>
            {/* <SelectItem value="categories">Categories</SelectItem> */}
            <SelectItem value="suppliers">Suppliers</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

      {/* Table content */}
      {selectedTable === "products" && (
        <Table className="overflow-hidden rounded-md w-full shadow-md">
          <TableHeader className="bg-custom-sunnyGold hover:bg-custom-paleButter">
            <TableRow>
              <TableHead className=" text-custom-charcoalOlive ">Items</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Quantity</TableHead>
              <TableHead className=" text-custom-charcoalOlive">Price</TableHead>
              <TableHead className=" text-custom-charcoalOlive">Cost Price</TableHead>
              <TableHead className=" text-custom-charcoalOlive">Supplier</TableHead>
              <TableHead className=" text-custom-charcoalOlive">Expiration Date</TableHead>
              <TableHead className=" text-custom-charcoalOlive"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {products.map((product) => (
              <TableRow key={product.id} className="border border-gray-300">
                <TableCell className="font-medium flex items-center gap-1 px-6 py-4">
                  <img
                    src={product.image?.image_url || placeholder}
                    alt={product.name}
                    className="w-12 object-center rounded-sm"
                  />
                  <span className="md:text-base sm:text-sm ">{toTitleCase(product.name)}</span>
                </TableCell>
                <TableCell className="md:text-base sm:text-sm">{product.quantity}</TableCell>
                <TableCell className="md:text-base sm:text-sm">{product.price}</TableCell>
                <TableCell className="md:text-base sm:text-sm">{product.cost_price}</TableCell>
                <TableCell className="md:text-base sm:text-sm">{product.supplier.name}</TableCell>
                <TableCell className="md:text-base sm:text-sm">{dateFormatter(product.expiration_date)}</TableCell>
                <TableCell>
                  <Sheet open={!!selectedItem} onOpenChange={(open) => !open && closeSheet()}>
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

      {selectedTable === "categories" && (
        <Table className="overflow-hidden rounded-md w-full shadow-md">
          <TableHeader className="bg-custom-sunnyGold hover:bg-custom-paleButter">
            <TableRow>
              <TableHead className=" text-custom-charcoalOlive ">Name</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Description</TableHead>
              <TableHead className=" text-custom-charcoalOlive"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {categories.map((category) => (
              <TableRow key={category.id} className="border border-gray-300">
                <TableCell className="font-medium px-6 py-4">
                  {truncateText(category.name, 20)}
                </TableCell>
                <TableCell className="font-medium px-6 py-4">
                  {truncateText(category.description, 40)}
                </TableCell>
                <TableCell>
                  <Sheet open={!!selectedItem} onOpenChange={(open) => !open && closeSheet()}>
                    <SheetTrigger asChild>
                      <Button
                        onClick={() => {
                          console.log("Selected Category: ", category);
                          setSelectedItem(category);
                        }}
                        className="border border-custom-sunnyGold hover:bg-custom-sunnyGold bg-white hover:text-white py-2 px-3"
                      >
                        <EyeIcon className="w-5 text-black " />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="min-w-[35%] min-h-screen overflow-y-scroll">
                      <CategoryPreview
                        category={selectedItem as Category}
                        onClose={closeSheet}
                        onCategoryDeleted={onCategoryDeleted}
                        onCategoryUpdated={onCategoryUpdated}
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
          <TableHeader className="bg-custom-sunnyGold hover:bg-custom-paleButter">
            <TableRow>
              <TableHead className=" text-custom-charcoalOlive ">Name</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Contact Person</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Phone Number</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Address</TableHead>
              <TableHead className=" text-custom-charcoalOlive ">Email</TableHead>
              <TableHead className=" text-custom-charcoalOlive"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white ">
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="border border-gray-300">
                <TableCell className="font-medium px-6 py-4">{supplier.name}</TableCell>
                <TableCell className="font-medium px-6 py-4">{supplier.contact_person}</TableCell>
                <TableCell className="font-medium px-6 py-4">{supplier.phone_number}</TableCell>
                <TableCell className="font-medium px-6 py-4">{supplier.address}</TableCell>
                <TableCell className="font-medium px-6 py-4">{supplier.email}</TableCell>
                <TableCell>
                  <Sheet open={!!selectedItem} onOpenChange={(open) => !open && closeSheet()}>
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
      )}
    </>
  );
};

export default ProductTable;
