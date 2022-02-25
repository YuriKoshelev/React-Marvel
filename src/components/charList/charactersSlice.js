import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    characters: [],
    char: null,
    charactersLosdingStatus: 'waiting',
    charactersOffSet: 310,
    charactersActiv: null,
    charactersAnimation: false,
    charClick: false
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        charactersFething: state => {
            state.charactersLosdingStatus = 'loading'
        },
        charactersFethed: (state, action) => {
            state.charactersLosdingStatus = 'confirmed'
            state.characters = [...state.characters, ...action.payload]
        },
        charFethed: (state, action) => {
            state.char = action.payload
        },
        charactersError: state => {
            state.charactersLosdingStatus = 'error'
        },
        charactersChangeActive: (state, action) => {
            state.charactersActiv = action.payload
        },
        charactersChangeOffSet: (state, action) => {
            state.charactersOffSet = action.payload
        },
        charactersChangeAnimation: (state, action) => {
            state.charactersAnimation = action.payload
        },
        charOnClick: (state, action) => {
            state.charClick = action.payload
        }
    }
});

const {actions, reducer} = charactersSlice;

export default reducer;

export const {
    charactersFething,
    charactersFethed,
    charFethed,
    charactersError,
    charactersChangeActive,
    charactersChangeOffSet,
    charactersChangeAnimation,
    charOnClick
} = actions;