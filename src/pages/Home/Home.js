import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline/Timeline';
import Sidebar from '@/components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <Header pageInfo="home" />
            <div className={cx('wrapper')}>
                <div className={cx('main')}>
                    <div className={cx('timeline')}>
                        <Timeline />
                    </div>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
