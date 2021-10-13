import {Component} from 'react'
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'
import './charList.scss';

class CharList extends Component {
    
    state = {
        loading: true,
        error: false,
        newItemLoading: false,
        offSet: 210,
        charEnded: false
    }

    marvelService = new MarvelService();
    
    componentDidMount() {
        this.loadedCharacters()
    }

    loadedCharacters = () => {
        this.onRequest()   
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then((res) => {
                this.props.onCharactersLoaded(res)
                let charEnded = false 
                if (res.length < 9) charEnded = true
                this.setState({
                    newItemLoading: false,
                    offSet: this.state.offSet + 9,
                    charEnded: charEnded
                }) 
              }
            )
            .catch(this.onError)    
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    render() {
        const {characters, onCharSelected, changeActiv} = this.props
        const {newItemLoading, offSet, charEnded} = this.state
        let elements = '';
        if (characters.length > 0) {
            elements = characters.map(elem => { 
                let imgStyle='', classLi='char__item'
                if (elem.thumbnail.indexOf('image_not_available') !== -1) {imgStyle ='noImg'}
                return(
                    <li className={classLi}
                        key={elem.id}
                        onClick={(e) => {
                            onCharSelected(elem.id)
                            changeActiv(elem.id)
                        }}>
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
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offSet)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    characters: PropTypes.array,
    onCharSelected: PropTypes.func
}

export default CharList;