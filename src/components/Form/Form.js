import { useCallback, useEffect, useState } from 'react';
import styles from './Form.module.scss';
import classNames from 'classnames/bind';

import images from '@/assets/images';
import AutoForm from './AutoForm/AutoForm';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Ask from './Ask/Ask';

const cx = classNames.bind(styles);

function Form({ propState, propAccounts }) {
    const [formState, setFormState] = useState(propState);
    const [formAccounts, setFormAccounts] = useState(propAccounts);
    const [comp, setComp] = useState(<LoginForm />);
    useEffect(() => {
        if (formState == 'newAccount') {
            setComp(<LoginForm />);
        } else if (formState == 'oldAccount') {
            setComp(
                <AutoForm
                    propAccounts={formAccounts}
                    propState={formState}
                    onChangeLogin={handleChangeToLogin}
                    onChangeRegister={handleChangeToRegister}
                    onChangeAuto={handleChangeToAuto}
                    onChangeAutoOne={handleChangeToAutoOne}
                />,
            );
        } else if (formState == 'register') {
            setComp(<RegisterForm />);
        } else if (formState == 'oneOldAccount') {
            setComp(
                <AutoForm
                    propAccounts={formAccounts}
                    propState={formState}
                    onChangeLogin={handleChangeToLogin}
                    onChangeRegister={handleChangeToRegister}
                    onChangeAuto={handleChangeToAuto}
                    onChangeAutoOne={handleChangeToAutoOne}
                />,
            );
        }
    }, [formState]);

    const handleChangeToLogin = useCallback(() => {
        setFormState('newAccount');
    }, []);

    const handleChangeToRegister = useCallback(() => {
        setFormState('register');
    }, []);
    const handleChangeToAuto = useCallback(() => {
        setFormState('oldAccount');
    }, []);
    const handleChangeToAutoOne = useCallback(() => {
        setFormState('oneOldAccount');
    }, []);

    return (
        <>
            <div className={cx('main')}>
                <div className={cx('form')}>{comp}</div>
                {formState != 'oneOldAccount' ? (
                    <>
                        <div className={cx('login-ask')}>
                            <Ask
                                propState={formState}
                                onChangeLogin={handleChangeToLogin}
                                onChangeRegister={handleChangeToRegister}
                                onChangeAuto={handleChangeToAuto}
                            />
                        </div>
                        <div className={cx('app')}>
                            <div className={cx('app-title')}>T???i ???ng d???ng</div>
                            <div className={cx('app-img')}>
                                <a href="/">
                                    <img src={images.appstore} alt="App Store" className={cx('appstore')} />
                                </a>
                                <a href="/">
                                    <img src={images.googleplay} alt="Google Play" className={cx('googleplay')} />
                                </a>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default Form;
