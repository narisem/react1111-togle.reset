import { useEffect, useState, useLayoutEffect } from "react";

const Example = () => {
  const [isDisp, setIsDisp] = useState(true);

  return (
    <>
      {isDisp && <Timer/>}
      <button onClick={() => setIsDisp(prev => !prev)}>공개/비공개</button>
    </>
  )
}

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // console.log('init');
    let intervalId = null;
    if(isRunning){
      intervalId = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      // console.log('interval running');

    }
    return () => {
      window.clearInterval(intervalId)
      // console.log('end');
    }
  }, [isRunning])
  
  useEffect(() => {
    // console.log('updated');
    
    document.title = 'counter:' + time;
    window.localStorage.setItem('time-key', time);

    return () => {
      // debugger
      // console.log('updated end');
    }
  }, []);

  // useLayoutEffect(() => {
  //   const _time = parseInt(window.localStorage.getItem('time-key'));
  //   if(!isNaN(_time)) {
  //     setTime(_time);
  //   }
  // }, [isRunning])

  const toggle = () => {
    setIsRunning(prev => !prev);
  }
  const reset = () => {
    setTime(0);
    setIsRunning(false);
  }

  return (
    <>
    
    <h3>
      <time>{time}</time>
      <span>초 경과</span>
    </h3>
    <div>
      <button onClick={toggle}>{isRunning ? '일시중지' : '시작'}</button>
      <button onClick={reset}>처음부터</button>
    </div>
    </>
    );
};

export default Example;
