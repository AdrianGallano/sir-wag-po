import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Stock Image",
  },

  {
    accessorKey: "id",
    header: "Stock ID",
  },

  {
    accessorKey: "name",
    header: "Stock Name",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "price",
    header: "Unit Price",
  },

  {
    accessorKey: "date",
    header: "Date Shelved",
  },

  {
    accessorKey: "expiration_date",
    header: "Expiration Date",
  },

  {
    accessorKey: "supplier",
    header: "is Stocked By",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
];
