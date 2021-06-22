import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/homePage/index'
const App = ()=>{
  return(
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component = {HomePage}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;