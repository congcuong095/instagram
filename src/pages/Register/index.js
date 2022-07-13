import styles from './Register.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form/Form';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <Form props="register" />
            <Footer />
        </div>
    );
}

export default Register;
