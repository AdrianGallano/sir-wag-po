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


interface ExpenseData {
    price_sold: number;
    sold_at: string;
    payment_method: string;
}

interface Expense {
    expenses: number;
    data: {};
}

const RevenueAnalyticsCard = ({ date_range }: { date_range: string }) => {
    /* Show the expenses in a analytic card */
    const [expenses, setExpenses] = useState<Expense>();
    const [expensesData, setExpensesData] = useState<ExpenseData[]>();
    const [expensesChartData , setExpensesChartData] = useState<[]>([]);
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

            (expensesData as ExpenseData[]).forEach((exp) => {
                exp.sold_at = new Date(exp.sold_at).toLocaleDateString();
            });

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
        <Card className="flex items-center p-4">
            <Landmark className="bg-gray-300 p-2 rounded-full" size={36} />
            <div>
                <CardHeader className="py-0">
                    <div className="flex items-center gap-3">
                        <CardTitle className="sr-only">Expenses</CardTitle>
                        <CardDescription>{date_range} expenses</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="text-xl font-semibold py-0">
                    ₱{expenses?.expenses}
                </CardContent>
            </div>
            <div className="h-16 w-24 flex">
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={expensesData}>
                        <Line
                            dataKey="unit_price"
                            type="natural"
                            stroke="#22c55e"
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
