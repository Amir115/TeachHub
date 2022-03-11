import {StrictMode} from "react";
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import './index.css'

import {renderAllRoutes} from "./Routes/Routes";

const App = () => <BrowserRouter>{renderAllRoutes()}</BrowserRouter>

ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById('root'))
