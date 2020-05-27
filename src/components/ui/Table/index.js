import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TableComp from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { TableCell } from '@material-ui/core';

const rowsPerPage = 20;

const Table = (props) => {
    const {
        data,
        columnNames,
        dataRow,
        rootClassName
    } = props;
    const [state, setState] = useState({
        page: 0
    });

    const onChangePage = (event, page) => {
        setState((prevState) => ({
            ...prevState,
            page
        }));
    };

    const dataToDisplay = data.slice(state.page * rowsPerPage, state.page * rowsPerPage + rowsPerPage);
    const DataRow = dataRow;

    return (
        <Paper className={ rootClassName }>
            <TableContainer>
                <TableComp>
                    <TableHead>
                        <TableRow>
                            {
                                columnNames.map((name, index) => (
                                    <TableCell key={ index }>{ name }</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataToDisplay.map((record, index) => (
                                <DataRow
                                    key={ index }
                                    index={ index }
                                    record={ record }
                                />
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPage={ rowsPerPage }
                                rowsPerPageOptions={ [ rowsPerPage ] }
                                count={ data.length }
                                page={ state.page }
                                onChangePage={ onChangePage }
                            />
                        </TableRow>
                    </TableFooter>
                </TableComp>
            </TableContainer>
        </Paper>
    );
};
Table.propTypes = {
    data: PropTypes.array.isRequired,
    columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataRow: PropTypes.elementType.isRequired,
    rootClassName: PropTypes.string
};

export default Table;