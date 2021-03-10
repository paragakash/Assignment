import React, {  useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {Main} from './components/Main'

import 'bootstrap/dist/css/bootstrap.min.css';

import { getProducts } from './actions/products';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Main />
  );
};

export default App;
