// Custom
import ProfitAnalyticsCard from "@/components/analytics/profit-analytics-card";
import StockAnalyticsCard from "@/components/analytics/inventory-analytics";
import ExpensesAnalyticsCard from "@/components/analytics/expenses-analytics";
import RevenueAnalyticsCard from "@/components/analytics/revenue-analytics";
import { BigAnalytics } from "@/components/analytics/big-analytics";
import { SideAnalytics } from "@/components/analytics/side-analytics";
import SearchInput from "@/components/search";
import ExportAnalytics from "@/components/analytics/export-analytics";
import DateDropdown from "@/components/analytics/date-dropdown-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsPage = () => {
    /* 
    General Analytics Collection
    - Shows the general analytics of the application
    */

    return (
        <Tabs defaultValue="Daily">
            <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
                <h3 className="text-2xl font-semibold tracking-tight">
                    Overview
                </h3>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        {/* right side */}
                        <TabsList>
                            <TabsTrigger value="Daily">Daily</TabsTrigger>
                            <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                            <TabsTrigger value="Monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="Yearly">Yearly</TabsTrigger>
                        </TabsList>
                        <DateDropdown />
                    </div>
                </div>
                <TabsContent value="Daily">
                    <div className="grid grid-cols-4 gap-4 mb-4">
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
                            <BigAnalytics />
                        </div>
                        <div className="col-span-2">
                            <SideAnalytics />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="Weekly">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {" "}
                        {/* first analytics 5 cards block  */}
                        <StockAnalyticsCard date_range="Weekly" />
                        <ProfitAnalyticsCard date_range="Weekly" />
                        <ExpensesAnalyticsCard date_range="Weekly" />
                        <RevenueAnalyticsCard date_range="Weekly" />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {" "}
                        {/* seconddd analytics 2 cards block  */}
                        <div className="col-span-3">
                            <BigAnalytics />
                        </div>
                        <div className="col-span-2">
                            <SideAnalytics />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="Monthly">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {" "}
                        {/* first analytics 5 cards block  */}
                        <StockAnalyticsCard date_range="Monthly" />
                        <ProfitAnalyticsCard date_range="Monthly" />
                        <ExpensesAnalyticsCard date_range="Monthly" />
                        <RevenueAnalyticsCard date_range="Monthly" />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {" "}
                        {/* seconddd analytics 2 cards block  */}
                        <div className="col-span-3">
                            <BigAnalytics />
                        </div>
                        <div className="col-span-2">
                            <SideAnalytics />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="Yearly">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {" "}
                        {/* first analytics 5 cards block  */}
                        <StockAnalyticsCard date_range="Yearly" />
                        <ProfitAnalyticsCard date_range="Yearly" />
                        <ExpensesAnalyticsCard date_range="Yearly" />
                        <RevenueAnalyticsCard date_range="Yearly" />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {" "}
                        {/* seconddd analytics 2 cards block  */}
                        <div className="col-span-3">
                            <BigAnalytics />
                        </div>
                        <div className="col-span-2">
                            <SideAnalytics />
                        </div>
                    </div>
                </TabsContent>
            </main>
        </Tabs>
    );
};

export default AnalyticsPage;
