import {types} from './types';

export const actions = {
    setImagesArray(imagesArray){
        return {
            type: types.SET_IMAGES_ARRAY,
            payload: imagesArray
            }
        },
    setRandomWord(randomWord = ''){
        return {
            type: types.SET_RANDOM_WORD,
            payload: randomWord
        }
    }    
}
    
