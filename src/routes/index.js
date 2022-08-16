import Home from '@/pages/Home/Home';
import User from '@/pages/User';
import Register from '@/pages/Register';
import Login from '@/pages/Login/Login';
import HomeLogin from '@/pages/HomeLogin';
import Inbox from '@/pages/Inbox/Inbox';
import Explore from '@/pages/Explore/Explore';

const publicRoutes = [
    { path: '/', component: HomeLogin },
    { path: '/account/register', component: Register },
    { path: '/account/login', component: Login },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/user', component: User },
    { path: '/direct/inbox', component: Inbox },
    { path: '/explore', component: Explore },
];

export { publicRoutes, privateRoutes };
