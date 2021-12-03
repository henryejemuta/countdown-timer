// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
function handleKeyPress (event) {
    // You can put code here to handle the keypress.
    // document.getElementById("last-keypress").innerText = event.key
    console.log(`You pressed ${event.key}`)
  }
  
  window.addEventListener('keyup', handleKeyPress, true)

  let isCleared = false;
  let isPaused = false;
  const strPad = (pad, str, padPos) => {
      if (typeof str === 'undefined')
          return pad;
      if (padPos == 'l') {
          return (pad + str).slice(-pad.length);
      }
      else {
          return (str + pad).substring(0, pad.length);
      }
  }

  const timer = document.querySelector('#Timer');
  let minutes, seconds;



  const setMinutesAndSeconds = () => {
      const timeArr = (timer.innerText).split(":");
      minutes = Number(timeArr[0]);
      seconds = Number(timeArr[1]);
  }

  const updateTimer = () => {
      const min = strPad('00', minutes, 'l');
      const sec = strPad('00', seconds, 'l');
      timer.innerHTML = `${min}:${sec}`;
  }


  const pauseTimer = () => {
      isPaused = true;
      clearInterval(timerHanler);
  }

  const startTimer = () => {
      setMinutesAndSeconds();
      isPaused = false;
      isCleared = false;
      timerHanler = setInterval(countdown, 1000);
  }

  const clearTimer = () => {
      document.body.style.fontSize = '15rem';
      document.body.style.backgroundColor = '#000';
      isCleared = true;
      pauseTimer();
      timer.innerHTML = "10:00";
  }

  const countdown = () => {
      if (seconds > 0) {
          seconds--;
      } else if ((seconds == 0) && (minutes > 0)) {
          seconds = 59;
          minutes--;
      }
      // console.log(seconds, minutes);
      if ((seconds == 0) && (minutes == 0)) {
          pauseTimer();
          document.body.style.fontSize = '8rem';
          document.body.style.backgroundColor = 'RED';
          timer.innerHTML = "TIME's UP";
      }
      else {
          updateTimer();
      }
  }

  setMinutesAndSeconds();
  var timerHanler = setInterval(countdown, 1000);

  document.addEventListener('keydown', (e) => {
      // console.log(e.code);
      if (e.code === "Space") {
          if (isPaused)
              startTimer();
          else
              pauseTimer();
      }
      else if (e.code === "Delete") {
          clearTimer();
      } else if ((e.code === "ArrowUp") && (isCleared || isPaused)) {
          setMinutesAndSeconds();
          seconds = 00;
          if (minutes < 99)
              minutes++;
          updateTimer();
      }
      else if ((e.code === "ArrowDown") && (isCleared || isPaused)) {
          setMinutesAndSeconds();
          seconds = 00;
          if (minutes > 1)
              minutes--;
          updateTimer();
      }

  });
