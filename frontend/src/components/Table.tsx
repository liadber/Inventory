import {DataGrid} from "@mui/x-data-grid";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {PaginationModel} from "../containers/ProductsContainer";


export default function Table(data: {rows: GridRowsProp, columns: GridColDef[], rowCount: number, paginationModel: PaginationModel, handlePaginationModelChange: (nextPaginationModel: PaginationModel) => void}){
    const [rowCountState, setRowCountState] = useState(data.rowCount);

    //To avoid undefined during loading that causes reset the page to zero. T
    useEffect(() => {
        setRowCountState((prevRowCountState) =>
            data.rowCount !== undefined ? data.rowCount : prevRowCountState,
        );
    }, [data.rowCount, setRowCountState]);


    return (
        <DataGrid rows={data.rows} columns={data.columns}
                  paginationMode='server'
                  rowCount={rowCountState}
                  initialState={{
                      pagination: {paginationModel: data.paginationModel},
                  }}
                  onPaginationModelChange={data.handlePaginationModelChange}
                  pageSizeOptions={[10]}
        />
    );
}
