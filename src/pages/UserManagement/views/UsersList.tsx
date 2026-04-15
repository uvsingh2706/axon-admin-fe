import { DataTable } from "@/component/data-table";
import { userColumns } from "../config/user.table";
import { mockUsers } from "../mocks/user.mock";

function UsersList() {
  return (

      <DataTable
        columns={userColumns}
        data={mockUsers}       
      />

  );
}

export default UsersList;