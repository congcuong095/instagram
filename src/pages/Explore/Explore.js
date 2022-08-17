import styles from './Explore.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';

const cx = classNames.bind(styles);

function Explore() {
    return (
        <>
            <Header pageInfo="explore" />
            <div className={cx('wrapper')}>Explore page</div>
        </>
    );
}

export default Explore;
