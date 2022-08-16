import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header/Header';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <Header pageInfo="home" />
            <div className={cx('wrapper')}>Home page</div>
        </>
    );
}

export default Home;
