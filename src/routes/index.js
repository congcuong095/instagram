import Home from '@/pages/Home/Home';
import Register from '@/pages/Register';
import Login from '@/pages/Login/Login';
import HomeLogin from '@/pages/HomeLogin';
import Inbox from '@/pages/Inbox/Inbox';
import Explore from '@/pages/Explore/Explore';
import Profile from '@/pages/Profile/Profile';

const publicRoutes = [
    { path: '/', component: HomeLogin },
    { path: '/account/register', component: Register },
    { path: '/account/login', component: Login },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/direct/inbox', component: Inbox },
    { path: '/explore', component: Explore },
    { path: '/:username', component: Profile },
];

export { publicRoutes, privateRoutes };
