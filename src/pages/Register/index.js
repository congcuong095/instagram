import styles from './Register.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import RegisterForm from '@/components/Form/RegisterForm';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <RegisterForm />
            <Footer />
        </div>
    );
}

export default Register;
