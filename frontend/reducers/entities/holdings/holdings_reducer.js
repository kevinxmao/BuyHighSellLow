import { RECEIVE_USER } from "../../../actions/users_actions";
import { RECEIVE_HOLDINGS, RECEIVE_HOLDING, REMOVE_HOLDING } from "../../../actions/holdings_action";

const holdingsReducer = (state={}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_USER:
            return action.payload.holdings;
        case RECEIVE_HOLDINGS:
            return action.holdings;
        case RECEIVE_HOLDING:
            return Object.assign({}, newState, {[action.holding.id]: action.holding})
        case REMOVE_HOLDING:
            delete newState[action.holdingId];
            return newState;
        default:
            return newState;
    }
}

export default holdingsReducer;