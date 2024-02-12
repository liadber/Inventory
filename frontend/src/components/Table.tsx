import {DataGrid, GridColDef, GridFilterModel, GridRowsProp, GridSortModel} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {PaginationModel} from "../containers/ProductsContainer";


export default function Table(props: { rows: GridRowsProp, columns: GridColDef[],
    rowCount: number, paginationModel: PaginationModel, onPaginationModelChange: (nextPaginationModel: PaginationModel) => void,
    onSortModelChange: (sortModel: GridSortModel) => void,
    onFilterModelChange: (filterModel: GridFilterModel) => void
}) {
    const [rowCountState, setRowCountState] = useState(props.rowCount);


    //To avoid undefined during loading that causes reset the page to zero. T
    useEffect(() => {
        setRowCountState((prevRowCountState) =>
            props.rowCount !== undefined ? props.rowCount : prevRowCountState,
        );
    }, [props.rowCount, setRowCountState]);


    return (
        <DataGrid rows={props.rows} columns={props.columns}
                  paginationMode='server'
                  rowCount={rowCountState}
                  initialState={{
                      pagination: {paginationModel: props.paginationModel},
                  }}
                  onPaginationModelChange={props.onPaginationModelChange}
                  pageSizeOptions={[10]}
                  sortingMode="server"
                  onSortModelChange={props.onSortModelChange}
                  filterMode="server"
                  onFilterModelChange={props.onFilterModelChange}
        />
    );
}
