import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import { Supplier } from "@/models/supplier";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Image } from "@/models/image";
import placeholder from "./../assets/images/placeholder.png";
import {
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  MoreHorizontal,
  SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const productColumns = (
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "image",
    header: () => {
      return <div className="text-center min-w-28">Stock Image</div>;
    },
    cell: ({ row }) => {
      const image_obj = row.getValue("image");
      const image = image_obj as Image;

      return (
        <div className="flex justify-center">
          <img
            src={image?.image_url || placeholder}
            className="w-10 object-center rounded-sm"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: () => {
      return <div className="text-center min-w-28">Stock ID</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => {
      return <div className="text-center min-w-28">Stock Name</div>;
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="text-center">{toTitleCase(name)}</div>;
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          className="inline-flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center"> {row.getValue("quantity")}</div>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          className="inline-flex items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="inline-flex justify-center text-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Shelved
        {column.getIsSorted() === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");
      return (
        <div className="capitalize text-center">{dateFormatter(date)}</div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },

  {
    accessorKey: "expiration_date",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        className="inline-flex"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expiration Date
        {column.getIsSorted() === "desc" ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("expiration_date");
      return (
        <div className="capitalize text-center">{dateFormatter(date)}</div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },

  {
    accessorKey: "supplier",
    header: () => {
      return <div className="text-center min-w-28">Stock Image</div>;
    },
    cell: ({ row }) => {
      const supplier: Supplier = row.getValue("supplier");
      return <div className="text-center">{toTitleCase(supplier.name)}</div>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className=" rounded-full w-[50px] h-2 bg-green-500"></div>;
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(product)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const supplierColumns = (
  onEdit: (supplier: Supplier) => void,
  onDelete: (supplier: Supplier) => void
): ColumnDef<Supplier>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">Supplier ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="text-center">{toTitleCase(name)}</div>;
    },
  },

  {
    accessorKey: "phone_number",
    header: () => <div className="text-center">Contact Number</div>,
    cell: ({ row }) => {
      const number: string = row.getValue("phone_number");

      return <div className="text-center">{number}</div>;
    },
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("email");

      return <div className="text-center">{name}</div>;
    },
  },

  {
    accessorKey: "address",
    header: () => <div className="text-center">Address</div>,
    cell: ({ row }) => {
      const name: string = row.getValue("address");

      return <div className="text-center">{name}</div>;
    },
  },

  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(product)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
