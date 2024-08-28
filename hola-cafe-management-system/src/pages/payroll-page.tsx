import EmployeeCard from "@/components/payroll/employeecard";
import EmployeeList from "@/components/payroll/employeelist";
import ExpenseCard from "@/components/payroll/expensescard";
import PendingPaymentCard from "@/components/payroll/pendingpaymentcard";
import TotalCostCard from "@/components/payroll/totalpayrollcard";

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
        <EmployeeList />
      </div>
    </main>
  );
};

export default PayrollPage;
