import {DataGrid} from "@mui/x-data-grid";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";


export default function Table(data: {rows: GridRowsProp, columns: GridColDef[]}) {
    return (
        <DataGrid rows={data.rows} columns={data.columns}
                  initialState={{
                      pagination: {paginationModel: {pageSize: 5}},
                  }}
                  pageSizeOptions={[5, 10, 25]}
        />
    );
}
