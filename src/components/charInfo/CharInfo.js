import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '../skeleton/Skeleton';

import { charOnClick,
        charactersChangeActive,
        charactersChangeAnimation} from '../charList/charactersSlice';


const CharInfo = (props) => {

    //const {charId, process} = props
    const {characters, charactersAnimation, charactersActiv, charClick} = useSelector((state) => state.characters)
    const dispatch = useDispatch()

    const duration = 700;

    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };

    // const changeActiv = () => {  
    //     //states.setAnimation(true)
    //     dispatch(charactersChangeAnimation(false))
    //     // const index = states.newCharId
    //     // const newArr = [...states.characters]
    //     // newArr[states.currentCharInd].current = false
    //     // newArr[index].current = true
        
    //     //states.setCharacters(newArr)
    //     //states.setCurrentCharInd(index)
    //     //states.setSelectedChar(newArr[index].id)     
    // }

    const updateChar = () => {
        if (charactersActiv === null) {
            return null;
        }
        // const index = characters.findIndex(elem => elem.id === charactersActiv)
        // const char = characters[index]
        // return(char)
        return(characters[charactersActiv])
    }

    const setContent = (data) => { 
        if (charactersActiv !== null) {
            return <View data={data}/>
        }  
        else {
            return <Skeleton/>
        }        
    }

    const onClickBack = () => {
        dispatch(charOnClick(false))
    }

    const char = updateChar() 

    const data = {
        char: char,
        onClickBack: onClickBack
    }

    let charInfoClass = 'char__info faded'
    if (charClick) {
        charInfoClass = 'char__info faded char__info-activ'
    }

    return (
        // <Transition
        //     in={charactersAnimation} 
        //     timeout={duration}
        //     onExited={() => changeActiv()}>
        //     {state => (
        //         <div className={charInfoClass}
        //             style={{
        //                 ...defaultStyle,
        //                 ...transitionStyles[state]
        //             }}>
        //             {setContent(data)}
        //         </div>
        //     )}
        // </Transition>
        <div className={charInfoClass}>
            {setContent(data)}
        </div>        
    )
}

const View = ({data}) => {
    const {name, thumbnail, homepage, wiki, description, comics} = data.char
    const {onClickBack} = data
    
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
            
            <div className='char__back'
                 onClick={() => onClickBack()}>Back</div>
        </>
    )
}

export default CharInfo;