import {useState} from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBondary from "../errorBoundary/ErrorBondary";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [characters, setCharacters] = useState([])
    const [selectedChar, setSelectedChar] = useState(null)
    const [currentCharInd, setCurrentCharInd] = useState(0)

    const onCharactersLoaded = (newCharacters) => {
        setCharacters([...characters, ...newCharacters]) 
    }

    const changeActiv = (id) => { 
        const index = characters.findIndex(elem => elem.id === id)
        const newArr = [...characters]
        newArr[currentCharInd].current = false
        newArr[index].current = true
        
        setCharacters(newArr)
        setCurrentCharInd(index)
        setSelectedChar(id)     
    }

    return (
        <>
            <ErrorBondary>
                <RandomChar/>
            </ErrorBondary>
            <div className="char__content">
                <ErrorBondary>
                    <CharList onCharactersLoaded={onCharactersLoaded}
                            characters={characters}
                            changeActiv={changeActiv}/>
                </ErrorBondary>
                
                <ErrorBondary>
                    <CharInfo charId={selectedChar}
                            characters={characters}/>
                </ErrorBondary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage