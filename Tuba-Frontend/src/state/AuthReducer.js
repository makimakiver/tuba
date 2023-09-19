const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
           return{
            user: null,
            verify: false,
            isFetching: true,
            error: false
        }
        case "LOGIN_SUCCESS":
           return{
            user: action.payload,
            verify: false,
            isFetching: false,
            error: false,
        }
        case "VERIFY_START":
           return{
            user: action.payload,
            verify: false,
            isFetching: false,
            error: false,
        }
        case "VERIFY_SUCCESS":
           return{
            user: action.payload,
            verify: true,
            isFetching: false,
            error: false,
        }
        case "VERIFY_FAIL":
           return{
            user: null,
            verify: false,
            isFetching: false,
            error: false,
        }
        case "LOGIN_ERROR":
           return{
            user: null,
            verify: false,
            isFetching: true,
            error: action.payload,
        };
        case "VERIFY_ERROR":
           return{
            user: null,
            verify: false,
            isFetching: true,
            error: action.payload,
        };
    default:
        return state;
    }
}

export default AuthReducer