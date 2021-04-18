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

export const COUNTRY_COMPARE_FORM = 'countryCompare';
export const STATE_COMPARE_FORM = 'stateCompare';

export const rankByOptions = [
	{ label: 'Total Cases', value: 'totalCases' },
	{ label: 'Total Deaths', value: 'totalDeaths' },
	{ label: 'Cases Per-Million', value: 'totalCasesPerMillion' },
	{ label: 'Deaths Per-Million', value: 'totalDeathsPerMillion' }
];

export const orderOptions = [
	{ label: 'Highest to Lowest', value: 'desc' },
	{ label: 'Lowest to Highest', value: 'asc' }
];
