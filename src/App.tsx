
import { BrowserRouter , Routes, Route} from 'react-router-dom';
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


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/account/sign-up' element={<SignUp/>}></Route >
          <Route path='/account/sign-in' element={<SignIn/>}></Route >
          <Route path='/' element={<Private/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/message/inbox/' element={<Message/>}>
              <Route path='' element={<FielChatEmty/>}></Route>
              <Route path=':userId' element={<FieldChat/>}></Route>
            </Route>
            <Route path='/reel' element={<Reels/>}/>
            <Route path='/live' element={<LiveStream/>}/>
            <Route path='/profile/:userId' element={<Profile/>}/>
            <Route path='/call/' element={<CallCScreen/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


