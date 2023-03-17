import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthentication } from "../api/AuthenticationApiService";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // async function login(username, password) {
    //     const token = 'Basic ' + window.btoa(username + ":" + password);

    //     try {
    //         const response = await executeAuthentication(token)

    //         if (response.status == 200) {
    //             setAuthenticated(true);
    //             setUsername(username);
    //             setToken(token);
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log("Intercepting and adding a token: " + token);
    //                     config.headers.Authorization = token
    //                     return config
    //                 }
    //             )
    //             return true;
    //         }
    //         else {
    //             logout();
    //             return false;
    //         }
    //     } catch (err) {
    //         logout();
    //         return false;
    //     }
    // }
    async function login(username, password) {

        try {
            const response = await executeJwtAuthentication(username, password)
            const jwtToken = 'Bearer ' + response.data.token
            if (response.status == 200) {
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use(
                    (config) => {
                        // console.log("Intercepting and adding a token: " + jwtToken);
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true;
            }
            else {
                logout();
                return false;
            }
        } catch (err) {
            logout();
            return false;
        }
    }

    const logout = () => {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    };



    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    )
}