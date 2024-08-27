import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ShoppingBasket } from "lucide-react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

const stockData = [
    { month: "January", stock: 305 },
    { month: "February", stock: 237 },
    { month: "March", stock: 214 },
    { month: "April", stock: 209 },
    { month: "May", stock: 120 },
    { month: "June", stock: 100 },
]

const chartConfig = {
    stock: {
        label: "Stock",

    },

} satisfies ChartConfig

const StockAnalyticsCard = () => {
    /* Show the stock in a analytic card */

    return (
        <Card className="flex items-center justify-between p-4 red">
            <ShoppingBasket
                className="bg-gray-300 p-2 rounded-full"
                size={30}
            />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Stock</CardTitle>
                        <CardDescription>monthly stock</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">100 avg
                </CardContent>
            </div>
            <div className="h-16 w-16">
                <ChartContainer className="translate-y-1/2" config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={stockData}
                    >
                        <Line
                            dataKey="stock"
                            type="natural"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </Card>
    )
}

export default StockAnalyticsCard