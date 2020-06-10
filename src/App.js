import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState('loading...')
  let mobileNetModel = null

  useEffect(() => {
    const loadMobilenet = async () => {
      if (window.mobilenet) {
        mobileNetModel = await window.mobilenet.load()
        setLoading('Loaded!')
      } else {
        setTimeout(loadMobilenet(), 1000)
      }
    }
    loadMobilenet()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>MobileNet Status: {loading}</p>
        <p>Dog: Pug</p>
        <img src='/pug.jpg' width={325} height={250} alt='pug' />
        <p>
          Prediction: {prediction}
        </p>
      </header>
    </div>
  );
}

export default App;
