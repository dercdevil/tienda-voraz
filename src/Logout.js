import { Component } from 'react';

export default class Logout extends Component {

    UNSAFE_componentWillMount() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        window.location.href= "/"; 

    }

    render() {
        return null;
    }
}