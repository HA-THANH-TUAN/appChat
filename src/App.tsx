
import { BrowserRouter , Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { Home } from './Pages/Home';
import LiveStream from './Pages/LiveStream';
import { Reels } from './Pages/Reels';
import Profile from './Pages/Profile';
import { Message } from './Pages/Message';
import SignIn from './Pages/SignIn';
import Private from './Pages/Private';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import FieldChat from './Layouts/FieldChat/FieldChat';
import FielChatEmty from './Layouts/FieldChat/FielChatEmty';
import CallCScreen from './Pages/CallCScreen';
import Navbar from './Layouts/Navbar/Navbar';
import useAuth from './Utils/checkAuth';
import PrivateRoute from './Pages/Private';
import { useAppSelector } from './app/hooks/useCustomReduxTookit';
import { selectorIsLogin } from './features/auth/authSlice';
import MyContextProvider from './app/context/MyContextProvider';
import { initialContext } from './app/context/context';
import { selectIsPageCall } from './features/call/callSlice';

function App() {
  
  const isLogin = useAppSelector(selectorIsLogin)
  const  isPageCall= useAppSelector(selectIsPageCall)

  return (
    <MyContextProvider initialValue={initialContext}>
      <div className='flex'>
        <BrowserRouter>
          {isLogin && !isPageCall && <Navbar/>} 
          <Routes>
            <Route path='/account/sign-up' element={<SignUp/>}></Route >
            <Route path='/account/sign-in' element={<SignIn/>}></Route >
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isLogin} outlet={<Home/>} />}/>

            <Route path='/message/:type' element={<PrivateRoute isAuthenticated={isLogin} outlet={<Message/>} /> }>
              <Route path='' element={<FielChatEmty/>}/>
              <Route path=':conversationId' element={<FieldChat/>}/>
            </Route>

            {/* <Route path='/message/inbox/:conversationId' element={<Message/>}/> */}

            <Route path='/reel' element={<PrivateRoute isAuthenticated={isLogin} outlet={<Reels/>}/>} />

            <Route path='/live' element={<PrivateRoute isAuthenticated={isLogin} outlet={<LiveStream/>}/>} />

            <Route path='/call/' element={<PrivateRoute isAuthenticated={isLogin} outlet={<CallCScreen/>}/>} />

            <Route path='/profile/:userId' element={<PrivateRoute isAuthenticated={isLogin} outlet={<Profile/>}/>} />

            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </MyContextProvider>
  );
}

export default App;


