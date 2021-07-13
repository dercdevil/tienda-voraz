import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const isAuth = () => {
    if(localStorage.getItem('token') !== null) {
        return true
    }
    return false;
};


const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => 
            isAuth() ? (
                <Component {...props} />
            ): (
                <Redirect 
                    to={{
                        pathname: '/404',
                        // state: { message: 'Usuario no Autorizado por el Sistema' }
                    }}
                />
            )}
        />
    );
}
export default PrivateRoute;