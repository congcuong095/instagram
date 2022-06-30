import styles from './Slider.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import images from '@/assets/images';

const cx = classNames.bind(styles);

function Slider() {
    const [numb, setNumb] = useState(0);
    useEffect(() => {
        const slideArr = document.querySelectorAll('[class*="slider-img"]');
        setTimeout(() => {
            if (numb === 3) {
                slideArr.forEach((slide) => {
                    slide.classList.remove('img-in');
                    slide.classList.remove('img-out');
                });
                slideArr[numb].classList.add('img-out');
                slideArr[0].classList.add('img-in');
                setNumb(0);
            } else {
                slideArr.forEach((slide) => {
                    slide.classList.remove('img-in');
                    slide.classList.remove('img-out');
                });
                slideArr[numb].classList.add('img-out');
                slideArr[numb + 1].classList.add('img-in');
                setNumb(numb + 1);
            }
        }, 5000);
    }, [numb]);
    return (
        <div className={cx('slider')}>
            <img className={`${cx('slider-img')} img-in`} src={images.loginSlide1} alt="" />
            <img className={`${cx('slider-img')} img-out`} src={images.loginSlide2} alt="" />
            <img className={cx('slider-img')} src={images.loginSlide3} alt="" />
            <img className={cx('slider-img')} src={images.loginSlide4} alt="" />
        </div>
    );
}

export default Slider;
