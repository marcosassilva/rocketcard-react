//Função base para renderizar a página Home dentro de uma root.

import React from 'react';
import ReactDOM from 'react-dom/client';
// Importação dos estilos globais.
import './styles/global.css'

import {Home} from './pages/Home'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
