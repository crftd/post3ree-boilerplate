/**
 * Created by Space Invader on 10.04.2016.
 */

import React from 'react';
import { connect } from 'react-redux';
import FaEmail from 'react-icons/lib/fa/envelope';
import FaLock from 'react-icons/lib/fa/lock';

import s from './signIn.pcss';
import { loginUser } from '../../actions/UserActions';
import Menu from '../../components/menu/Menu';
import { Input } from '../../components/common/forms/Forms';
import { Button } from '../../components/common/buttons/Buttons';


class SingIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            email: this.props.email || '',
            password: this.props.password || '',

            emailError: false,
            passwordError: false,
        };
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const mailRegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z]|digital|xxx)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        let errors = false;
        this.setState({
            emailError: false,
            passwordError: false,
        });

        if (this.state.password === '') {
            errors = true;
            this.setState({ passwordError: true });
        }

        if (!mailRegExp.test(this.state.email)) {
            errors = true;
            this.setState({ emailError: true });
        }

        if (!errors) {
            this.props.dispatch(loginUser({ username: this.state.email, password: this.state.password }));
        }
    }

    render() {
        return <div>
                    <Menu/>

                    <div className={ s.main }>

                        <div className={ s.signin }>
                            <h2 className={ s.title }>Sign In</h2>

                            <div className={ s.form }>
                                <form>
                                    <Input
                                        label="Username"
                                        icon={ <FaEmail/> }
                                        placeholder="user@example.com"
                                        onChange={::this.handleEmailChange}
                                        value={this.state.email}
                                        error={this.state.emailError}
                                        errorMessage="Incorrect username"
                                        errorPlacement="right"
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        icon={ <FaLock/> }
                                        onChange={::this.handlePasswordChange}
                                        value={this.state.password}
                                        error={this.state.passwordError}
                                        errorMessage="Incorrect password"
                                        errorPlacement="right"
                                    />
                                    <div className={ s.button }>
                                        <Button
                                            type="submit"
                                            onClick={::this.handleSubmit}
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>;
    }
}

export default connect(() => ({}))(SingIn);