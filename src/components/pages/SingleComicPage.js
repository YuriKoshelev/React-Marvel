import { useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './singleComicPage.scss';

const SingleComicPage = (props) => {
    const {id} = useParams()
    const [comic, setComic] = useState(null)
    const {list, dataType} = props
    const {getComic, clearError, process, setProcess} = useMarvelService()

    useEffect(() => {
        const index = list.findIndex(elem => elem.id == id)
        console.log(id) 
        const newComic = list[index]
        if (index !== -1) {
            onComicLoaded(newComic)
            setProcess('confirmed')        
        } else {
            updateComic()
        }
        // eslint-disable-next-line
        return () => {
            if (dataType === 'character') {
                props.setList(null)
            }  
        }
    }, [id])

    const updateComic = () => {
        clearError()
        getComic(id)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    } 

    return(setContent(process, View, comic, dataType))
}

const View = (props) => {
    const {dataType, data} = props
    let {name, title, description, pageCount, language, thumbnail, price} = data

    let fieldsComic = <>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">Language: {language}</p>
                        <div className="single-comic__price">{price}</div>
                    </> 
    
    let imgStyle=null
    let link = '/comics'
    if (dataType === 'character') {
        title = name
        fieldsComic = ''
        imgStyle = {'height' : 'auto'}
        link = '/'
    }    

    return (
        <div className="single-comic faded">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} ${dataType}`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" style={imgStyle}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                {fieldsComic}
            </div>
            <Link to={link} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;