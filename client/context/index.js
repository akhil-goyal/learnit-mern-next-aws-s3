import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const initialState = {
    user: null
};

// Create Context
const Context = createContext();

// Root Reducer
const rootReducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            return { ...state, user: null }

        default:
            return state;
    }

}

// Context Provider
const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(rootReducer, initialState);

    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: 'LOGIN',
            payload: JSON.parse(window.localStorage.getItem('user'))
        });
    }, []);

    // Axios Interceptors
    axios.interceptors.response.use(
        function (response) {
            // Any status code in the 2XX series will cause this
            // function to trigger.
            return response;

        }, function (error) {
            // Any status code outside the 2XX series will cause this
            // function to trigger.
            let res = error.response;

            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {

                return new Promise((resolve, reject) => {

                    axios.get('/api/logout')
                        .then((data) => {

                            console.log('ERROR 401');
                            dispatch({ type: 'LOGOUT' });
                            window.localStorage.removeItem('user');
                            router.push('/login');

                        }).catch((err) => {
                            console.log('Axio Interceptor Error : ', err);
                            reject(err);
                        });

                })
            }

            return Promise.reject(error);

        });

    useEffect(() => {

        const getCsrfToken = async () => {
            const { data } = await axios.get(`/api/csrf-token`);
            axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
        }

        getCsrfToken();

    }, []);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider }