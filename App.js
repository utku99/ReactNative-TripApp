import AppNavigation from './navigation/AppNavigation.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
