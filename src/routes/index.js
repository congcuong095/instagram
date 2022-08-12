import Home from '@/pages/Home/Home';
import User from '@/pages/User';
import Register from '@/pages/Register';
import Login from '@/pages/Login/Login';
import HomeLogin from '@/pages/HomeLogin';

const publicRoutes = [
    { path: '/', component: HomeLogin },
    { path: '/account/register', component: Register },
    { path: '/account/login', component: Login },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
];

export { publicRoutes, privateRoutes };
