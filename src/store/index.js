import { configureStore } from '@reduxjs/toolkit';
import characters from '../components/charList/charactersSlice';
import comics from '../components/comicsList/comicsSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {characters, comics},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV != 'production'
})

export default store;