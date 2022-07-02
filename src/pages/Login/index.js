import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import LoginForm from '@/components/Form/LoginForm/LoginForm';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <Slider />
                </div>
                <div className={cx('form')}>
                    <Form />
                </div>
            </div>
            <Footer topic />
        </div>
    );
}

export default Login;
