import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import Post from '@/components/Post/Post';
import Sidebar from '@/components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('main')}>
                    <div className={cx('timeline')}>
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                </div>

                <div className={cx('header')}>
                    <Header pageInfo="home" />
                </div>
            </div>
        </>
    );
}

export default Home;
