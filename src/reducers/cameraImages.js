const imageState = {
    uri: 'qwe',
    base64: ''
}

export const imageReducer = (state = imageState, action) => {
    switch (action.type) {

        case 'SET_IMAGE':
            return state = {
                imageState: {
                    uri: action.uri,
                    base64: action.base64
                }
            }
        case 'REMOVE_IMAGE':
            return state = {
                uri: '',
                base64: ''
            }
        default: {
            return state;
        }
    }
}

export default imageReducer