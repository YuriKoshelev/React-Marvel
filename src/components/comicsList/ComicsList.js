import {useState, useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './comicsList.scss';

const ComicsList = (props) => {
    
    const {states} = props
    const [newItemLoading, setNewItemLoading] = useState(false)
    const {getComics} = useMarvelService()
    const [comicsEnd, setComicsEnd] = useState(false)
    const {process, setProcess} = useMarvelService()

    useEffect(() => {
        if (states.comics.length > 0) {
            setProcess('confirmed')
            return(null)
        }
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        setNewItemLoading(true)
        getComics(states.offSetComics)
            .then((res) => {
                onComicsLoaded(res) 
                if (res.length < 8) setComicsEnd(true)
                setNewItemLoading(false)
                states.setOffSetComics(states.offSetComics + 8) 
              }
            )
            .then(() => {
                setProcess('confirmed')
            })   
    }

    const onComicsLoaded = (newComics) => {
        states.setComics([...states.comics, ...newComics]) 
    }
    
    const data = {
        states: states,
        newItemLoading: newItemLoading,
        comicsEnd: comicsEnd,
        onRequest: onRequest 
    }    

    const comicsListElements = useMemo(() => {
        return(setContent(process, View, data))
        // eslint-disable-next-line
    }, [process, newItemLoading, states.offSetComics])
    
    return (comicsListElements)
         
}

const View = ({data}) => {
    const {states, newItemLoading, comicsEnd, onRequest} = data

    let elements = null; 
    elements = states.comics.map((elem, i) => {
        return (<li key={i} 
                    className="comics__item faded">
                    <Link to={`/comics/${elem.id}`}>
                        <img src={elem.thumbnail} alt={elem.name} className="comics__item-img"/>
                        <div className="comics__item-name">{elem.name}</div>
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