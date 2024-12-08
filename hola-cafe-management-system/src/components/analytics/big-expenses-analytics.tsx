"use client";

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
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

// Updated chart config
const chartConfig = {
    total_cost_price: {
        label: "Total Cost Price=",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

interface ExpenseData {
    name: string;
    unit_price: number;
    quantity: number;
    bought_at: number;
    total_cost_price: number;
}

interface Expense {
    expenses: number;
    data: ExpenseData[];
}

const BigExpensesAnalyticsCard = ({ date_range }: { date_range: string }) => {
    const [expenses, setExpenses] = useState<Expense>();
    const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);
    const { token } = useAuth();

    async function fetchExpenses(date: string) {
        try {
            const response = await dataFetch(
                `api/analytics/${date}/expenses/`,
                "GET",
                {},
                token!
            );
            setExpenses(response);
            setExpensesData(response.data);

            const formattedData = response.data.map((exp: ExpenseData) => ({
                ...exp,
                bought_at: new Date(exp.bought_at).toLocaleDateString("en-US", {
                    weekday: "short", // Short weekday (e.g., "Mon")
                    month: "short", // Short month (e.g., "Dec")
                    day: "2-digit", // 2-digit day
                    year: "numeric", // Full year (e.g., "2024")
                }),
            }));
            setExpensesData(formattedData);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    }

    async function expensesSelection(date_range: string) {
        switch (date_range) {
            case "Daily":
                await fetchExpenses("day");
                break;
            case "Weekly":
                await fetchExpenses("week");
                break;
            case "Monthly":
                await fetchExpenses("month");
                break;
            case "Yearly":
                await fetchExpenses("year");
                break;
        }
    }

    useEffect(() => {
        const asyncFetchExpenses = async () => {
            await expensesSelection(date_range);
        };
        asyncFetchExpenses();
    }, [date_range]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expenses Area Chart</CardTitle>
                <CardDescription>
                    Tracking expenses over time for {date_range}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={expensesData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="bought_at"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <Tooltip
                            content={<ChartTooltipContent />}
                            cursor={false}
                        />
                        <defs>
                            <linearGradient
                                id="fillPriceBought"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-price-bought)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-price-bought)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="total_cost_price"
                            type="natural"
                            fill="#cf1800"
                            fillOpacity={0.4}
                            stroke="#cf1800"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {date_range} expenses
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default BigExpensesAnalyticsCard;
