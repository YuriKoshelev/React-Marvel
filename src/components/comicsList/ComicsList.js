import {useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import {comicsFethed,
        cmicsError,
        comicsChangeOffSet} from '../comicsList/comicsSlice';

const ComicsList = () => {
    
    const [newItemLoading, setNewItemLoading] = useState(false)
    const {getComics} = useMarvelService()
    let comicsEnd = false

    const {comics, comicsLosdingStatus, comicsOffSet} = useSelector((state) => state.comics)

    const dispatch = useDispatch()

    useEffect(() => {
        if (comics.length > 0) {
            return(null)
        }
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        setNewItemLoading(true)
        getComics(comicsOffSet)
            .then((res) => {
                dispatch(comicsChangeOffSet(comicsOffSet + 8))
                dispatch(comicsFethed(res)) 
                if (res.length < 8) {
                    comicsEnd = true
                }
                setNewItemLoading(false) 
              }
            )
            .catch(() => {
                dispatch(cmicsError())
            })   
    }
    
    const data = {
        comics: comics,
        newItemLoading: newItemLoading,
        comicsEnd: comicsEnd,
        onRequest: onRequest 
    }    

    const comicsListElements = useMemo(() => {
        return(setContent(comicsLosdingStatus, View, data))
        // eslint-disable-next-line
    }, [comicsLosdingStatus, newItemLoading, comicsOffSet])
    
    return (comicsListElements)
         
}

const View = ({data}) => {
    const {comics, newItemLoading, comicsEnd, onRequest} = data
    
    let elements = null; 
    elements = comics.map((elem, i) => {
        return (<li key={i} 
                    className="comics__item faded">
                    <Link to={`/comics/${elem.id}`}>
                        <img src={elem.thumbnail} alt={elem.title} className="comics__item-img"/>
                        <div className="comics__item-name">{elem.title}</div>
                        <div className="comics__item-price">{elem.price}</div>
                    </Link>
                </li>)   
    })
            
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {elements}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnd ? 'none' : 'block'}}
                    onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )    
}

export default ComicsList;