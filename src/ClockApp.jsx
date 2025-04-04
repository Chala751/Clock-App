import React,{useState,useEffect} from 'react'

function ClockApp() {

    const [time,setTime]=useState(new Date())
    const [isMilitaryTime, setIsMilitaryTime] = useState(false);
    const [showSeconds, setShowSeconds] = useState(true);
    const [clockColor, setClockColor] = useState('#ffffff');
    const [showControls, setShowControls] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const [currentWeather, setCurrentWeather] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setTime(now);
            
            
            if (now.getSeconds() % 2 === 0) {
                setIsPulsing(true);
                setTimeout(() => setIsPulsing(false), 300);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const weatherConditions = ['☀️ Sunny', '⛅ Cloudy', '🌧️ Rainy', '❄️ Snowy', '🌤️ Partly Cloudy'];
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        setCurrentWeather(randomWeather);
    }, []);

    function formatTime(){
        let hours=time.getHours()
        const minutes=time.getMinutes()
        const seconds=time.getSeconds()
        const meridiem=hours>=12 ? "PM" : "AM";

        if (!isMilitaryTime) {
            hours = hours % 12 || 12;
        }

        let timeString = `${padZero(hours)}:${padZero(minutes)}`;
        
        if (showSeconds) {
            timeString += `:${padZero(seconds)}`;
        }
        
        if (!isMilitaryTime) {
            timeString += ` ${meridiem}`;
        }

        return timeString;
    }

    function padZero(number){
        return (number<10 ? "0":"")+number
    }
    function toggleTimeFormat() {
        setIsMilitaryTime(!isMilitaryTime);
    }
    function toggleSeconds() {
        setShowSeconds(!showSeconds);
    }
    function changeClockColor() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setClockColor(randomColor);
    }

    function getDateString() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return time.toLocaleDateString(undefined, options);
    }

    function getGreeting() {
        const hour = time.getHours();
        if (hour < 12) return 'Good Morning!';
        if (hour < 18) return 'Good Afternoon!';
        return 'Good Evening!';
    }

  return (
    <div className='clock-container'>
      <div className="clock" style={{ color: clockColor }}>
        <span>{formatTime()}</span>
      </div>
      <div className="greeting">{getGreeting()}</div>
      <div className="date">{getDateString()}</div>
      <div className="weather">{currentWeather}</div>
      <button 
                className="toggle-controls"
                onClick={() => setShowControls(!showControls)}
            >
                {showControls ? 'Hide Controls' : 'Show Controls'}
     </button>

     {showControls && (
                <div className="controls">
                    <button onClick={toggleTimeFormat}>
                        {isMilitaryTime ? '12-Hour Format' : '24-Hour Format'}
                    </button>
                    <button onClick={toggleSeconds}>
                        {showSeconds ? 'Hide Seconds' : 'Show Seconds'}
                    </button>
                    <button onClick={changeClockColor}>Change Color</button>
                    <div className="time-until">
                        Next hour in: {60 - time.getMinutes()} minutes
                    </div>
                </div>
            )}
    </div>
  )
}

export default ClockApp
