import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import UserHeader from '@/components/UserHeader/UserHeader';
import Footer from '@/components/Footer';

const cx = classNames.bind(styles);
function Profile({ propLogin }) {
    return (
        <>
            <Header isLogin={propLogin} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <UserHeader />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Profile;
