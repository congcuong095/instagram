import styles from './Inbox.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';

const cx = classNames.bind(styles);

function Inbox() {
    return (
        <>
            <Header pageInfo="inbox" />
            <div className={cx('wrapper')}>Inbox page</div>
        </>
    );
}

export default Inbox;
