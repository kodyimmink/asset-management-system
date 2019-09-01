const GIF_API_KEY = '5oO5lLhtv9hsIC91N2feWW0GLONIysAs';
const GIF_API_URL = 'https://api.giphy.com/v1/gifs/search';

const WORDS_API_KEY = '7c7bfef7cdmsh460a67ad5e27ca2p1decd0jsn5acc9f94e783';
const WORDS_API_URL = 'https://wordsapiv1.p.rapidapi.com/words/?lettersMax=7&partOfSpeech=noun&random=true';


//call giphy api, return data
export function searchGiphyAPI(searchParameter){
  return new Promise((resolve) => {    
    resolve(
      fetch(`${GIF_API_URL}?api_key=${GIF_API_KEY}&q=${searchParameter}&limit=20`, {
        "method": "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept":"application/json"
        })

      })
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => console.error(error))
      )
    });
  }

//call words api, return data
export function searchWordsAPI(){
  return new Promise((resolve) => {
    resolve(
      fetch( WORDS_API_URL, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": WORDS_API_KEY
          }
        })
      .then(response => response.json())
      .then(data => { return data; })
      .catch(error => console.error(error))
      )
    });
  }

