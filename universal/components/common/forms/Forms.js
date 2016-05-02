/**
 * Created by Space Invader on 04.04.2016.
 */

import React from 'react'
import ReactDatepicker from 'react-datepicker'
import FaCaret from 'react-icons/lib/fa/caret-down'
import moment from 'moment'
import InputMask from 'react-input-mask'
import ReactSelect from 'react-select'
import ReactFileInput from 'react-file-input'
import s from './forms.pcss'
import classNames from 'classnames/bind'
import './datepicker.pcss'
import 'react-select/dist/react-select.css'
import FaClose from 'react-icons/lib/fa/close'

export class Input extends React.Component {
    render () {
        let st = classNames.bind(s);
        let inputComponent = st({
            inputComponent: true,
            error: this.props.error
        });

        return  <Label label={ this.props.label } required={ this.props.required }>
                    <div className={ inputComponent }>
                        <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />
                        <div className={ s.icon }>{ this.props.icon }</div>
                        <InputMask className={ s.input } type='text' {...this.props} mask={ this.props.mask } />
                    </div>
                </Label>
    }
}

export class Dropdown extends React.Component {
    render () {
        let st = classNames.bind(s);
        let dropdownComponent = st({
            dropdownComponent: true,
            error: this.props.error
        });

        return  <Label label={ this.props.label } required={ this.props.required }>

                    <div className={ dropdownComponent }>
                        <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />

                        <div className={ s.dropdown }>
                            <ReactSelect {...this.props} />
                        </div>
                        <div className={ s.caret }>
                            <FaCaret/>
                        </div>
                    </div>
                </Label>


    }
}

export class FakeDropdown extends React.Component {
    render () {
        let st = classNames.bind(s);
        let fakeComponent = st({
            fakeDropdownComponent: true,
            error: this.props.error
        });

        return  <Label label={ this.props.label } required={ this.props.required }>
                    <div className={ fakeComponent }>
                        <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />
                        <div className={ s.dropdown }>
                            <button className={ s.fake } {...this.props}>
                                { this.props.children }
                            </button>
                        </div>
                        <div className={ s.caret }>
                            <FaCaret/>
                        </div>
                    </div>
                </Label>
    }
}

export class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chars_left: this.props.chars_left || 1000
        };
    }
    handleChange(e) {
        this.setState({
            chars_left: 1000 - e.target.value.length
        });
        this.props.onChange(e);
    }
    render () {
        let st = classNames.bind(s);

        let textareaComponent = st({
            textareaComponent: true,
            error: this.props.error
        });

        let tip;
        if (this.props.counter) {
            tip = <div className={ s.tip }>{this.state.chars_left}</div>
        } else if (this.props.tip !== null) {
            tip = <div className={ s.tip }>{this.props.tip}</div>
        }
        return  <Label label={ this.props.label } required={ this.props.required }>
                    <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />

                    <div className={ textareaComponent }>
                        {tip}
                        <textarea className={ s.textarea } {...this.props} onChange={::this.handleChange} />
                    </div>
                </Label>
    }
}

export class Radio extends React.Component {
    render () {
        return  <div className={ s.radioComponent } required={ this.props.required }>
                    <label className={ s.label }>
                        <input className={ s.radio } type="radio" {...this.props} />
                        <div className={ s.custom }>{ this.props.value }</div>
                    </label>
                </div>
    }
}

export class Checkbox extends React.Component {
    render () {
        return  <div className={ s.checkboxComponent } required={ this.props.required }>
                    <label className={ s.label }>
                        <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />

                        <input className={ s.checkbox } type="checkbox" {...this.props}/>
                        <div className={ s.custom }>{ this.props.value }</div>
                    </label>
                </div>
    }
}

export class Datepicker extends React.Component {
    render () {
        moment.locale('ru');

        let st = classNames.bind(s);
        let datepickerComponent = st({
            datepickerComponent: true,
            error: this.props.error
        });

        return  <Label label={this.props.label} required={ this.props.required }>
                    <div className={ datepickerComponent }>
                        <ErrorPopup errorMessage={ this.props.errorMessage } errorPlacement={ this.props.errorPlacement } isOpen={ this.props.error } />
                        <ReactDatepicker popoverTargetOffset="35px 0px" popoverAttachment="top left" popoverTargetAttachment="top left" {...this.props}/>
                        <div className={ s.caret }>
                            <FaCaret/>
                        </div>
                    </div>
                </Label>
    }
}

export class FileInput extends React.Component {
    render () {
        return  <Label label={ this.props.label } required={ this.props.required }>
                    <div className={ s.fileInputComponent }>
                        <form>
                            <ReactFileInput
                                {...this.props}
                            />
                            <button type="reset" className={ s.reset }><FaClose/></button>
                            <button type="button" className={ s.browse }>Обзор</button>
                        </form>
                    </div>
                </Label>
    }
}

export class Label extends React.Component {
    render () {
        let st = classNames.bind(s);
        let labelComponent = st({
            labelComponent: true,
            required: this.props.required
        });

        return  <div className={ labelComponent }>
                    <label className={ s.label }>
                        <span>{ this.props.label }</span>
                        { this.props.children }
                    </label>
                </div>
    }
}

export class ErrorPopup extends React.Component {
    render () {
        let st = classNames.bind(s);
        let errorPopupComponent = st({
            errorPopupComponent: true,
            open: this.props.isOpen,
            left: this.props.errorPlacement == 'left',
            right: this.props.errorPlacement == 'right'
        });

        return  <div className={ errorPopupComponent } {...this.props}>
                    <div className={ s.wrapper }>{this.props.errorMessage}</div>
                </div>
    }
}

