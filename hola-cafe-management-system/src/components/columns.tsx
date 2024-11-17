import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import { Supplier } from "@/models/supplier";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Image } from "@/models/image";
import placeholder from "./../assets/images/placeholder.png";
import { ArrowDownIcon, ArrowUpDown, ArrowUpIcon, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";

export const productColumns: ColumnDef<Product>[] = [
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
    header: "Stock Image",
    cell: ({ row }) => {
      const image_obj = row.getValue("image");
      const image = image_obj as Image;

      return (
        <div className="flex justify-center">
          <img
            src={image?.image_url || placeholder}
            className="w-11 object-center rounded-sm"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">Stock ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="text-center">Product Name</div>,
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
          className="inline-flex"
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
          className="inline-flex"
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
        className="inline-flex"
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
        <div className="flex items-center">
          <span className="capitalize">{dateFormatter(date)}</span>
        </div>
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
        <div className="flex items-center">
          <span className="capitalize">{dateFormatter(date)}</span>
        </div>
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
    header: () => <div className="text-center">is Stocked By</div>,
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
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" className="text-blue-500">
            Edit
          </Button>
          <Button variant="ghost" className="text-red-500">
            Delete
          </Button>
        </div>
      );
    },
  },
];

export const supplierColumns: ColumnDef<Supplier>[] = [
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
    header: "Stock Image",
    cell: ({ row }) => {
      const image_obj = row.getValue("image");
      const image = image_obj as Image;

      return (
        <div className="flex justify-center">
          <img
            src={image?.image_url || placeholder}
            className="w-11 object-center rounded-sm"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">Stock ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="text-center">Product Name</div>,
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
          className="inline-flex"
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
          className="inline-flex"
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
        className="inline-flex"
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
        <div className="flex items-center">
          <span className="capitalize">{dateFormatter(date)}</span>
        </div>
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
        <div className="flex items-center">
          <span className="capitalize">{dateFormatter(date)}</span>
        </div>
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
    header: () => <div className="text-center">is Stocked By</div>,
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
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" className="text-blue-500">
            Edit
          </Button>
          <Button variant="ghost" className="text-red-500">
            Delete
          </Button>
        </div>
      );
    },
  },
];
