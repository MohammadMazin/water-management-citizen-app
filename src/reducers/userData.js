const userState = {
    id: '1',
    name: 'guest',
    cnic: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    provinceId: '',
    cityId: '',
    stationId: '',
    userType: 'worker',
}

export const userReducer = (state = userState, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return state = {
                id: action.id,
                name: action.name,
                cnic: action.cnic,
                email: action.email,
                address: action.address,
                phone: action.phone,
                password: action.password,
                provinceId: action.provinceId,
                cityId: action.cityId,
                stationId: action.stationId,
                userType: action.userType,
            }
        default: {
            return state;
        }
    }
}

export default userReducer