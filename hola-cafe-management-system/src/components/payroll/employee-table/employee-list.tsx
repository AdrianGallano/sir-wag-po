import { TableRow, TableCell } from "../../ui/table";
import ActionButton from "./action-btn";

const EmployeeList = ({ employee }: any) => {
  /* 

  */

  return (
    <TableRow className="font-medium">
      <TableCell className="hidden sm:table-cell">{employee.id}</TableCell>
      <TableCell className="font-medium">{employee.name}</TableCell>
      <TableCell>{employee.position}</TableCell>
      <TableCell className="hidden md:table-cell">
        {employee.lastPaymentDate}
      </TableCell>
      <TableCell className="hidden md:table-cell">{employee.salary}</TableCell>
      <TableCell className="hidden md:table-cell">{employee.bonus}</TableCell>
      <TableCell className="hidden md:table-cell">
        <span
          className={`${
            employee.status === "Completed"
              ? "text-green-500 border-green-500"
              : "text-orange-500 border-orange-500"
          } font-semibold border-2 rounded-sm py-1 px-1.5`}
        >
          {employee.status}
        </span>
      </TableCell>
      <TableCell>
        <ActionButton />
      </TableCell>
    </TableRow>
  );
};

export default EmployeeList;
