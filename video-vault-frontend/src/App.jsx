import './App.css'
import { Route , Routes } from 'react-router-dom'
import Body from './pages/Body.jsx'
import Auth from './pages/Auth.jsx'
import Upload from './pages/Upload.jsx'
import PublicVideo from './pages/PublicVideo.jsx'
import VideoList from './pages/VideoList.jsx'
import Details from './pages/Details.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/public/:id" element={<PublicVideo/>} />
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Auth/>} />  
          <Route element={<ProtectedRoutes/>}>
            <Route path="upload" element={<Upload/>} />
            <Route path="videos" element={<VideoList/>} />
            <Route path="videos/:id" element={<Details/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
