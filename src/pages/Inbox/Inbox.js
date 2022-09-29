import styles from './Inbox.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';

const cx = classNames.bind(styles);

function Inbox({ propLogin }) {
    return (
        <>
            <Header pageInfo="inbox" isLogin={propLogin} />
            <div className={cx('wrapper')}>Inbox page - Tính năng chưa được hoàn thiện</div>
        </>
    );
}

export default Inbox;
