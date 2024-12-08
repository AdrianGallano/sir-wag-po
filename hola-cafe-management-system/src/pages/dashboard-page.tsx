// Custom
import ProfitAnalyticsCard from "@/components/analytics/profit-analytics-card";
import StockAnalyticsCard from "@/components/analytics/inventory-analytics";
import ExpensesAnalyticsCard from "@/components/analytics/expenses-analytics";
import RevenueAnalyticsCard from "@/components/analytics/revenue-analytics";
import { SideAnalytics } from "@/components/analytics/side-analytics";
import StockTable from "@/components/stock/stock-table";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Stock } from "@/models/stock";
import dataFetch from "@/services/data-service";
import { Supplier } from "@/models/supplier";
import { stocksColumns } from "@/components/columns";
import ServiceCrew from "@/models/service_crew";
import StockTableDashboard from "@/components/stock/stock-table-dashboard";
import UserLogTable from "@/components/stock/user-logs";
import { useNavigate } from "react-router-dom";

interface UserLog {
    id: string;
    user: ServiceCrew;
    description: string;
    object_data: {};
    created_at: string;
}

const DashboardPage = () => {
    /* 
    General Data Collection
    - Shows the immediate data of the application
    */
    const { token } = useAuth();
    const [stock, setStock] = useState<Stock[]>([]);
    const [userlogs, setUserLogs] = useState<UserLog[]>([]);

    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const navigate = useNavigate();

    const fetchStocks = async () => {
        try {
            const stocks = (await dataFetch(
                "api/image/is-stocked-by/supplier/stock/",
                "GET",
                {},
                token!
            )) as Stock[];
            setStock(stocks);
        } catch (error) {
            console.error("Failed to fetch stocks", error);
        }
    };

    const fetchUserLogs = async () => {
        try {
            const newLogs = await dataFetch("api/user-log/", "GET", {}, token!);
            setUserLogs(newLogs.reverse());
        } catch (error) {
            console.error("Failed to fetch user logs", error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        fetchStocks();
        fetchUserLogs();
    }, []);

    const handleEdit = (stock: Stock) => {
        setSelectedStock(stock);
        setIsEditPopupOpen(true);
    };

    const handleDelete = (stock: Stock) => {
        setSelectedStock(stock);
        setIsDeletePopupOpen(true);
    };


    return (
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
            <h3 className="text-2xl font-semibold tracking-tight">Dashboard</h3>
            <div className="grid grid-cols-4 gap-4">
                {" "}
                {/* first analytics 5 cards block  */}
                <StockAnalyticsCard date_range="Daily" />
                <ProfitAnalyticsCard date_range="Daily" />
                <ExpensesAnalyticsCard date_range="Daily" />
                <RevenueAnalyticsCard date_range="Daily" />
            </div>
            <div className="grid grid-cols-5 gap-4">
                {" "}
                {/* seconddd analytics 2 cards block  */}
                <div className="col-span-3">
                    <div className="w-full">
                        <StockTableDashboard
                            columns={[]}
                            data={stock}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <UserLogTable userlogs={userlogs} />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
