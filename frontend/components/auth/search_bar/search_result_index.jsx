import React from 'react';
import SearchResultItem from './search_result_item';

class SearchResultsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.results || !this.props.results.length) return null;
        const items = this.props.results.slice(0, 5).map(result => {
            const { symbol, securityName } = result;
            return <SearchResultItem symbol={symbol} securityName={securityName} searchTerm={this.props.searchTerm}/>
        })
        return (
            <div className="search-dropdown">
                <p>Stocks</p>
                {items}
            </div>
        )
    }
}

export default SearchResultsList;