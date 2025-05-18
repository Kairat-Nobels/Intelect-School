import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import ServicePage from './pages/ServicePage/ServicePage'
import DoctorsPage from './pages/DoctorsPage/DoctorsPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import NewsPage from './pages/NewsPage/NewsPage'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import StaffPage from './pages/StaffPage/StaffPage'
import PrivateRoute from './components/PrivateRoute'
import AdminLayout from './pages/AdminLayout/AdminLayout'
import RecordsPage from './pages/RecordsPage/RecordsPage'
import ReviewsPage from './pages/ReviewsPage/ReviewsPage'
import NewsAdmin from './pages/NewsAdmin/NewsAdmin'

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path={'/shedules'} element={<ServicePage />} />
                        <Route path={'/teachers'} element={<DoctorsPage />} />
                        <Route path={'/news'} element={<NewsPage />} />
                        <Route path={'*'} element={<NotFoundPage />} />
                    </Route>
                    <Route path='/admin' element={
                        <PrivateRoute>
                            <AdminLayout />
                        </PrivateRoute>
                    }>
                        <Route index path='records' element={<RecordsPage />} />
                        <Route path='reviews' element={<ReviewsPage />} />
                        <Route path='services' element={<ServicesPage />} />
                        <Route path='staff' element={<StaffPage />} />
                        <Route path='news' element={<NewsAdmin />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
