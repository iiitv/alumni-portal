import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './Components/Home/index'

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