import { useEffect, useState } from 'react';
import {useHttp} from '../../hooks/http.hooks';
import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import Spinner from '../spinner/Spinnner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    
    const [characters, setCharacters] = useState([])
    const [comics, setComics] = useState([])
    const [offSet, setOffSet] = useState(310)
    const [offSetComics, setOffSetComics] = useState(310)
    
    const [currentCharInd, setCurrentCharInd] = useState(0)
    const [selectedChar, setSelectedChar] = useState(null)
    const [animation, setAnimation] = useState(true)
    const [newCharId, setNewCharId] = useState(0)
    const [condition, setCondition] = useState('waiting')

    const states = {
        characters: characters, setCharacters: setCharacters,
        comics: comics, setComics: setComics,
        offSet: offSet, setOffSet: setOffSet,
        offSetComics: offSetComics, setOffSetComics: setOffSetComics,
        currentCharInd: currentCharInd, setCurrentCharInd: setCurrentCharInd,
        selectedChar: selectedChar, setSelectedChar: setSelectedChar,
        animation: animation, setAnimation: setAnimation,
        newCharId: newCharId, setNewCharId: setNewCharId,
        condition: condition, setCondition: setCondition,
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

                            <Route exact path='/comics/:comicId'>
                                <SingleComicPage comics={comics}/>
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