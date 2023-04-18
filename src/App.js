import { useSelector } from 'react-redux';
import './styles/App.css';
import useAuth from './utils/useAuth';
import { useRoutes } from './utils/useRoutes';

function App() {
  const auth = useSelector((state) => state.auth)
  const routes = useRoutes(Boolean(auth.userId));
  useAuth();
  return (
    <>
      {routes}
    </>
  );
}

export default App;