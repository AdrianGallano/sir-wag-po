"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    Tooltip,
    YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

// Updated chart config for revenue
const chartConfig = {
    price_sold: {
        label: "Revenue from Sales=",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

interface RevenueData {
    price_sold: number; // Represents the amount of revenue from a single sale
    sold_at: string; // Date when the sale occurred
    payment_method: string; // Payment method used (e.g., "Credit Card", "Cash", etc.)
}

interface Revenue {
    revenue: number; // Total revenue for the selected time range
    data: RevenueData[]; // Array of individual revenue data entries
}

const BigRevenueAnalyticsCard = ({ date_range }: { date_range: string }) => {
    const [revenue, setRevenue] = useState<Revenue>();
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const { token } = useAuth();

    async function fetchRevenue(date: string) {
        try {
            const response = await dataFetch(
                `api/analytics/${date}/revenue/`, // Adjusted API endpoint for revenue data
                "GET",
                {},
                token!
            );
            setRevenue(response);
            setRevenueData(response.data);

            // Format the revenue data (e.g., converting the date from string to a more readable format)
            const formattedData = response.data.map((rev: RevenueData) => ({
                ...rev,
                sold_at: new Date(rev.sold_at).toLocaleDateString("en-US", {
                    weekday: "short", // Short weekday (e.g., "Mon")
                    month: "short", // Short month (e.g., "Dec")
                    day: "2-digit", // 2-digit day
                    year: "numeric", // Full year (e.g., "2024")
                }),
            }));
            setRevenueData(formattedData);
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
        <Card>
            <CardHeader>
                <CardTitle>Revenue Area Chart</CardTitle>
                <CardDescription>
                    Tracking revenue over time for {date_range}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={revenueData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="sold_at"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <YAxis
                            dataKey="price_sold"
                            domain={[
                                0,
                                (dataMax: number) => Math.ceil(dataMax) + 5000,
                            ]} 
                            tickLine={false}
                            axisLine={false}
                            padding={{ top: 20, bottom: 20 }}
                        />
                        <Tooltip
                            content={<ChartTooltipContent />}
                            cursor={false}
                        />
                        <defs>
                            <linearGradient
                                id="fillRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-revenue)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-revenue)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="price_sold" // Using price_sold here as the metric for revenue
                            type="natural"
                            fill="#021a7a"
                            fillOpacity={0.4}
                            stroke="#021a7a"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {date_range} revenue
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BigRevenueAnalyticsCard;
