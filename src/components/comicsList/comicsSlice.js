import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comics: [],
    comicsLosdingStatus: 'waiting',
    comicsOffSet: 310
}

const comicsSlice = createSlice({
    name: 'comics',
    initialState,
    reducers: {
        comisFething: state => {
            state.comicsLosdingStatus = 'loading'
        },
        comicsFethed: (state, action) => {
            state.comicsLosdingStatus = 'confirmed'
            state.comics = [...state.comics, ...action.payload]
        },
        cmicsError: state => {
            state.charactersLosdingStatus = 'error'
        },
        comicsChangeOffSet: (state, action) => {
            state.comicsOffSet = action.payload
        },
    }
});

const {actions, reducer} = comicsSlice;

export default reducer;

export const {
    comisFething,
    comicsFethed,
    cmicsError,
    comicsChangeOffSet
} = actions;