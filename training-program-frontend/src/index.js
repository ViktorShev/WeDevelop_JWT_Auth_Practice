import React from 'react'
import ReactDOM from 'react-dom'

import './styles/global.scss'

import MainApp from './main_app'

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
)
