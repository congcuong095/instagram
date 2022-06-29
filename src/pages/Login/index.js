import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import images from '@/assets/images';

import LoginForm from '@/components/Form/LoginForm';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const slideArr = document.querySelectorAll('.slide-img');
    console.log(slideArr);
    const [numb, setNumb] = useState('0');

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         slideArr.forEach((slide, index) => {
    //             slide.classList.add('img-in')
    //         })
    //         slideArr[numb].classList.remove('img-in');
    //         slideArr[numb].classList.add('img-out');
    //         slideArr[numb + 1].classList.add('img-in');
    //         slideArr[numb + 1].classList.remove('img-out');
    //         setNumb(numb + 1);
    //     }, 2000);
    // }, [numb]);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('slider')}>
                    <img className={cx('slider-img', 'img-out')} src={images.loginSlide1} alt="" />
                    <img className={cx('slider-img', 'img-in')} src={images.loginSlide2} alt="" />
                    {/* <img className={cx('slider-img')} src={images.loginSlide3} alt="" />
                    <img className={cx('slider-img')} src={images.loginSlide4} alt="" /> */}
                </div>
                <LoginForm />
            </div>
            <div className={cx('footer')}>
                <div className={cx('footer-menu')}>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Meta
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Giới thiệu
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Blog
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Việc làm
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Trợ giúp
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            API
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Quyền riêng tư
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Điều khoản
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Tài khoản liên quan nhất
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Hashtag
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Vị trí
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Instagram Lite
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Tải thông tin người liên hệ lên & người không phải người dùng
                        </a>
                    </div>
                </div>
                <div className={cx('footer-topics')}>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Khiêu vũ
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Ẩm thực
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Nhà & vườn
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Âm nhạc
                        </a>
                    </div>
                    <div className={cx('footer-item')}>
                        <a className={cx('footer-link')} href="/">
                            Nghệ thuật thị giác
                        </a>
                    </div>
                </div>
                <div className={cx('footer-copyrights')}>
                    <Button text small rightIcon={<FontAwesomeIcon icon={faChevronDown} />} className={cx('language')}>
                        Tiếng Việt
                    </Button>
                    <p>© 2022 Instagram from Meta</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
