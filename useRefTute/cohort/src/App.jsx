import React, { useRef, useState } from 'react'

const App = () => {

  const [time, setTime] = useState(0);

  const tiemRef = useRef(null);


  const startTimer = () => {
    tiemRef.current = setInterval(() => {
      setTime(time=>time+1)
    },1000)
  }

  const stopTimer = () => {
      clearInterval(tiemRef.current)
      tiemRef.current = null
  }

  const resetTimer = () => {
      stopTimer();
      setTime(0)
  }


  return (
    <div className='parent'>
      <div className='container'>
        <h1>Stop Watch:{time} sec</h1>
        <div className='child'>
          <button onClick={()=>startTimer()} className='btn'>Start</button>
          <button onClick={stopTimer} className='btn'>Stop</button>
          <button onClick={resetTimer} className='btn'>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App

















// ! CODE FOR THEROY OF USE REF 

// import React, { useEffect, useRef, useState } from 'react'

// import '../src/index.css';


// const App = () => {

//   const [count, setCount] = useState(0);


//   const val = useRef(0);

//   const btnRef= useRef();

//   const handleClick = () => {
//       val.current = val.current+1
//       setCount(count+1)
//       console.log(val.current)
//   }

//   const changeColor  =()=>{
//       // #434E78
//       btnRef.current.style.backgroundColor = "#434E78";
//   }

//   useEffect(()=>{
//     console.log("Render Happened...")
//   })
//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={handleClick} className='btn'>Increment</button>
//       <br />
//       <button ref={btnRef} onClick={changeColor} className='btn'>Chnage Coolor of 1</button>
//       <br />
//     </div>
//   )
// }

// export default App