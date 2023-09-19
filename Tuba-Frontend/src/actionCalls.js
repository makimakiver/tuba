import axios from 'axios'

export const loginCall = async(user, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try{
        const response = await axios.post("auth/login", user)
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
    }catch(err){
        dispatch({ type: "LOGIN_ERROR", payload: err })
    }
}
export const verifyCall = async(id, key, email, dispatch) => {
    dispatch({ type: "VERIFY_START" })
    try{
        console.log("the ID information from action call: ", id, "key: ", key)  
        const response = await axios.put(`/otp/${id}`, key)
        console.log(response)
        console.log(response.data.verified)
        if (response.data.verified === true){
            console.log("hello", email)
            let the_user = await axios.get(`/users/email/email?email=${email}`)
            console.log(the_user.data)
            dispatch({ type: "VERIFY_SUCCESS", payload: the_user.data })
            await axios.delete(`/otp/${id}`)
        }else{
            dispatch({ type: "VERIFY_FAIL", payload: response.data })
        }
    }catch(err){
        console.log(err)
        dispatch({ type: "VERIFY_ERROR", payload: err })
    }
}