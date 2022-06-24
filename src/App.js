import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import Header from '@/components/Header/Header';
import Login from '@/pages/Login';

function App() {
    let login = false;

    if (login) {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        );
    } else {
        return <Login />;
    }
}

export default App;
