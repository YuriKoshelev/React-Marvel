import {useHttp} from '../hooks/http.hooks'

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

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

    const _transformCharacter = (char) => {
        let description = char.description ;
        if (!description) description = 'Sorry, no information about this character'
        else { if (description.length > 270) description = description.slice(0, 270) + '...' 
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

    return {loading, error, getAllCharacters, getCharacter, clearError}
}

export default useMarvelService;