import { Checkbox } from "@/components/ui/checkbox";
import { Stock } from "@/models/stock";
import { ColumnDef } from "@tanstack/react-table";
import { Supplier } from "@/models/supplier";
import { dateFormatter, toTitleCase } from "@/utils/formatter";
import { Image } from "@/models/image";
import placeholder from "../assets/images/hola_logo.jpg";
import {
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Product from "@/models/product";
import { Category } from "@/models/category";
import Transaction from "@/models/transaction";
import ServiceCrew from "@/models/service_crew";
import { StockTransaction } from "@/models/stock-transaction";

export const stocksColumns = (
  onEdit: (stock: Stock) => void,
  onDelete: (stock: Stock) => void,
  massDelete: (stock: Stock[]) => void
): ColumnDef<Stock>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={(e) => e.stopPropagation()}
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
      return <div className="text-center"> Image</div>;
    },
    cell: ({ row }) => {
      const image_obj = row.getValue("image");
      const image = image_obj as Image;

      return (
        <div className="flex justify-center">
          <img
            src={image?.image_url || placeholder}
            className="w-10 object-center h-10 rounded-sm"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-.5 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-.5 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-.5 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center ">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => {
      return <div className="text-center"> Name</div>;
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
        <div className="flex w-full justify-center">
          <div>Quantity</div>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center"> {row.getValue("quantity")}</div>;
    },
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <div
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Unit Price
          </div>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("unit_price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },

  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <div className="flex w-full justify-center">
  //       <div>Date Stored</div>
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const date: string = row.getValue("created_at");
  //     return (
  //       <div className="capitalize text-center">{dateFormatter(date)}</div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     const rowDate = new Date(row.getValue(id));
  //     const [startDate, endDate] = value;
  //     return rowDate >= startDate && rowDate <= endDate;
  //   },
  // },

  {
    accessorKey: "expiration_date",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
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
        </div>
      );
    },
    cell: ({ row }) => {
      const date: string | null = row.getValue("expiration_date");
      return (
        <div className="capitalize text-center">
          {date ? dateFormatter(date) : "N/A"}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = rowA.getValue(columnId);
      const dateB = rowB.getValue(columnId);

      // Ensure dateA and dateB are valid strings, numbers, or Date objects
      const parsedDateA =
        typeof dateA === "string" || typeof dateA === "number"
          ? new Date(dateA)
          : null;
      const parsedDateB =
        typeof dateB === "string" || typeof dateB === "number"
          ? new Date(dateB)
          : null;

      // Check for invalid dates
      const isDateAInvalid = !parsedDateA || isNaN(parsedDateA.getTime());
      const isDateBInvalid = !parsedDateB || isNaN(parsedDateB.getTime());

      // If both are invalid, keep the same order
      if (isDateAInvalid && isDateBInvalid) return 0;

      // If only dateA is invalid, move it to the bottom
      if (isDateAInvalid) return 1;

      // If only dateB is invalid, move it to the bottom
      if (isDateBInvalid) return -1;

      // Compare valid dates
      return parsedDateA.getTime() - parsedDateB.getTime();
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;

      // Check if rowDate is valid
      if (isNaN(rowDate.getTime())) {
        return false;
      }

      return rowDate >= startDate && rowDate <= endDate;
    },
  },

  {
    accessorKey: "supplier",
    header: () => {
      return <div className="text-center">Supplier</div>;
    },
    cell: ({ row }) => {
      const supplier: Supplier = row.getValue("supplier");
      return <div className="text-center">{toTitleCase(supplier.name)}</div>;
    },
  },

  {
    accessorKey: "is_stocked_by",
    header: () => {
      return <div className="text-center min-w-28">Is Stocked By</div>;
    },
    cell: ({ row }) => {
      const crew: ServiceCrew = row.getValue("is_stocked_by");
      return <div className="text-center">{toTitleCase(crew.username)}</div>;
    },
  },

  {
    accessorKey: "is_expired",
    header: () => <div className="text-center">Expired</div>,
    cell: ({ row }) => {
      const isExpired = row.getValue("is_expired");
      console.log("is expired", isExpired);
      return <div className="text-center">{isExpired ? "Yes" : "No"}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));
      const isExpired = row.getValue("is_expired");
      console.log("Expired?", isExpired);
      let status = "In Stock";
      let bgColor = "bg-green-500";

      if (quantity === 0) {
        status = "Out of Stock";
        bgColor = "bg-red-500";
      } else if (quantity <= 20) {
        status = "Low Stock";
        bgColor = "bg-yellow-500";
      }

      if (isExpired) {
        status = "Expired";
        bgColor = "bg-gray-500";
      }

      return (
        <div className="flex items-center space-x-2">
          <div className={`rounded-full w-[50px] h-2 ${bgColor}`} />
          <span className="text-sm font-medium sr-only">{status}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="text-center"></div>,
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit(stock);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(stock);
              }}
            >
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
  onDelete: (supplier: Supplier) => void,
  massDelete: (supplier: Supplier[]) => void
): ColumnDef<Supplier>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
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
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supplier ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center ">{row.getValue("id")}</div>;
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
      const supplier = row.original;

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
            <DropdownMenuItem onClick={() => onEdit(supplier)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(supplier)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const productColumns = (
  onEdit: (prodoct: Product) => void,
  onDelete: (product: Product) => void,
  massDelete: (product: Product[]) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
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
      return <div className="text-center min-w-28">Product Image</div>;
    },
    cell: ({ row }) => {
      const image_obj = row.getValue("image");
      const image = image_obj as Image;

      return (
        <div className="flex justify-center">
          <img
            src={image?.image_url || placeholder}
            className="w-10 object-center h-10 rounded-sm"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => {
      return <div className="text-center min-w-28">Product Name</div>;
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="text-center">{toTitleCase(name)}</div>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex min-w-28 justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center "
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
        </div>
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

  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => (
  //     <div className="flex min-w-28 justify-center">
  //       <Button
  //         variant={"ghost"}
  //         className="inline-flex justify-center text-center"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Date Shelved
  //         {column.getIsSorted() === "desc" ? (
  //           <ArrowDownIcon className="ml-2 h-4 w-4" />
  //         ) : column.getIsSorted() === "asc" ? (
  //           <ArrowUpIcon className="ml-2 h-4 w-4" />
  //         ) : (
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         )}
  //       </Button>
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const date: string = row.getValue("created_at");
  //     return (
  //       <div className="capitalize text-center">{dateFormatter(date)}</div>
  //     );
  //   },
  //   // filterFn: (row, id, value) => {
  //   //   const rowDate = new Date(row.getValue(id));
  //   //   const [startDate, endDate] = value;
  //   //   return rowDate >= startDate && rowDate <= endDate;
  //   // },
  // },

  {
    accessorKey: "category",
    header: () => {
      return <h1 className="text-center min-w-28">Category</h1>;
    },
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return <div className="text-center">{toTitleCase(category.name)}</div>;
    },
  },

  {
    accessorKey: "actions",
    header: "",
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

export const transactionColumns = (
  onDelete: (transaction: Transaction) => void,
  massDelete: (transaction: Transaction[]) => void
): ColumnDef<Transaction>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Transaction ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <div className="min-w-28 flex justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Price
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("total_price"));
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
      <div className="min-w-28 flex justify-center">
        <Button
          variant={"ghost"}
          className="inline-flex justify-center text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
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
    accessorKey: "service_crew",
    header: () => {
      return <div className="text-center min-w-28">Service Crew</div>;
    },
    cell: ({ row }) => {
      const service_crew: ServiceCrew = row.getValue("service_crew");
      return (
        <div className="text-center">{toTitleCase(service_crew.username!)}</div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="text-center"></div>,
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(transaction);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const stockTransactionColumns = (
  onDelete: (transaction: StockTransaction) => void,
  massDelete: (transaction: StockTransaction[]) => void
): ColumnDef<StockTransaction>[] => [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected()
  //           ? true
  //           : table.getIsSomePageRowsSelected()
  //           ? "indeterminate"
  //           : false
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onClick={(e) => e.stopPropagation()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Transaction ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "stock_used",
    header: ({ column }) => {
      return (
        <div className="min-w-28 flex justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center "
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Stocks Used
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const stockUsedArray = row.getValue("stock_used") as {
        id: number;
      }[];

      const totalStockItemsUsed = stockUsedArray.length;

      return (
        <div className="text-center font-medium">
          {totalStockItemsUsed} {stockUsedArray.length > 1 ? "items" : "item"}
        </div>
      );
    },
  },

  {
    accessorKey: "stock_used",
    header: ({ column }) => {
      return (
        <div className="min-w-28 flex justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center "
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
        </div>
      );
    },
    cell: ({ row }) => {
      const stockUsedArray = row.getValue("stock_used") as {
        quantity: number;
      }[];

      const totalStockUsed = stockUsedArray.reduce(
        (total, stockUsed) => total + stockUsed.quantity,
        0
      );

      return <div className="text-center font-medium">{totalStockUsed}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div className="min-w-28 flex justify-center">
        <Button
          variant={"ghost"}
          className="inline-flex justify-center text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
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
    accessorKey: "service_crew",
    header: () => {
      return <div className="text-center min-w-28">Service Crew</div>;
    },
    cell: ({ row }) => {
      const service_crew: ServiceCrew = row.getValue("service_crew");
      return (
        <div className="text-center">{toTitleCase(service_crew.username!)}</div>
      );
    },
  },

  // {
  //   accessorKey: "actions",
  //   header: () => <div className="text-center"></div>,
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const transaction = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>

  //           <DropdownMenuItem
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               onDelete(transaction);
  //             }}
  //           >
  //             Delete
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export const categoryColumns = (
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void,
  massDelete: (categories: Category[]) => void
): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false
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
    header: ({ column }) => {
      return (
        <div className="flex w-full justify-center">
          <Button
            variant={"ghost"}
            className="inline-flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category ID
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },

  {
    accessorKey: "name",
    header: () => {
      return <div className="text-center min-w-28">Category Name</div>;
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");

      return <div className="text-center">{toTitleCase(name)}</div>;
    },
  },

  {
    accessorKey: "description",
    header: () => {
      return <div className="text-center min-w-28">Description</div>;
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description");

      return <div className="text-center">{toTitleCase(description)}</div>;
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <div className="min-w-28 flex justify-center">
        <Button
          variant={"ghost"}
          className="inline-flex justify-center text-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Creation
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");
      return (
        <div className="capitalize text-center ">{dateFormatter(date)}</div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="text-center"></div>,
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

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
            <DropdownMenuItem onClick={() => onEdit(category)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(category)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
