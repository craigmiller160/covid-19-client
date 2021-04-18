/*
 *     covid-19-client
 *     Copyright (C) 2020 Craig Miller
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
import TableCell from '@material-ui/core/TableCell';

const rowsPerPage = 20;

const Table = (props) => {
	const { data, columnNames, dataRow, rootClassName } = props;
	const [state, setState] = useState({
		page: 0
	});

	const onChangePage = (event, page) => {
		setState((prevState) => ({
			...prevState,
			page
		}));
	};

	const dataToDisplay = data.slice(
		state.page * rowsPerPage,
		state.page * rowsPerPage + rowsPerPage
	);
	const DataRow = dataRow;

	return (
		<Paper className={rootClassName}>
			<TableContainer>
				<TableComp>
					<TableHead>
						<TableRow>
							{columnNames.map((name) => (
								<TableCell key={name}>{name}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{dataToDisplay.map((record, index) => (
							<DataRow
								key={record._id} // eslint-disable-line no-underscore-dangle
								index={index}
								record={record}
							/>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPage={rowsPerPage}
								rowsPerPageOptions={[rowsPerPage]}
								count={data.length}
								page={state.page}
								onChangePage={onChangePage}
							/>
						</TableRow>
					</TableFooter>
				</TableComp>
			</TableContainer>
		</Paper>
	);
};
Table.propTypes = {
	data: PropTypes.arrayOf(PropTypes.any).isRequired,
	columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,
	dataRow: PropTypes.elementType.isRequired,
	rootClassName: PropTypes.string
};

export default Table;
