import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const dogImg = useRef(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState('loading...')
  const [certainty, setCertainty] = useState('')
  let mobileNetModel = null

  useEffect(() => {
    const loadMobilenet = async () => {
      if (window.mobilenet) {
        mobileNetModel = await window.mobilenet.load()
        setLoading('Loaded!')

        const classifications = await mobileNetModel.classify(dogImg.current)

        console.log('Classes: ', classifications) // logs classes

        setPrediction(classifications[0].className)
        setCertainty(`${Math.round(classifications[0].probability * 100)}%`)
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
        <img src='/pug.jpg' width={325} height={250} alt='pug' ref={dogImg} />
        <p>
          Prediction: {prediction}
        </p>
        <p>
          Certainty: {certainty}
        </p>
      </header>
    </div>
  );
}

export default App;
