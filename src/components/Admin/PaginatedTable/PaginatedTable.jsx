import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Pagination, TableHead} from "@mui/material";
import TableActions from "../TableActions/TableActions";

export default function PaginatedTable({pagination, rowsData, tableDataSkeleton, handlePageChange, actions})
{
    return (
        <>
            <TableContainer component={Paper} sx={{marginBottom:"2%"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableDataSkeleton.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {tableDataSkeleton.map((rowData) => (
                                    <TableCell key={rowData.headerName} component="th" scope="row">
                                        {rowData.field === 'published' ?
                                            (<>
                                                {row[rowData.field] === 1 ? 'yes' : 'no'}
                                            </>)
                                            :
                                            (<>
                                                {rowData.field !== null ? row[rowData.field] :
                                                    <TableActions {...actions} dataId={row.id}
                                                                  creatorId={row.creator?.id}/>}
                                            </>)
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={pagination.count} page={pagination.page} onChange={handlePageChange}/>
        </>
    );
}