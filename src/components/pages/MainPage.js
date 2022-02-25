import {Helmet} from 'react-helmet'
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import ErrorBondary from "../errorBoundary/ErrorBondary";
import CharSearchForm from '../charSearchForm/charSearchForm';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
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
                    <CharList/>
                </ErrorBondary>
                
                <div className='char__wrapper' style={{'position': 'sticky',
                            'top': '0'}}>
                    <ErrorBondary>
                        <CharInfo/>
                    </ErrorBondary>
                    
                    <ErrorBondary>
                        <CharSearchForm/>    
                    </ErrorBondary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage