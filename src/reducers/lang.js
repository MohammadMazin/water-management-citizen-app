const userState = {
isEnglish: true
}

export const languageReducer = (state =userState, action) => {
    switch (action.type){

        case 'IS_ENGLISH':
            return state = {
                isEnglish: !action.isEnglish
            }
        default: {
                return state;
         }
    }
}

export default languageReducer