import React from "react";
import { ApiContext } from "../api/api";
import Guest from '../api/Guest';
import LoginRequired from '../api/LoginRequired';

export default class LoginForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            loginError: null,
            email: '',
            password: '',
            userData: null,
        };
    }

    handleEmailChange = (event) => { this.setState({ email: event.currentTarget.value }) };
    handlePasswordChange = (event) => { this.setState({ password: event.currentTarget.value }) };

    handleLogin = async () => {
        const { email, password } = this.state;
        if (email.trim() !== '' && password.trim() !== '') {
            try {
                await this.context.login(email, password);
                // FIXME: Ez oldal újratöltéskor nem fut le!
                const userData = await this.context.getUserData();
                this.setState({
                    loginError: null,
                    email: '',
                    password: '',
                    userData,
                })
            } catch (exception) {
                this.setState({ loginError: exception.message });
            }
            
        }
    };

    render() {
        return <>
          <Guest>
            <div>
                <input type='email' onInput={this.handleEmailChange} /><br/>
                <input type='password' onInput={this.handlePasswordChange} /><br/>
                <button onClick={this.handleLogin}>Login</button>
                { this.state.loginError ? <p>{this.state.loginError}</p> : null }
              </div>
            </Guest>
            <LoginRequired>
            { JSON.stringify(this.state.userData) }
            </LoginRequired>
        </>;
    }
}
