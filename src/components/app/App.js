import {useState} from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBondary from "../errorBoundary/ErrorBondary";

import decoration from '../../resources/img/vision.png';

const App = () => {
    
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
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>
        </div>
    )
}

export default App;