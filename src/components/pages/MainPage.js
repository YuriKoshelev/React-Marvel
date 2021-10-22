import {useState, useEffect} from "react";
import {Helmet} from 'react-helmet'
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBondary from "../errorBoundary/ErrorBondary";

import decoration from '../../resources/img/vision.png';

const MainPage = (props) => {

    const {states} = props

    const onCharactersLoaded = (newCharacters) => {
        states.setCharacters([...states.characters, ...newCharacters]) 
    }

    const setChangeId = (id) => { 
        if (id === states.selectedChar) return(null)
        states.setAnimation(false)  
        states.setNewCharId(states.characters.findIndex(elem => elem.id === id))
    }    

    const changeActiv = () => {  
        states.setAnimation(true)
        const index = states.newCharId
        const newArr = [...states.characters]
        newArr[states.currentCharInd].current = false
        newArr[index].current = true
        
        states.setCharacters(newArr)
        states.setCurrentCharInd(index)
        states.setSelectedChar(newArr[index].id)     
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBondary>
                <RandomChar/>
            </ErrorBondary>
            <div className="char__content">
                <ErrorBondary>
                    <CharList onCharactersLoaded={onCharactersLoaded}
                              setChangeId={setChangeId}
                              states={states}
                            />
                </ErrorBondary>
                
                <ErrorBondary>
                    <CharInfo charId={states.selectedChar}
                            characters={states.characters}
                            animation={states.animation}
                            setAnimation={states.setAnimation}
                            changeActiv={changeActiv}
                            condition={states.condition}/>
                </ErrorBondary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage