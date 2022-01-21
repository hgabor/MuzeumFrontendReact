import logo from './logo.svg';
import './App.css';
import PictureList from './components/PictureList';
import LoginForm from './components/LoginForm';
import LoginRequired from './api/LoginRequired';
import NetworkErrorMessage from './components/NetworkErrorMessage';

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>Link1</li>
          <li>Link2</li>
          <li>Link3</li>
          <LoginRequired>
            <li>Edit own profile</li>
          </LoginRequired>
        </ul>
      </nav>
      <LoginForm />
      <NetworkErrorMessage />
      <LoginRequired>
        <PictureList />
      </LoginRequired>
    </div>
  );
}

export default App;
