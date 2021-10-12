import {Component} from 'react'
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
    
    state = {
        //characters: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();
    
    componentDidMount() {
        this.loadedCharacters()
    }

    loadedCharacters = () => {
        this.marvelService   
            .getAllCharacters()
            .then(this.props.onCharactersLoaded)
            .catch(this.onError) 
    }

    // onCharactersLoaded = (characters) => {
    //     this.setState({characters})
    // }

    render() {
        const {characters} = this.props
        const {onCharSelected} = this.props
        let elements = '';
        if (characters.length > 0) {
            elements = characters.map(elem => { 
                let imgStyle=''
                if (elem.thumbnail.indexOf('image_not_available') !== -1) {imgStyle ='noImg'}
                return(
                    <li className="char__item"
                        key={elem.id}
                        onClick={() => onCharSelected(elem.id)}>
                           <img src={elem.thumbnail} alt={elem.name} className={imgStyle}/>
                           <div className="char__name">{elem.name}</div>
                    </li>
                )
            });
        }
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elements}
                    {/*<li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;