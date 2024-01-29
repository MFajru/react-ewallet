import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { Provider } from 'react-redux';
import { store } from '@/stores/stores';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
