// Custom
import ProfitAnalyticsCard from "@/components/analytics/profit-analytics-card"
import StockAnalyticsCard from "@/components/analytics/inventory-analytics"
import CustomerAnalyticsCard from "@/components/analytics/customer-analytics"
import RevenueAnalyticsCard from "@/components/analytics/revenue-analytics"

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
            <div className="grid grid-cols-4 gap-4"> {/* first analytics 5 cards block  */}
                <StockAnalyticsCard />
                <ProfitAnalyticsCard />
                <CustomerAnalyticsCard />
                <RevenueAnalyticsCard />
            </div>
        </main>
    )
}

export default AnalyticsPage