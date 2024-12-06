import { useEffect, useState } from "react";
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
import {
  Box,
  Boxes,
  ChevronDown,
  Download,
  Inbox,
  Search,
  Trash2,
} from "lucide-react";
import { Stock } from "@/models/stock";
import placeholder from "@/assets/images/no-order.png";
import StockPreview from "./stock-preview";
import { Label } from "../ui/label";

interface StockTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEdit: (stock: Stock) => void;
  onDelete: (stock: Stock) => void;
  onExport: () => void;
  oncallback?: () => void;
  onMassDeletion: (stock: Stock[]) => void;
}

const StockTable = ({
  columns,
  data,
  onExport,
  oncallback,
  onMassDeletion,
}: StockTableProps<Stock, any>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  const massDeletion = () => {
    const selectedRows = table.getSelectedRowModel().rows; // Only selected rows
    const selectedStocks = selectedRows.map((row) => row.original);
    onMassDeletion(selectedStocks);
    setRowSelection({});
  };

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  useEffect(() => {
    if (table.getSelectedRowModel().rows.length > 0) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 100);
    }
  }, [table.getSelectedRowModel().rows.length]);

  return (
    <div className="relative">
      <div className="w-full flex items-center justify-between mt-2">
        <div className="flex w-full justify-end item-center my-2.5 gap-2">
          <Input
            placeholder="Filter products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
          {table.getRowModel().rows.length != 0 && (
            <Button
              onClick={onExport}
              className="bg-white text-custom-char border border-custom-charcoalOlive hover:text-white text-sm hover:bg-custom-charcoalOlive rounded-full"
            >
              <Download className="w-5 h-5" />
              <span className="sr-only">Export Stocks</span>
            </Button>
          )}
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
                onClick={() => setSelectedStock(row.original as Stock)}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
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
                  <Boxes className="text-gray-400 text-6xl" />
                  <h2 className="mt-4 text-xl font-semibold text-gray-700">
                    No Stock Found
                  </h2>
                  <p className="mt-2 text-center text-gray-500">
                    It looks like we couldn’t find any stocks here. Start by
                    adding some new stocks to see them listed here.
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

      <div
        className={`fixed bottom-10 left-[40%] w-full border border-gray-700 rounded-xl z-20 flex justify-center items-center max-w-md 
          ${isVisible && "opacity-100 translate-y-0 animate-fadeinup"}`}
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        <div className="flex  items-center w-full justify-around gap-3 p-2">
          <p>
            {table.getSelectedRowModel().rows.length}{" "}
            {table.getSelectedRowModel().rows.length === 1 ? "item" : "items"}{" "}
            selected
          </p>
          <Button variant="destructive" onClick={massDeletion}>
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {selectedStock && (
        <StockPreview
          isOpen={!!selectedStock}
          selectedStock={selectedStock}
          stocks={data as Stock[]}
          onClose={() => setSelectedStock(null)}
          callback={oncallback}
        />
      )}
    </div>
  );
};

export default StockTable;
