import { Wallet } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const ExpenseCard = () => {
  return (
    <Card className="border border-gray-300 shadow-zinc-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <Wallet className="p-2 bg-black text-white rounded-full" size={30} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₱28,000</div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
