import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardPopup from "./popup";

export const AnalyticsTable = () => {
    const Logs = [
        { logs: "1", date: "12/12/2021", activity: "Modify shit" },
        { logs: "2", date: "12/12/2021", activity: "Add shit" },
        { logs: "3", date: "12/12/2021", activity: "Release shit" },
        { logs: "4", date: "12/12/2021", activity: "Mamamo shit" },
        { logs: "5", date: "12/13/2021", activity: "Cleanup shit" },
        { logs: "6", date: "12/14/2021", activity: "Analyze shit" },
        { logs: "7", date: "12/15/2021", activity: "Test shit" },
        { logs: "8", date: "12/16/2021", activity: "Deploy shit" },
        { logs: "9", date: "12/17/2021", activity: "Debug shit" },
        { logs: "10", date: "12/18/2021", activity: "Plan shit" },
        { logs: "11", date: "12/19/2021", activity: "Refactor shit" },
        { logs: "12", date: "12/20/2021", activity: "Design shit" },
        { logs: "13", date: "12/21/2021", activity: "Document shit" },
        { logs: "14", date: "12/22/2021", activity: "Review shit" },
        { logs: "15", date: "12/23/2021", activity: "Approve shit" },
        { logs: "16", date: "12/24/2021", activity: "Reject shit" },
        { logs: "17", date: "12/25/2021", activity: "Fix shit" },
        { logs: "18", date: "12/26/2021", activity: "Optimize shit" },
        { logs: "19", date: "12/27/2021", activity: "Merge shit" },
        { logs: "20", date: "12/28/2021", activity: "Release new shit" },
        { logs: "21", date: "12/29/2021", activity: "Brainstorm shit" },
        { logs: "22", date: "12/30/2021", activity: "Schedule shit" },
        { logs: "23", date: "12/31/2021", activity: "Organize shit" },
        { logs: "24", date: "01/01/2022", activity: "Start new shit" },
        { logs: "25", date: "01/02/2022", activity: "Evaluate shit" },
        { logs: "26", date: "01/03/2022", activity: "Monitor shit" },
        { logs: "27", date: "01/04/2022", activity: "Audit shit" },
        { logs: "28", date: "01/05/2022", activity: "Launch shit" },
        { logs: "29", date: "01/06/2022", activity: "Scale shit" },
        { logs: "30", date: "01/07/2022", activity: "Celebrate shit" },
      ];      

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(Logs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedLogs = Logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedLog, setSelectedLog] = useState<{ logs: string; date: string; activity: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (log: { logs: string; date: string; activity: string }) => {
    setSelectedLog(log);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of user logs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logs</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLogs.map((log) => (
            <TableRow
              key={log.logs}
              onClick={() => handleRowClick(log)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{log.logs}</TableCell>
              <TableCell>{log.date}</TableCell>
              <TableCell>{log.activity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedLog && (
        <DashboardPopup
          isOpen={isDialogOpen}
          log={selectedLog}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className={currentPage === 1 ? "disabled" : ""}
            />
            </PaginationItem>
            <PaginationItem>
            <PaginationLink
                onClick={() => handlePageChange(1)}
                isActive={currentPage === 1}
            >
                1
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink
                onClick={() => handlePageChange(2)}
                isActive={currentPage === 2}
            >
                2
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
            <PaginationLink
                onClick={() => handlePageChange(3)}
                isActive={currentPage === 3}
            >
                3
            </PaginationLink>
            </PaginationItem>
            {totalPages > 3 && (
            <>
                <PaginationItem>
                <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                <PaginationLink
                    onClick={() => handlePageChange(totalPages)}
                    isActive={currentPage === totalPages}
                >
                    {totalPages}
                </PaginationLink>
                </PaginationItem>
            </>
            )}
            <PaginationItem>
            <PaginationNext
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                className={currentPage === totalPages ? "disabled" : ""}
            />
            </PaginationItem>
        </PaginationContent>
    </Pagination>

    </>
  );
};
