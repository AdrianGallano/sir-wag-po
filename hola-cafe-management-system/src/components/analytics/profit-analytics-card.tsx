import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PhilippinePeso } from "lucide-react";
import { Smile, Frown } from "lucide-react";
import { useAuth } from "@/context/authContext";
import dataFetch from "@/services/data-service";
import { useState, useEffect } from "react";

interface RevenueData {
  price_sold: number;
  sold_at: string;
  payment_method: string;
}

interface Revenue {
  revenue: number;
  data: {};
}

interface ExpenseData {
  price_sold: number;
  sold_at: string;
  payment_method: string;
}

interface Expense {
  expenses: number;
  data: {};
}

const ProfitAnalyticsCard = ({ date_range }: { date_range: string }) => {
  /* Show the profit in a analytic card */

  const [expenses, setExpenses] = useState<Expense>();
  const [expensesData, setExpensesData] = useState<ExpenseData[]>();
  const { token } = useAuth();
  const [revenue, setRevenue] = useState<Revenue>();
  const [revenueData, setRevenueData] = useState<RevenueData[]>();

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

  async function profitSelection(date_range: string) {
    switch (date_range) {
      case "Daily":
        await fetchRevenue("day");
        await fetchExpenses("day");

        break;
      case "Weekly":
        await fetchRevenue("week");
        await fetchExpenses("week");

        break;
      case "Monthly":
        await fetchRevenue("month");
        await fetchExpenses("month");

        break;
      case "Yearly":
        await fetchRevenue("year");
        await fetchExpenses("year");

        break;
    }
  }

  useEffect(() => {
    const asyncFetchProfit = async () => {
      await profitSelection(date_range);
    };
    asyncFetchProfit();
  }, [date_range]);

  function computeProfit() {
    let totalRevenue = revenue?.revenue ? revenue?.revenue : 0;
    let totalExpenses = expenses?.expenses ? expenses?.expenses : 0;

    return totalRevenue - totalExpenses;
  }

  return (
    <Card className="flex items-center p-4">
      <PhilippinePeso className="bg-gray-300 p-2 rounded-full" size={36} />
      <div>
        <CardHeader className="py-0">
          <div className="flex items-center gap-3">
            <CardTitle className="sr-only">Profit</CardTitle>
            <CardDescription>{date_range} profit</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-xl font-semibold py-0">
          ₱{computeProfit()}
        </CardContent>
      </div>
      <div className="h-24 w-24 flex justify-center items-center">
        {computeProfit() > 0 ? <Smile color="green" /> : <Frown color="red" />}
      </div>
    </Card>
  );
};

export default ProfitAnalyticsCard;
