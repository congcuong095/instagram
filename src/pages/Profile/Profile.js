import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';

const cx = classNames.bind(styles);
function Profile({ propLogin }) {
    return (
        <>
            <Header isLogin={propLogin} />
            <div className={cx('wrapper')}>Profile page</div>
        </>
    );
}

export default Profile;
