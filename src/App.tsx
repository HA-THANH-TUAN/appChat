
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

function App() {
  // http://localhost:3003/get-user/
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/account/sign-up' element={<SignUp/>}></Route >
          <Route path='/account/sign-in' element={<SignIn/>}></Route >
          <Route path='/' element={<Private/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/message' element={<Message/>}/>
            <Route path='/reel' element={<Reels/>}/>
            <Route path='/live' element={<LiveStream/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


