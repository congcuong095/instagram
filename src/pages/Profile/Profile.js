import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
function Profile({ propLogin }) {
    const location = useLocation();
    const username = location.pathname.replace('/', '');
    return (
        <>
            <Header isLogin={propLogin} />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <ProfileHeader username={username} />
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Profile;
