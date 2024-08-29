import EmployeeCard from "@/components/payroll/cards/employee-card";
import ExpenseCard from "@/components/payroll/cards/expenses-card";
import PendingPaymentCard from "@/components/payroll/cards/pendingpayment-card";
import TotalCostCard from "@/components/payroll/cards/totalpayroll-card";
import EmployeeTable from "@/components/payroll/employee-table/employee-table";

const PayrollPage = () => {
  /* shows the overview of the payroll Disbursement*/
  return (
    <main className="flex flex-col gap-4 p-4 sm:px-6 sm:py-0">
      <h2 className="text-2xl font-semibold tracking-tight">
        Payroll Disbursement
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <TotalCostCard />
        <ExpenseCard />
        <PendingPaymentCard />
        <EmployeeCard />
      </div>
      <div className="">
        <EmployeeTable />
      </div>
    </main>
  );
};

export default PayrollPage;
