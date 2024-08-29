// Custom
import ProfitAnalyticsCard from "@/components/analytics/profit-analytics-card"
import StockAnalyticsCard from "@/components/analytics/inventory-analytics"
import CustomerAnalyticsCard from "@/components/analytics/customer-analytics"
import RevenueAnalyticsCard from "@/components/analytics/revenue-analytics"
import { BigAnalytics } from "@/components/analytics/big-analytics"
import { SideAnalytics } from "@/components/analytics/side-analytics"
import SearchInput from "@/components/search"
import ExportAnalytics from "@/components/analytics/export-analytics"
import DateTabs from "@/components/analytics/date-tabs-analytics"
import DateDropdown from "@/components/analytics/date-dropdown-analytics"

const AnalyticsPage = () => {
    /* 
    General Analytics Collection
    - Shows the general analytics of the application
    */


    return (
        <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
            <h3 className="text-2xl font-semibold tracking-tight">
                Overview
            </h3>
            <div className="flex justify-between">
                <SearchInput />
                <div className="flex gap-4">{/* right side */}
                    <DateTabs />
                    <ExportAnalytics />
                    <DateDropdown />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4"> {/* first analytics 5 cards block  */}
                <StockAnalyticsCard />
                <ProfitAnalyticsCard />
                <CustomerAnalyticsCard />
                <RevenueAnalyticsCard />
            </div>
            <div className="grid grid-cols-5 gap-4"> {/* seconddd analytics 2 cards block  */}
                <div className="col-span-3">
                    <BigAnalytics />
                </div>
                <div className="col-span-2">
                    <SideAnalytics />
                </div>
            </div>
        </main>
    )
}

export default AnalyticsPage