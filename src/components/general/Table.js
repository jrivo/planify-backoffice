import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "Date", headerName: "Date", width: 200 },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 200,
  },
];

const rows = [];
export default function Table() {
  return (
    <div style={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
