import styles from './Register.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { APIaccounts } from '@/GetDataLocal/GetDataLocal';

const cx = classNames.bind(styles);

function Register({ propLogin }) {
    let HomeLoginAccounts = APIaccounts;
    return (
        <div className={cx('wrapper')}>
            <Form propState="register" isLogin={propLogin} propAccounts={HomeLoginAccounts} />
            <Footer />
        </div>
    );
}

export default Register;
