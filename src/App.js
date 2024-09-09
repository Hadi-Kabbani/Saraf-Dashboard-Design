import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Balance from './pages/Balances';
import Capital from './pages/Capital';
import LebaneseDeposits from './pages/LebaneseDeposits';
import NoPage from './pages/noPage';
import Currencies from './pages/Currencies';
import DebtBook from './pages/DebtBook';
import Inventory from './pages/Inventory';
import Expenses from './pages/Expenses1';
import Filtering from './pages/Filtering';
import RecordBond from './pages/RecordBond';
import Transactions from './pages/Transactions';
import History from './pages/History';
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const countryOptions = [
  // Country options
];

function App() {
  return (
    <Provider store={store}>
      <Router >
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route path='/' element={<PrivateRoute><Balance /></PrivateRoute>} />
            <Route path='/capital' element={<PrivateRoute><Capital /></PrivateRoute>} />
            <Route path='/lebanese-deposits' element={<PrivateRoute><LebaneseDeposits /></PrivateRoute>} />
            <Route path='/expenses' element={<PrivateRoute><Expenses /></PrivateRoute>} />
            <Route path='/filtering' element={<PrivateRoute><Filtering /></PrivateRoute>} />
            <Route path='/record-bond' element={<PrivateRoute><RecordBond /></PrivateRoute>} />
            <Route path='/debt-book' element={<PrivateRoute><DebtBook /></PrivateRoute>} />
            <Route path='/inventory' element={<PrivateRoute><Inventory /></PrivateRoute>} />
            <Route path='/currencies' element={<PrivateRoute><Currencies /></PrivateRoute>} />
            <Route path='/transactions' element={<PrivateRoute><Transactions countryOptions={countryOptions} /></PrivateRoute>} />
            <Route path='/history' element={<PrivateRoute><History /></PrivateRoute>} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider >
  );
}

export default App;
