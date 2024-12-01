import { useState } from "react";
import moment from 'moment'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import ServiceCrew from "@/models/service_crew";

interface UserLog {
  id: string;
  user: ServiceCrew;
  description: string;
  object_data: {};
  created_at: string;
}

function UserLogTable({ userlogs }: { userlogs: Array<UserLog> }) {
    const userlogsRows = userlogs.map((userlog: UserLog) => {
    return (
      <TableRow key={userlog.id} className="cursor-pointer ">
        <TableCell>
            {userlog.description}
        </TableCell>
        <TableCell>
       
            { moment(userlog.created_at).format('MMMM Do YYYY, h:mm:ss a')}
        </TableCell>
      </TableRow>
      
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>User Logs</CardTitle>
          <CardDescription>Showing user actions</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 overflow-y-scroll max-h-52">
        <Table className="mb-14">
          <TableHeader>
            <TableRow>
              <TableHead>User activities</TableHead>
              <TableHead>Date and Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userlogsRows}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default UserLogTable;
