import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {msg: null};
        this.send = this.send.bind(this);
    }

    send(e) {
        e.preventDefault();
        this.setState({msg: null});

        const data = {
            login: this.nickname.value
            , senha: this.password.value
        };

        axios.post('https://instalura-api.herokuapp.com/api/public/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data);
                this.props.history.push('/timeline');
            })
            .catch((err) => this.setState({msg: err.message}));
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.send}>
                    <input type="text" ref={(input) => this.nickname = input}/>
                    <input type="password" ref={(input) => this.password = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}