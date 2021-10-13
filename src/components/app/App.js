import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBondary from "../errorBoundary/ErrorBondary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    
    state = {
        characters: [],
        selectedChar: null,
        currentCharInd: 0 
    }

    onCharactersLoaded = (newCharacters) => {
        this.setState(({characters}) => ({
            characters: [...characters, ...newCharacters] 
        }))
    }

    onCharSelected = id => {
        this.setState({
            selectedChar: id
        })
    }

    changeActiv = (id) => { 
        const {characters, currentCharInd} = this.state
        const index = characters.findIndex(elem => elem.id === id)
        const newArr = [...characters]
        newArr[currentCharInd].current = false
        newArr[index].current = true
        
        this.setState({
            characters: newArr,
            currentCharInd: index
        })  
        
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBondary>
                        <RandomChar/>
                    </ErrorBondary>
                    <div className="char__content">
                        <ErrorBondary>
                            <CharList onCharSelected={this.onCharSelected}
                                    onCharactersLoaded={this.onCharactersLoaded}
                                    characters={this.state.characters}
                                    changeActiv={this.changeActiv}/>
                        </ErrorBondary>
                        
                        <ErrorBondary>
                            <CharInfo charId={this.state.selectedChar}
                                    characters={this.state.characters}/>
                        </ErrorBondary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;