import styles from './Explore.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';

const cx = classNames.bind(styles);

function Explore({ propLogin }) {
    return (
        <>
            <Header pageInfo="explore" isLogin={propLogin} />
            <div className={cx('wrapper')}>Explore page</div>
        </>
    );
}

export default Explore;
