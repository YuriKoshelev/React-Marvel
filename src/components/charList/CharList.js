import {useState, useEffect, useMemo} from 'react'
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import PropTypes from 'prop-types'
import './charList.scss';

const CharList = (props) => {
    
    const {onCharactersLoaded, setChangeId} = props
    const {characters, setOffSet, offSet, process, setProcess, currentCharInd} = props.states
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [charEnded, setCharEnded] = useState(false)

    const {getAllCharacters} = useMarvelService();

    useEffect(() => {
        if (characters.length !== 0) return(null)
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset) => {
        setNewItemLoading(true)
        getAllCharacters(offset)
            .then((res) => {
                onCharactersLoaded(res) 
                if (res.length < 9) setCharEnded(true)
                setNewItemLoading(false)
                setOffSet(offSet + 9) 
              }
            )
            .then(() => {
                setProcess('confirmed')
            })
            .catch(() => {
                setProcess('error')
            })   
    }

    const data = {
        characters: characters,
        setChangeId: setChangeId,
        newItemLoading: newItemLoading,
        charEnded: charEnded,
        onRequest: onRequest,
        offSet: offSet 
    }

    const charListElements = useMemo(() => {
        return(setContent(process, View, data))
        // eslint-disable-next-line
    }, [process, currentCharInd, newItemLoading, offSet])
    
    return (charListElements)   
}

const View = ({data}) => {
    const {characters, setChangeId, newItemLoading, charEnded, onRequest, offSet} = data
    let elements = null;
    elements = characters.map(elem => { 
        let imgStyle='', classLi='char__item faded'
        if (elem.thumbnail.indexOf('image_not_available') !== -1) {imgStyle ='noImg'}
        if (elem.current) classLi='char__item char__item_selected faded'
        return(
            <li className={classLi}
                key={elem.id}
                onClick={(e) => {
                    setChangeId(elem.id)
                }}>
                    <img src={elem.thumbnail} alt={elem.name} className={imgStyle}/>
                    <div className="char__name">{elem.name}</div>
            </li>
        )
    })  
    
    return (
        <div className="char__list">
            <ul className="char__grid">
                {elements}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offSet)}>
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