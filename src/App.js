import './App.css';
import Home from './components/Home/Home';

import RegressionAlgorithm from './components/Algorithm/Types/LinearRegression/LinearRegressionAlgorithm';
import LogisiticAlgorithm from './components/Algorithm/Types/LogisticRegression/LogisticRegressionAlgorithm';
import NeuralNetworkAlgorithm from './components/Algorithm/Types/NeuralNetworkAlgorithm';
import KNearestNeighborAlgorithm from './components/Algorithm/Types/KNearestNeighborAlgorithm';
import KMeanClusteringAlgorithm from './components/Algorithm/Types/KMeanAlgorithm';
import ObjectDetectionAlgorithm from './components/Algorithm/Types/ObjectDetectionAlgorithm';

import ScrollToTop from './components/Common/ScrollToTop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        
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
              <ObjectDetectionAlgorithm/>
            </Route>
            <Route exact path="/chapter5">
              <KNearestNeighborAlgorithm/>
            </Route>
            <Route exact path="/chapter6">
              <KMeanClusteringAlgorithm/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
