import './App.css';
import Home from './components/Home/Home';

import RegressionAlgorithm from './components/Algorithm/Types/LinearRegressionAlgorithm';
import LogisiticAlgorithm from './components/Algorithm/Types/LogisticRegressionAlgorithm';
import NeuralNetworkAlgorithm from './components/Algorithm/Types/NeuralNetworkAlgorithm';
import KNearestNeighborAlgorithm from './components/Algorithm/Types/KNearestNeighborAlgorithm';
import KMeanClusteringAlgorithm from './components/Algorithm/Types/KMeanAlgorithm';

import ScrollToTop from './components/Common/ScrollToTop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/chapter1">
            <RegressionAlgorithm/>
          </Route>
          <Route exact path="/chapter2">
           <LogisiticAlgorithm/>
          </Route>
          <Route exact path="/chapter3">
            <NeuralNetworkAlgorithm/>
          </Route>
          <Route exact path="/chapter4">
            <KNearestNeighborAlgorithm/>
          </Route>
          <Route exact path="/chapter5">
            <KMeanClusteringAlgorithm/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
