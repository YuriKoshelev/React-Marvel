import {useHttp} from '../hooks/http.hooks'

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
          _apiKey = '330b90bf324e81e9c5b107af024540f3',
          _baseOffset = 310;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);      
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);  
        return _transformCharacter(res.data.results[0])
    }

    const getComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`);  
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);  
        return _transformComics(res.data.results[0])
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);  
        if (res.data.results.length === 0) return null
        return _transformCharacter(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        
        let description = char.description ;
        if (!description) description = 'Sorry, no information about this character'
        else { if (description.length > 225) description = description.slice(0, 225) + '...' 
        }

        if (char.comics.items.length === 0) {
            char.comics.items.push({name: 'Sorry, no information about this character'})
        }
        
        return {
            id: char.id,
            name: char.name,
            description: description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
            current: false          
        }
    }

    const _transformComics = (comic) => {
        
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? comic.description : 'There is no description',
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of page',
            language: comic.textObjects.language || 'en-us',            
            url: comic.urls[0].url,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'no price'        
        }
    }

    return {getAllCharacters, 
            getCharacter, 
            getComics, 
            getComic,
            getCharacterByName, 
            clearError,
            process, 
            setProcess}
}

export default useMarvelService;