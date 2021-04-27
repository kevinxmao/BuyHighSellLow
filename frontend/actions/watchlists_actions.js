import * as WatchlistsAPIUtil from '../util/watchlists/watchlists_api_util';

export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST';
export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST';
export const REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';

export const receiveWatchlists = watchlists => ({
    type: RECEIVE_WATCHLISTS,
    watchlists
})

export const receiveWatchlist = watchlist => ({
    type: REMOVE_WATCHLIST,
    watchlist
})