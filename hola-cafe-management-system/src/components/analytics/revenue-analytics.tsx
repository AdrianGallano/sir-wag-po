import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Landmark } from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

const profitData = [
    { month: "January", revenue: 186 },
    { month: "February", revenue: 305 },
    { month: "March", revenue: 237 },
    { month: "April", revenue: 723 },
    { month: "May", revenue: 209 },
    { month: "June", revenue: 214 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",

    },

} satisfies ChartConfig

const RevenueAnalyticsCard = () => {
    /* Show the revenue in a analytic card */

    return (
        <Card className="flex items-center p-4">
            <Landmark
                className="bg-gray-300 p-2 rounded-full"
                size={36}
            />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Revenue</CardTitle>
                        <CardDescription>monthly revenue</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">₱110,120.50
                </CardContent>
            </div>
            <div className="h-16 w-24 flex">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={profitData}
                    >
                        <Line
                            dataKey="revenue"
                            type="natural"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </Card>
    )
}

export default RevenueAnalyticsCard