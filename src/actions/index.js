export const userData = (id,
    name,
    email,
    cnic,
    address,
    phone,
    password,
    provinceId,
    cityId,
    userType,
    stationId) => {

    return {
        type: 'FETCH_USER',
        id: id,
        name:name,
        cnic:cnic,
        email:email,
        address:address,
        phone:phone,
        password:password,
        provinceId:provinceId,
        cityId:cityId,
        stationId: stationId,
        userType: userType,
    }
}

export const isEnglish = (isEnglish) => {
    return {
        type: 'IS_ENGLISH',
        isEnglish: isEnglish
    }
}

export const setImage = (uri, base64) => {
    return {
        type: 'SET_IMAGE',
        uri: uri,
        base64: base64
    }
}

export const resetImage = () => {
    return {
        type: 'RESET_IMAGE',
        uri: '',
        base64: ''
    }
}