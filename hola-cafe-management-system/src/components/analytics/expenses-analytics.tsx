import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-service";
import { useAuth } from "@/context/authContext";

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
    sold_at: string; // Added 'sold_at' as it was referenced
}

interface Expense {
    expenses: number;
    data: any; // Specify an appropriate type for 'data'
}

const ExpensesAnalyticsCard = ({ date_range }: { date_range: string }) => {
    const [expenses, setExpenses] = useState<Expense>();
    const [expensesData, setExpensesData] = useState<ExpenseData[]>([]);
    const [expensesChartData, setExpensesChartData] = useState<any[]>([]);
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

            // Map the expenses data to chart data

            if (expensesData) {
                const chartData = (response.data as ExpenseData[]).map(
                    (exp) => ({
                        name: exp.name,
                        unit_price: exp.unit_price,
                        sold_at: new Date(exp.sold_at).toLocaleDateString(), // Format date
                    })
                );
                setExpensesChartData(chartData); // Update chart data
            }
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
                    ₱
                    {expenses?.expenses != null
                        ? expenses?.expenses.toFixed(2)
                        : 0}
                </CardContent>
            </div>
            <div className="h-24 w-24 flex">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={expensesData}
                        accessibilityLayer
                        margin={{ top: 30, right: 20, left: 10, bottom: 30 }}
                    >
                        <Line
                            dataKey="total_cost_price"
                            type="natural"
                            stroke="#cf3400"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </Card>
    );
};

export default ExpensesAnalyticsCard;
