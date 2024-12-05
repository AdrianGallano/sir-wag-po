import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, Notebook, ReceiptText } from "lucide-react";
import placeholder from "@/assets/images/no-order.png";
import Transaction from "@/models/transaction";
import TransactionPreview from "./transaction-preview";

interface TransactionTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: (transaction: Transaction) => void;
  onExport: () => void;
}

const TransactionTable = ({
  columns,
  data,
  onExport,
}: TransactionTableProps<Transaction, any>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="relative">
      <div className="w-full flex justify-between items-center mt-2 ">
        <Button
          onClick={onExport}
          className="bg-white text-custom-char border border-custom-charcoalOlive hover:text-white text-sm hover:bg-custom-charcoalOlive"
        >
          Export Transactions
        </Button>
        <div className="flex w-full justify-end item-center my-2.5 gap-2">
          <Input
            placeholder="Search by service crew"
            value={
              (table.getColumn("service_crew")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("service_crew")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm rounded-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <span>Filter by type</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="mb-14">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                onClick={() =>
                  setSelectedTransaction(row.original as Transaction)
                }
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {!table.getRowModel().rows.length && (
        <div>
          <div className="flex justify-center w-full text-center">
            <div className="flex items-center justify-center h-full w-full">
              <div className=" w-full max-w-md mx-auto  ">
                <div className="flex flex-col items-center">
                  <ReceiptText className="text-gray-400 text-6xl" />
                  <h2 className="mt-4 text-xl font-semibold text-gray-700">
                    No Transaction Found
                  </h2>
                  <p className="mt-2 text-center text-gray-500">
                    It looks like we couldn’t find any transactions here. Start
                    by adding some new transactions to see them listed here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {table.getRowModel().rows.length > 0 && (
        <div className="bg-white fixed bottom-0  flex items-center  justify-between min-w-full py-4 z-10">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          <div className="mr-24">
            <span className="font-medium text-sm">
              {" "}
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
          </div>
        </div>
      )}

      {selectedTransaction && (
        <TransactionPreview
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionTable;
