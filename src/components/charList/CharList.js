import {useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';
import { useDispatch, useSelector } from 'react-redux';
import setContent from '../../utils/setContent';
import PropTypes from 'prop-types';

import {charactersFethed, 
        charactersChangeOffSet, 
        charactersChangeActive,
        charactersChangeAnimation,
        charactersError,
        charOnClick} from '../charList/charactersSlice';

const CharList = () => {
    
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)
   
    const {characters, charactersOffSet, charClick,
           charactersLosdingStatus, charactersActiv} = useSelector((state) => state.characters)
    
    const dispatch = useDispatch()

    const {getAllCharacters} = useMarvelService();

    useEffect(() => {
        if (characters.length !== 0) return(null)
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        setNewItemLoading(true)
        getAllCharacters(charactersOffSet)
            .then((res) => {    
                if (res.length < 9) setCharEnded(true)
                setNewItemLoading(false)
                dispatch(charactersFethed(res))
                dispatch(charactersChangeOffSet(charactersOffSet + 9))
              }
            )
            .catch(() => {
                dispatch(charactersError())
            })   
    }

    const setChangeId = (id) => { 
        if (id === charactersActiv) return(null)  
        //dispatch(charactersChangeAnimation(false))
        dispatch(charactersChangeActive(characters.findIndex(elem => elem.id === id)))
        dispatch(charOnClick(true))
        //dispatch(charactersChangeAnimation(true))
    } 

    const data = {
        characters: characters,
        setChangeId: setChangeId,
        newItemLoading: newItemLoading,
        charEnded: charEnded,
        onRequest: onRequest,
        offSet: charactersOffSet,
        charactersActiv: charactersActiv,
        charClick: charClick 
    }

    return(setContent(charactersLosdingStatus, View, data))
       
}

const View = ({data}) => {
    const {characters, setChangeId, newItemLoading, charEnded, onRequest, charactersActiv, charClick} = data
    let elements = null;

    elements = characters.map((elem, i) => { 
        let imgStyle='', classLi='char__item faded'
        if (elem.thumbnail.indexOf('image_not_available') !== -1) {imgStyle ='noImg'}
        if (charactersActiv === i) classLi='char__item char__item_selected faded'
        return(
            <li className={classLi}
                key={elem.id}
                tabIndex={0}
                onClick={() => {
                    setChangeId(elem.id)
                }}
                onKeyPress={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        setChangeId(elem.id)            
                    }
                }}>
                    <img src={elem.thumbnail} alt={elem.name} className={imgStyle}/>
                    <div className="char__name">{elem.name}</div>
            </li>
        )
    })  
    
    let charListClass = 'char__list'
    if (charClick) {
        charListClass = charListClass + ' char__list-none'
    }

    return (
        <div className={charListClass}>
            <ul className="char__grid">
                {elements}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    characters: PropTypes.array,
    onCharSelected: PropTypes.func
}

export default CharList;