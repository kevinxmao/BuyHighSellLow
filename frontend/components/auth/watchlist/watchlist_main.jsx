import React, { useState, useEffect } from 'react';
import WatchlistSidebar from './watchlist_sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { updateWatchlist } from '../../../actions/watchlists_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/pro-regular-svg-icons';
import WatchlistTable from './watchlist_table';

export default function WatchlistMain(props) {
    const watchlist = useSelector(state => state.entities.watchlists[props.id]);
    const [edit, setEdit] = useState(false);
    const name = useFormInput(watchlist.name);
    const dispatch = useDispatch();

    function renderTable() {
        if (watchlist.tickers.length === 0) {
            return (
                <div>
                    <header><span>Feels a little empty in here...</span></header>
                    <div><span>Search for companies to add and stay up to date.</span></div>
                </div>
            )
        } else {
            debugger
            return <WatchlistTable tickers={watchlist.tickers}/>
        }
    }

    function useFormInput(initialValue) {
        const [value, setValue] = useState(initialValue);

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue]);

        function handleChange(e) {
            setValue(e.target.value);
        }

        return {
            value,
            onChange: handleChange
        }
    }

    function handleOnblur() {
        if (name.value === watchlist.name) {
            setEdit(false);
        } else {
            watchlist.name = name.value;
            dispatch(updateWatchlist(watchlist)).then(() => setEdit(false));
        }
    }

    function renderNameField() {
        if(edit) {
            return (
                <form onBlur={handleOnblur}>
                    <input type="text" autoFocus {...name}/>
                </form>
            )
        } else {
            return (
                <div onClick={() => setEdit(true)}>
                    <span>{watchlist.name}</span>
                </div>
            )
        }
    }

    return (
        <>
            <div className="watchlist-main">
                <header>
                    <div className="main-watchlist-name">
                        {renderNameField()}
                        <div className="icons">
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                    </div>
                    <div><span>{watchlist.tickers.length} {watchlist.tickers.length === 1 ? "item" : "items"}</span></div>
                </header>
                <div className="watchlist-table-container">
                    {renderTable()}
                </div>
            </div>
            <div className="watchlist-sidebar">
                <div>
                    <WatchlistSidebar />
                </div>
            </div>
        </>
    )
}