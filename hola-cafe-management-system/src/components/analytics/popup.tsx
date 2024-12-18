import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
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
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { useEffect } from "react";

interface DashboardPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserLog {
    user: {
        username: string;
    };
    description: string;
    object_data: {};
    created_at: string;
}

const DashboardPopup: React.FC<DashboardPopupProps> = ({ isOpen, onClose }) => {
    const [userLogs, setUserLogs] = useState<UserLog[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth();

    async function fetchUserLogs(page: number) {
        try {
            const response = await dataFetch(
                `api/user/user-log/?page=${page}&ordering=-created_at`,
                "GET",
                {},
                token!
            );
            setUserLogs(response.results);
            setTotalPages(Math.ceil(response.count / 10)); // Assuming the API returns `total_pages`
        } catch (error) {
            console.error("Failed to fetch user logs", error);
        }
    }

    useEffect(() => {
        fetchUserLogs(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[1000px] h-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Log Details</DialogTitle>
                    <DialogDescription>
                        Details of the selected log.
                    </DialogDescription>
                </DialogHeader>

                <Table>
                    <TableCaption>A list of user logs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">
                                Username
                            </TableHead>
                            <TableHead>Activity</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userLogs.map((log, index) => (
                            <TableRow key={`${log.created_at}-${index}`}>
                                <TableCell>{log.user?.username}</TableCell>
                                <TableCell>{log.description}</TableCell>
                                <TableCell>
                                    {new Intl.DateTimeFormat("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }).format(new Date(log.created_at))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="mt-4 flex justify-end">
                    <Button
                        disabled={currentPage == 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    <Button
                        disabled={currentPage == totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DashboardPopup;
