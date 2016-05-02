/**
 * Created by invader on 13.04.16.
 */

import React from 'react'
import { connect } from 'react-redux'
import s from './signUp.pcss'

import { registerUser } from '../../actions/UserActions'

import Menu from '../../components/menu/Menu'
import { Input } from '../../components/common/forms/Forms'
import { Button } from '../../components/common/buttons/Buttons'

import FaUser from 'react-icons/lib/fa/user'
import FaEmail from 'react-icons/lib/fa/envelope'
import FaLock from 'react-icons/lib/fa/lock'

class SignUp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: this.props.name || '',
            email: this.props.email || '',
            password: this.props.password || ''
        };
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.dispatch(registerUser({
            username: this.state.email,
            role: 'common-user',
            name: this.state.name,
            password: this.state.password}));
    }

    render () {
        return  <div>
                    <Menu/>

                    <div className={ s.main }>

                        <div className={ s.signup }>
                            <h2 className={ s.title }>Sign Up</h2>

                            <div className={ s.form }>
                                <form>
                                    <Input label="Nickname" icon={ <FaUser/> } placeholder="xxxKOJI9IHxxx" onChange={::this.handleNameChange} value={this.state.name}/>
                                    <Input label="Login" icon={ <FaEmail/> } placeholder="user@example.com" onChange={::this.handleEmailChange} value={this.state.email}/>
                                    <Input label="Password" icon={ <FaLock/> } onChange={::this.handlePasswordChange} value={this.state.password} type="password"/>
                                    <div className={ s.button }>
                                        <Button type="submit" onClick={::this.handleSubmit}>Register</Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
    }
}

export default connect(() => ({}))(SignUp)