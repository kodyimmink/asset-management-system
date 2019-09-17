import { types } from './types';
import { initialState } from './initialState';

export default (state = initialState, action) => {
    switch (action.type) {
      case types.SET_IMAGES_ARRAY: {
        return {
          ...state,
          imagesArray: action.payload,
          haveImageData: true
        }
      }
      case types.SET_RANDOM_WORD: {
        return {
          ...state,
          randomWord: action.payload
        }
      }
      default:
        return state
    }
  }