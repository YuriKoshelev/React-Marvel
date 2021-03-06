import { useParams, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import {charFethed} from '../charList/charactersSlice';

const SingleComicPage = (props) => {
    const {id} = useParams()
    const [сurrentData , setCurrentData] = useState(null)
    const {dataType} = props
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService()
    const [wayCharacter , setWayCharacter] = useState(false)

    const {characters} = useSelector((state) => state.characters)
    const {comics} = useSelector((state) => state.comics)
    
    const dispatch = useDispatch()

    let list = null

    useEffect(() => {
        if (dataType === 'comic') {
            list = comics
        }
        else {
            list = characters
        }
        const index = list.findIndex(elem => elem.id == id)
        const newData = list[index]
        if (index !== -1) {
            onDataLoaded(newData)
            setProcess('confirmed')        
        } else {
            updateData()
        }

        return () => {
            if (dataType === 'character') {
                dispatch(charFethed(null))
            }  
        }
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError()
        if (dataType === 'character') {
            getCharacter(id)
                .then(onDataLoaded)
                .then(() => {
                    setProcess('confirmed')
                    setWayCharacter(true)})
        }
        else {
            getComic(id)
                .then(onDataLoaded)
                .then(() => {
                    setProcess('confirmed')
                    setWayCharacter(true)})
        }        
    }

    const onDataLoaded = (data) => {
        setCurrentData(data)
    } 

    return(setContent(process, View, сurrentData, dataType, wayCharacter))
}

const View = (props) => {
    const {dataType, data, wayCharacter} = props
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

    if (wayCharacter) {
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