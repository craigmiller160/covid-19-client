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

module.exports = {
    title: 'COVID-19 Data',
    publicPath: '/covid-19',
    devServerPort: 7001,
    devServerHttps: true,
    devServerProxy: {
        '/covid-19/api': {
            target: 'https://localhost:7005',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/covid-19/api': ''
            },
            logLevel: 'debug'
        }
    }
};