import styles from './HomeLogin.module.scss';
import classNames from 'classnames/bind';

import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { useLocalStore } from '@/hooks';

const cx = classNames.bind(styles);

function HomeLogin({ propLogin }) {
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
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <Slider />
                </div>
                <div className={cx('form')}>
                    <Form propState={homeLoginState()} propAccounts={homeLoginAccounts()} isLogin={propLogin} />
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer haveTopic />
            </div>
        </div>
    );
}

export default HomeLogin;
