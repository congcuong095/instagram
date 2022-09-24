import styles from './Register.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form';

const cx = classNames.bind(styles);

function Register({ propLogin }) {
    return (
        <div className={cx('wrapper')}>
            <Form propState="register" isLogin={propLogin} />
            <Footer />
        </div>
    );
}

export default Register;
