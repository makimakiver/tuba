// user action
export const LoginStart = (user) => ({
    type: "LOGIN_START",
    // name of action
})
export const LoginSuccess = (user) => ({
    // user store the state of user
    type: "LOGIN_SUCCESS",
    payload: user,
    // state of the user
})
export const VerifyStart = (user) => ({
    // user store the state of user
    type: "VERIFY_START",
    payload: user,
    // state of the user
})
export const VerifySuccess = (user) => ({
    // user store the state of user
    type: "VERIFY_SUCCESS",
    payload: user,
    // state of the user
})
export const VerifyFail = (verify) => ({
    type: "VERIFY_FAIL",
})

export const VerifyError = (error) => ({
    type: "VERIFY_ERROR",
    payload: error, 
})

export const LoginError = (error) => ({
    type: "LOGIN_ERROR",
    payload: error, 
})
