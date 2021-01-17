import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {orders} from "./RecipeOrder";
import {user} from "./User";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'user',
        'orders'
    ],
}

const allReducers = combineReducers({
    orders,
    user
})

// to update
export default persistReducer(persistConfig, allReducers)
