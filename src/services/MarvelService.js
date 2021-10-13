class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '330b90bf324e81e9c5b107af024540f3';
    _baseOfset = 210;

    getResource = async (url) => {          
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);  
        }
        return await res.json();        
    }

    getAllCharacters = async (offset = this._baseOfset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);  
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);  
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        let description = char.description ;
        if (!description) description = 'Sorry, no description'
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

}

export default MarvelService;