import './index.scss';
import images from '@/images/login-slide-1.png';

function Login() {
    return (
        <div className="container">
            <div className="content">
                <div className="slider">
                    <img src={images} alt="" />
                </div>
                <div className="login">Login</div>
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default Login;
