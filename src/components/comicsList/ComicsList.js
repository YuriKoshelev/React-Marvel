import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinnner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = (props) => {
    
    const {states} = props
    const [newItemLoading, setNewItemLoading] = useState(false)
    const {error, getComics, loading} = useMarvelService()
    const [comicsEnd, setComicsEnd] = useState(false)
    const {process, setProcess} = useMarvelService()

    useEffect(() => {
        if (states.comics.length > 0) return(null)
        onRequest()
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

    let elements = null;
    
    if (states.comics.length > 0) {
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
    else {
        if (error) return <ErrorMessage/>
        else return <Spinner/>       
    }
}

export default ComicsList;