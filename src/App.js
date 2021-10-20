import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [funcShow, setFuncShow] = useState(true);
  const [classShow, setClassShow] = useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="show func?" onClick={() => setFuncShow(!funcShow)}/>
      <input type="button" value="show class?" onClick={() => setClassShow(!classShow)}/>
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}
var funcStyle = "color:blue";
var funcId = 0;
function FuncComp(props) {
  const [number, setNumber] = useState(props.initNumber);
  const [date, setDate] = useState(new Date().toString());

  // side effect
  // 빈 배열을 두번째 인수에 넣을 경우 update에는 실행 되지 않으며 mount 에서만 최초 1회 실행된다.
  useEffect(() => {
    console.log("%cfunc => useEffect  (componentDidMount) " + (++funcId), funcStyle);  
    document.title = number;
    // return () => {
    //   console.log("%cfunc => useEffect return (componentWillUnmount) " + (funcId), funcStyle);  
    // }
  },[]);
  // useEffect(function() , param) - 두번째 인수인 param의 데이터가 변하지 않을 경우 작동하지 않음
  useEffect(() => {
    console.log("%cfunc => useEffect number (componentDidMount & componentDidUpdate) " + (++funcId), funcStyle);  
    document.title = number;
    // return () => {
    //   console.log("%cfunc => useEffect return (componentWillUnmount) " + (funcId), funcStyle);  
    // }
  },[number]);
  useEffect(() => {
    console.log("%cfunc => useEffect date (componentDidMount & componentDidUpdate) " + (++funcId), funcStyle);  
    document.title = date;
    // return () => {
    //   console.log("%cfunc => useEffect return (componentWillUnmount) " + (funcId), funcStyle);  
    // }
  },[date])
  console.log("%cfunc => render " + (++funcId), funcStyle);
  return (
    <div className="container">
      <h2>function stlye component</h2>
      <p>Number : {number}</p>
      <p>Date : {date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}
var classStyle = "color:red";
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString(),
  };
  // https://ko.reactjs.org/docs/react-component.html#the-component-lifecycle
  componentDidMount() {
    console.log("%cclass => componentDidMount", classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("%cclass => shouldComponentUpdate", classStyle);
    return true;
  }
  componentDidUpdate() {
    console.log("%cclass => componentDidUpdate", classStyle);
  }
  componentWillUnmount() {
    console.log("%cclass => componentWillUnmount", classStyle);
  }
  render() {
    console.log("%cclass => render", classStyle);
    return (
      <div className="container">
        <h2>class stlye component</h2>
        <p>Number : {this.state.number}</p>
        <p>Date : {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}

export default App;
