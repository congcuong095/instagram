import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Post from '@/components/Post/Post';
import Sidebar from '@/components/Sidebar/Sidebar';

const cx = classNames.bind(styles);

function Home({ propLogin }) {
    const [UID, setUID] = useState('');
    const [listPost, setListPost] = useState([]);

    //Get data

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUID(user.uid);
                getData(user.uid);
            }
        });
    }, []);

    const getData = async (UID) => {
        const docRef = doc(db, 'posts', UID);
        const docSnap = await getDoc(docRef);
        setListPost(docSnap.data().post);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('main')}>
                    <div className={cx('timeline')}>
                        {listPost.length > 0 &&
                            listPost.map((item, index) => {
                                return (
                                    <>
                                        <Post key={index} code={item} />
                                    </>
                                );
                            })}
                    </div>
                    <div className={cx('sidebar')}>
                        <Sidebar />
                    </div>
                </div>

                <div className={cx('header')}>
                    <Header pageInfo="home" isLogin={propLogin} />
                </div>
            </div>
        </>
    );
}

export default Home;
