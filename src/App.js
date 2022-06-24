import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '@/routes';
import Header from '@/components/Header/Header';

function App() {
    let login = false;

    if (login) {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        );
    } else {
        return (
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
