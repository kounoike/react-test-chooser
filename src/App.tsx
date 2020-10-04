import React, { useRef, useState } from 'react';
import './App.css';
import CountUpCanvas from './CountUpCanvas';
import MainSelector from './MainSelector';

const MainDiv = React.forwardRef((({ children }, ref) => (
    <div ref={ref}>{children}</div>
)) as React.ForwardRefRenderFunction<HTMLDivElement, { children?: React.ReactNode }>)

type CountUpData = {
    isMain: boolean,
    interval: number,
    bgColor: string
}

function App() {
  const ref = useRef<HTMLDivElement>(null)

  const [countUps, setCountUps] = useState<CountUpData[]>([
    {
      interval: 500,
      bgColor: "red",
      isMain: true
    },
    {
      interval: 1000,
      bgColor: "green",
      isMain: false
    },
    {
      interval: 2000,
      bgColor: "blue",
      isMain: false
    }
  ])
  let [mainIndex, setMainIndex] = useState(0)
  const setCountUpMain = (idx: number) => {
    console.log(idx, countUps)
    const countUpsCopy = countUps.slice()
    countUpsCopy[mainIndex].isMain = false
    countUpsCopy[idx].isMain = true
    setCountUps(countUpsCopy)
    setMainIndex(idx)
  }
  const addCountUp = () => {
    setCountUps((prev => {
      const hue = (prev.length * 20) % 360
      const interval = Math.random() * 3000 + 100
      return [...prev, { interval: interval, bgColor: `hsl(${hue}, 100%, 50%)`, isMain: false }]
    }))
  }
  const countUpComponents = countUps.map((cup, idx) => (
    <div onClick={() => setCountUpMain(idx)} key={idx}>
      <MainSelector mainRef={ref} isMain={cup.isMain}>
        <CountUpCanvas bgColor={cup.bgColor} interval={cup.interval}></CountUpCanvas>
      </MainSelector>
    </div>
  ))


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ height: "30px", margin: "10px 10px" }}>
        <button onClick={addCountUp}>Add</button>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div id="main" style={{ flex: 1, backgroundColor: "#333333" }}>
          <MainDiv ref={ref}></MainDiv>
        </div>
        <div id="sub" style={{ width: "200px" }}>
          {countUpComponents}
        </div>
      </div>
    </div>
  );
}

export default App;
