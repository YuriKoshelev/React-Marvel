import { useState } from 'react';
import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinnner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
    
    const [characters, setCharacters] = useState([])
    const [comics, setComics] = useState([])
    const [char, setChar] = useState(null)
    const [offSet, setOffSet] = useState(310)
    const [offSetComics, setOffSetComics] = useState(310)
    
    const [currentCharInd, setCurrentCharInd] = useState(0)
    const [selectedChar, setSelectedChar] = useState(null)
    const [animation, setAnimation] = useState(true)
    const [newCharId, setNewCharId] = useState(0)
    const [process, setProcess] = useState('waiting');

    const states = {
        characters: characters, setCharacters: setCharacters,
        comics: comics, setComics: setComics,
        offSet: offSet, setOffSet: setOffSet,
        offSetComics: offSetComics, setOffSetComics: setOffSetComics,
        currentCharInd: currentCharInd, setCurrentCharInd: setCurrentCharInd,
        selectedChar: selectedChar, setSelectedChar: setSelectedChar,
        animation: animation, setAnimation: setAnimation,
        newCharId: newCharId, setNewCharId: setNewCharId,
        process: process, setProcess: setProcess,
        char: char, setChar: setChar,
    }

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Switch>
                            
                            <Route exact path='/'>
                                <MainPage
                                    states={states}/>
                            </Route>

                            <Route exact path='/comics'>
                                <ComicsPage
                                    states={states}/>
                            </Route>

                            <Route exact path='/comics/:id'>
                                <SinglePage list={comics} dataType='comic'/>
                            </Route>

                            <Route exact path='/characters/:id'>
                                <SinglePage list={char} 
                                                 setList={setChar}
                                                 dataType='character'/>
                            </Route>

                            <Route path='*'>
                                <Page404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;