import React, { useState, useEffect } from 'react';
import { fetchWatchlistInfo } from '../../../util/companies/data_api_util';
import WatchlistRow from './watchlist_row';
import LoadingPage from '../../loading_page';

export default function WatchlistTable(props) {
    // const [tickers, setTickers] = useState(props.tickers);
    const initialSortState = {
        name: '',
        symbol: '',
        price: '',
        today: '',
        marketCap: '',
    }
    const [sort, setSort] = useState(initialSortState);
    const [symbols, setSymbols] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const tickerArr = props.tickers.map(ticker => ticker.ticker)
        setSymbols(tickerArr);
        fetchWatchlistInfo(tickerArr).then(res => {
            const obj = {};
            for (let [key, value] of Object.entries(res) ) {
                let datum = {
                    name: value.company.companyName,
                    symbol: key,
                    price: value.price,
                    today: value.quote.changePercent,
                    marketCap: value.stats.marketcap
                };
                obj[key] = datum;
            }
            setData(obj);
        });
    }, [props.tickers]);

    function handleHeaderClick(key) {
        debugger;
        switch(sort[key]) {
            case '':
                setSort(Object.assign({}, initialSortState, { [key]: 'ASC'}));
                setSymbols(sortSymbols(symbols, key, 'ASC', data));
                break;
            case 'ASC':
                setSort(Object.assign({}, initialSortState, { [key]: 'DSC' }));
                setSymbols(sortSymbols(symbols, key, 'DSC', data));
                break;
            case 'DSC':
                setSort(Object.assign({}, initialSortState, { [key]: '' }));
                setSymbols(props.tickers.map(ticker => ticker.ticker));
                break;
            default:
                break;
        }
    }

    function renderColumnHeader(headerName) {
        const key = camalize(headerName);
        const className = sort[key] ? "column-header active" : "column-header";
        return (
            <div className={className}>
                <button onClick={() => handleHeaderClick(key)}>
                    <div>{headerName}</div>
                    <div className="header-arrow"></div>
                </button>
            </div>
        )
    }

    function renderTableBody() {
        if (!!symbols.length) {
            return symbols.map((symbol, i) => <WatchlistRow key={i} symbol={symbol} data={data}/>)
        } else {
            return <LoadingPage />
        }
    }

    return (
        <>
            <header className="table-header">
                <div>
                    {renderColumnHeader('Name')}
                    {renderColumnHeader('symbol')}
                    {renderColumnHeader('Price')}
                    {renderColumnHeader('Today')}
                    {renderColumnHeader('Market Cap')}
                </div>
            </header>
            <div className="table-body">
                {renderTableBody()}
            </div>
        </>
    )
}

function camalize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function sortSymbols(symbols, critieria, order, data) {

}

function swap(items, i, j) {
    let temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}
