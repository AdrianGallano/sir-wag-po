import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import EmployeeList from "./employee-list";
import SearchButton from "./search-btn";
import SortingMenu from "./sorting-menu";

const EmployeeTable = () => {
  const employees = [
    {
      id: "PYRL10298",
      name: "Dominic L. Molino",
      position: "Janitor",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱2500",
      bonus: "₱500",
      status: "Completed",
    },
    {
      id: "PYRL10299",
      name: "Maria C. Santos",
      position: "Secretary",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱3500",
      bonus: "₱800",
      status: "Pending",
    },
    {
      id: "PYRL10300",
      name: "John R. Dela Cruz",
      position: "Accountant",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱4500",
      bonus: "₱1200",
      status: "Completed",
    },
    {
      id: "PYRL10301",
      name: "Elaine S. Perez",
      position: "HR Manager",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱5500",
      bonus: "₱1500",
      status: "Completed",
    },
    {
      id: "PYRL10302",
      name: "Carlos T. Reyes",
      position: "IT Specialist",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱5000",
      bonus: "₱1000",
      status: "Pending",
    },
    {
      id: "PYRL10303",
      name: "Jessica M. Lim",
      position: "Marketing Director",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱6000",
      bonus: "₱2000",
      status: "Completed",
    },
    {
      id: "PYRL10304",
      name: "Michael A. Bautista",
      position: "Sales Manager",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱4500",
      bonus: "₱1100",
      status: "Pending",
    },
    {
      id: "PYRL10305",
      name: "Ana L. Torres",
      position: "Operations Manager",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱5500",
      bonus: "₱1300",
      status: "Completed",
    },
    {
      id: "PYRL10306",
      name: "Victor R. Santiago",
      position: "Logistics Coordinator",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱3200",
      bonus: "₱700",
      status: "Completed",
    },
    {
      id: "PYRL10307",
      name: "Rosa C. Flores",
      position: "Administrative Assistant",
      lastPaymentDate: "21 Jun, 2024 - 5:00 PM",
      salary: "₱3000",
      bonus: "₱600",
      status: "Pending",
    },
  ];

  return (
    <Card className="border border-gray-300 rounded-md shadow-md">
      <CardHeader className="flex md:flex-row flex-col justify-between">
        <div>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>
            Manage your employee and view their payroll status.
          </CardDescription>
        </div>
        <div className="flex flex-row gap-2 ">
          <SearchButton />
          <SortingMenu />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">
                Date & Time
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Total Salary
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Reimbursement
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <EmployeeList employee={employee} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
