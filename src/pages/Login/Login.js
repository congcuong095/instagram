import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function Login({ propLogin }) {
    const localStore = useLocalStore();
    const homeLoginAccounts = () => {
        if (localStore.get('USER_UID') === null) {
            return [];
        } else {
            return localStore.get('USER_UID');
        }
    };
    const homeLoginState = () => {
        if (homeLoginAccounts().length == 0) {
            return 'newAccount';
        } else if (homeLoginAccounts().length == 1) {
            return 'oneOldAccount';
        } else if (homeLoginAccounts().length > 1) {
            return 'oldAccount';
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Form propState={homeLoginState()} propAccounts={homeLoginAccounts()} isLogin={propLogin} />
            <Footer haveTopic />
        </div>
    );
}

export default Login;
