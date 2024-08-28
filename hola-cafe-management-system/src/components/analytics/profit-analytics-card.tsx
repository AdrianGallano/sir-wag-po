import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { PhilippinePeso } from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

const profitData = [
    { month: "January", profit: 186 },
    { month: "February", profit: 305 },
    { month: "March", profit: 237 },
    { month: "April", profit: 73 },
    { month: "May", profit: 209 },
    { month: "June", profit: 214 },
]

const chartConfig = {
    profit: {
        label: "Profit",

    },

} satisfies ChartConfig

const ProfitAnalyticsCard = () => {
    /* Show the profit in a analytic card */

    return (
        <Card className="flex items-center p-4">
            <PhilippinePeso
                className="bg-gray-300 p-2 rounded-full"
                size={36}
            />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Profit</CardTitle>
                        <CardDescription>monthly profit</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">₱50,120.50
                </CardContent>
            </div>
            <div className="h-16 w-24 flex">
                <ChartContainer  config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={profitData}
                    >
                        <Line
                            dataKey="profit"
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

export default ProfitAnalyticsCard