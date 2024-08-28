import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { User2 } from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

const profitData = [
    { month: "January", customer: 500 },
    { month: "February", customer: 700 },
    { month: "March", customer: 1700 },
    { month: "April", customer: 2700 },
    { month: "May", customer: 3700 },
    { month: "June", customer: 4700 },
]

const chartConfig = {
    customer: {
        label: "Customer",

    },

} satisfies ChartConfig

const CustomerAnalyticsCard = () => {
    /* Show the customer in a analytic card */

    return (
        <Card className="flex items-center justify-between p-4">
            <User2
                className="bg-gray-300 p-2 rounded-full"
                size={30}
            />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Customer</CardTitle>
                        <CardDescription>monthly customer</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">5271 avg
                </CardContent>
            </div>
            <div className="h-16 w-16">
                <ChartContainer className="translate-y-1/2" config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={profitData}
                    >
                        <Line
                            dataKey="customer"
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

export default CustomerAnalyticsCard