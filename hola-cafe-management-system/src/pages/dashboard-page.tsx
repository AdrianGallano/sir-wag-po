// Custom
import ProfitAnalyticsCard from "@/components/analytics/profit-analytics-card";
import RevenueAnalyticsCard from "@/components/analytics/revenue-analytics";
import BigExpensesAnalyticsCard from "@/components/analytics/big-expenses-analytics";
import ExpensesAnalyticsCard from "@/components/analytics/expenses-analytics";
import { SideAnalytics } from "@/components/analytics/side-analytics";
import BigRevenueAnalyticsCard from "@/components/analytics/big-revenue-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStockNotifications } from "@/hooks/useStockNotifications";
import { Toaster } from "sonner";
import BestSellingCard from "@/components/analytics/best-selling-card";
import LeastSellingCard from "@/components/analytics/least-selling-card";
import { Button } from "@/components/ui/button";
import DashboardPopup from "@/components/analytics/popup";
import { useState } from "react";
import { BookUser } from "lucide-react";

const DashboardPage = () => {
    /* 
    General Analytics Collection
    - Shows the general analytics of the application
    */
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div>
            <Tabs defaultValue="Daily">
                <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
                    <h3 className="text-2xl mt-5 font-semibold tracking-tight">
                        Dashboard
                    </h3>
                    <div className="flex justify-between">
                        <div className="flex gap-4 ">
                            {/* right side */}
                            <TabsList>
                                <TabsTrigger value="Daily">Daily</TabsTrigger>
                                <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                                <TabsTrigger value="Monthly">
                                    Monthly
                                </TabsTrigger>
                                <TabsTrigger value="Yearly">Yearly</TabsTrigger>
                            </TabsList>

                            {/* <DateDropdown /> */}
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <BookUser />
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="Daily">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {" "}
                            {/* first analytics 5 cards block  */}
                            <ProfitAnalyticsCard date_range="Daily" />
                            <ExpensesAnalyticsCard date_range="Daily" />
                            <RevenueAnalyticsCard date_range="Daily" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {" "}
                            {/* seconddd analytics 2 cards block  */}
                            <div className="col-span-2">
                                <BestSellingCard date_range="Daily" />
                            </div>
                            <div className="col-span-2">
                                <LeastSellingCard date_range="Daily" />
                            </div>
                            <div className="col-span-2">
                                <BigRevenueAnalyticsCard date_range="Daily" />
                            </div>
                            <div className="col-span-2">
                                <BigExpensesAnalyticsCard date_range="Daily" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Weekly">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {" "}
                            {/* first analytics 5 cards block  */}
                            <ProfitAnalyticsCard date_range="Weekly" />
                            <ExpensesAnalyticsCard date_range="Weekly" />
                            <RevenueAnalyticsCard date_range="Weekly" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {" "}
                            {/* seconddd analytics 2 cards block  */}
                            <div className="col-span-2">
                                <BestSellingCard date_range="Weekly" />
                            </div>
                            <div className="col-span-2">
                                <LeastSellingCard date_range="Weekly" />
                            </div>
                            <div className="col-span-2">
                                <BigRevenueAnalyticsCard date_range="Weekly" />
                            </div>
                            <div className="col-span-2">
                                <BigExpensesAnalyticsCard date_range="Weekly" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Monthly">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {" "}
                            {/* first analytics 5 cards block  */}
                            <ProfitAnalyticsCard date_range="Monthly" />
                            <ExpensesAnalyticsCard date_range="Monthly" />
                            <RevenueAnalyticsCard date_range="Monthly" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {" "}
                            <div className="col-span-2">
                                <BestSellingCard date_range="Monthly" />
                            </div>
                            <div className="col-span-2">
                                <LeastSellingCard date_range="Monthly" />
                            </div>
                            {/* seconddd analytics 2 cards block  */}
                            <div className="col-span-2">
                                <BigRevenueAnalyticsCard date_range="Monthly" />
                            </div>
                            <div className="col-span-2">
                                <BigExpensesAnalyticsCard date_range="Monthly" />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Yearly">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {" "}
                            {/* first analytics 5 cards block  */}
                            <ProfitAnalyticsCard date_range="Yearly" />
                            <ExpensesAnalyticsCard date_range="Yearly" />
                            <RevenueAnalyticsCard date_range="Yearly" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {" "}
                            <div className="col-span-2">
                                <BestSellingCard date_range="Yearly" />
                            </div>
                            <div className="col-span-2">
                                <LeastSellingCard date_range="Yearly" />
                            </div>
                            {/* seconddd analytics 2 cards block  */}
                            <div className="col-span-2">
                                <BigRevenueAnalyticsCard date_range="Yearly" />
                            </div>
                            <div className="col-span-2">
                                <BigExpensesAnalyticsCard date_range="Yearly" />
                            </div>
                        </div>
                    </TabsContent>
                </main>
            </Tabs>
            {
                <DashboardPopup
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            }
        </div>
    );
};

export default DashboardPage;
