import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListScreen } from './screens/list';

function App() {
  return (
    <>
      <ConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ListScreen/>} path='/' />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
