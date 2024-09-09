import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '../models/products-interface';

interface InventoryPopUpProps {
  product: Product;
  onClose: () => void;
}

const InventoryPopUp: React.FC<InventoryPopUpProps> = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product : {product.product_name}</DialogTitle>
          <DialogDescription>
            Make changes to the product information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mb-4">
          <img
            src={product.product_image}
            alt={product.product_name}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input id="stock" defaultValue={product.stock} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock_status" className="text-right">
              Stock Status
            </Label>
            <Input id="stock_status" defaultValue={product.stock_status} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="retail_price" className="text-right">
              Retail Price
            </Label>
            <Input id="retail_price" defaultValue={product.retail_price} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wholesale_price" className="text-right">
              Wholesale Price
            </Label>
            <Input id="wholesale_price" defaultValue={product.wholesale_price} className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryPopUp;
