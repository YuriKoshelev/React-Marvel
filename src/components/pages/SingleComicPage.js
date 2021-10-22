import { useParams, Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinnner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleComicPage.scss';

const SingleComicPage = (props) => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null)
    const {error, getComic, clearError} = useMarvelService()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const index = props.comics.findIndex(elem => elem.id == comicId)
        const newComic = props.comics[index]
        if (index != -1) {
            onComicLoaded(newComic)
            setLoading(false)        
        } else {
            updateComic()
        }
    }, [comicId])

    const updateComic = () => {
        clearError()
        //setLoading(true)
        getComic(comicId)
            .then(onComicLoaded)
            .then(setLoading(false))
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    } 

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, language, thumbnail, price} = comic

    return (
        <div className="single-comic faded">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;