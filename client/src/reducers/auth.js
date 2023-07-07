const authReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "AUTH":
          localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));/// this ...action?.data is from auth.js reducers
           //...action?.data  the ? is the optional operator if it is not there then action.data is false then it will throw an error
           //thats why we use ? this to not to through the error   1:43:11 
           //the data we get from the backend is of json type so we need to convert it to string
           return { ...state, data: action?.data };
        case 'LOGOUT':
            localStorage.clear();  // delete the profile item
            return {...state, data : null };
        default:
           return state
    }
}
export default authReducer