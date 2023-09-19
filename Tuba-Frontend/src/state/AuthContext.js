import { createContext, useEffect, useReducer } from "react"
import AuthReducer from "./AuthReducer"
// make a value as a global variables(can access from other files)
// define initial state
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null ,
    isFetchng: false,
    error: false,
    verify: false,
}

export const AuthContext = createContext(initialState)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])
    // state will store the state of a user. dispatch
    return(
        // it can offer information to anywhere in the file.
        <AuthContext.Provider value={{
            verify: state.verify,
            user: state.user,
            isFetchng: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )

}