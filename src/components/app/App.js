import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    
    state = {
        characters: {},
        selectedChar: null
    }

    onCharactersLoaded = (characters) => {
        this.setState({characters})
    }

    onCharSelected = id => {
        this.setState({
            selectedChar: id
        })
    }


    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}
                                  onCharactersLoaded={this.onCharactersLoaded}
                                  characters={this.state.characters}/>
                        <CharInfo charId={this.state.selectedChar}
                                  characters={this.state.characters}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;