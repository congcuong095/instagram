import styles from './Register.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function Register({ propLogin }) {
    const localStore = useLocalStore();
    const homeLoginAccounts = () => {
        if (localStore.get('USER_UID') === null) {
            return [];
        } else {
            return localStore.get('USER_UID');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Form propState="register" isLogin={propLogin} propAccounts={homeLoginAccounts()} />
            <Footer />
        </div>
    );
}

export default Register;
