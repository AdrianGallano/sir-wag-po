import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Landmark } from "lucide-react";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

const chartConfig = {
    price_sold: {
        label: "price_sold",
    },
} satisfies ChartConfig;

interface RevenueData {
    price_sold: number;
    sold_at: string;
    payment_method: string;
}

interface Revenue {
    revenue: number;
    data: {};
}

const RevenueAnalyticsCard = ({ date_range }: { date_range: string }) => {
    /* Show the revenue in a analytic card */
    const [revenue, setRevenue] = useState<Revenue>();
    const [revenueData, setRevenueData] = useState<RevenueData[]>();
    const { token } = useAuth();

    async function fetchRevenue(date: string) {
        try {
            const response = await dataFetch(
                `api/analytics/${date}/revenue/`,
                "GET",
                {},
                token!
            );

            setRevenue(response);
            setRevenueData(response.data);

            (revenueData as RevenueData[]).forEach((rev) => {
                rev.sold_at = new Date(rev.sold_at).toLocaleDateString();
            });
        } catch (error) {
            console.error("Failed to fetch revenue", error);
        }
    }

    async function revenueSelection(date_range: string) {
        switch (date_range) {
            case "Daily":
                await fetchRevenue("day");
                break;
            case "Weekly":
                await fetchRevenue("week");
                break;
            case "Monthly":
                await fetchRevenue("month");
                break;
            case "Yearly":
                await fetchRevenue("year");
                break;
        }
    }

    useEffect(() => {
        const asyncFetchRevenue = async () => {
            await revenueSelection(date_range);
        };
        asyncFetchRevenue();
    }, [date_range]);

    return (
        <Card className="flex items-center p-4">
            <Landmark className="bg-gray-300 p-2 rounded-full" size={36} />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Revenue</CardTitle>
                        <CardDescription>{date_range} revenue</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">
                    ₱{Number(revenue?.revenue).toFixed(2)}
                </CardContent>
            </div>
            <div className="h-24 w-24 flex">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={revenueData}
                        margin={{ top: 30, right: 20, left: 10, bottom: 30 }}
                    >
                        <Line
                            dataKey="price_sold"
                            type="natural"
                            stroke="#36027a"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </Card>
    );
};

export default RevenueAnalyticsCard;
