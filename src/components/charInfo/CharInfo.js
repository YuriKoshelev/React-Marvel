import { Link } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';

const CharInfo = (props) => {

    const updateChar = () => {
        const {charId, characters} = props
        if (!charId) {
            return null;
        }

        const index = characters.findIndex(elem => elem.id === charId)
        const char = characters[index]
        return(char)

    }

    const char = updateChar()
    const content = char ? <View char={char}/> : <Skeleton/>

    return (
        <div className="char__info">
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, thumbnail, homepage, wiki, description, comics} = char
    let imgStyle={'objectFit' : 'cover'}
    if (thumbnail.indexOf('image_not_available') !== -1) {
        imgStyle={'objectFit' : 'fill'}
    }
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">    
                {
                    comics.map((item, i) => {
                        if (i > 9) return(null)
                        let comicId = item.resourceURI
                        if (comicId) { 
                            comicId = item.resourceURI.substr(item.resourceURI.length-5, 5)
                            return (
                                <li key={i} className="char__comics-item">
                                    <Link to={`/comics/${comicId}`}>
                                    {item.name}
                                    </Link>
                                </li>
                            ) 
                        }
                        else {
                            return (
                                <li key={i} className="char__comics-item">
                                    {item.name}
                                </li>
                            ) 
                        }
                    })
                }
            </ul>
        </>
    )
}


export default CharInfo;