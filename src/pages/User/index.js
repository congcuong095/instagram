import styles from './User.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';

const cx = classNames.bind(styles);

function User() {
    return (
        <>
            <Header pageInfo="user" />
            <div className={cx('wrapper')}>User page</div>
        </>
    );
}

export default User;
