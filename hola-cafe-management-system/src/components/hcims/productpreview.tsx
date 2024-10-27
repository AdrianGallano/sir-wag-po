import { Product } from "@/models/product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toTitleCase } from "@/utils/formatter";

interface ProductPreviewProps {
  product: Product | null;
}

const ProductPreview = ({ product }: ProductPreviewProps) => {
  if (!product) return null;

  console.log(product);
  return (
    <div className="w-full">
      <SheetHeader>
        <SheetTitle>{toTitleCase(product.name)}</SheetTitle>
        <SheetDescription>{product.description}</SheetDescription>
      </SheetHeader>
    </div>
  );
};

export default ProductPreview;
