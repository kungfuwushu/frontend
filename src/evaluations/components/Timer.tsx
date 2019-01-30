import { Button } from 'antd';
import * as React from 'react';
interface ClockProps {
    time:any
}
class Clock extends React.Component<ClockProps,{}> {
    format(time:any) {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        let minutesString = minutes.toString().length === 1 ? "0" + minutes : minutes;
        let secondsString = seconds.toString().length === 1 ? 0 + seconds : seconds;
        return minutesString + ':' + secondsString;
      }
    render () {
        const {time}=this.props;
      return (
        <div className="displayedTime">
          <h1>{this.format(time)}</h1>
        </div>
      )
    }
  }
  
  interface TimeState {
      count:number,
      running:boolean
  }

  class Timer extends React.Component<{},TimeState>{
    constructor(props:any) {
      super(props);
      this.state = {
        count: 100,
        running: false,
      }
    }

    componentDidUpdate(prevProps:any, prevState:any) {
      if(this.state.running !== prevState.running){
        switch(this.state.running) {
          case true:
            this.handleStart();
        }
      }
    }
     timer = require('react-native-timer');
    handleStart() {
        console.log(this.timer+"start");
      this.timer = setInterval(() => {
        const newCount = this.state.count - 1;
        this.setState(
          {count: newCount >= 0 ? newCount : 0}
        );
      }, 1000);
    }
    
    handleStop() {
        console.log(this.timer+"stop");
      if(this.timer) {
        clearInterval(this.timer);
        this.setState(
          {running:false}
        );
      }
    }
    
    handleReset() {
        console.log(this.timer+"reset");
      this.setState(
        {count: 100}
      );
    }
    

    
    render() {
     
        const {count} = this.state;
      return (
        <div className="container">
           <Clock time={count}/>
          <Button  onClick={this.handleStart.bind(this)}>start</Button>
          <Button  onClick={this.handleStop.bind(this)}>stop</Button>
          <Button  onClick={this.handleReset.bind(this)}>reset</Button>
        </div>
      )
    }
  }
  
  export default Timer;
