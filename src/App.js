
import './App.css';


import SplitPane, { Pane } from 'react-split-pane';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import deflate from 'deflate-js'

import TextEditor from 'react-local-store-left-text-pane'

const BASE_64_MAP="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const PUML_64_MAP="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"

const encode=(value)=>{

  const arr =  Buffer.from(value);
  const base64MapExpr= Buffer.from(deflate.deflate(arr)).toString("base64");
  const puml = Array.prototype.map.call(base64MapExpr, function (char) {

    const index=BASE_64_MAP.indexOf(char)
    return PUML_64_MAP.charCodeAt(index);
  });
  
  return  Buffer.from(puml).toString("utf8");
}



const getURL=(value)=>{

  return `http://t420.doublechaintech.cn:2080/plantuml/svg/${encode(value)}`
}

function App() {

  const [text,setText]=useState("")
  //onDidChangeModelContent
  return (
    <SplitPane split="vertical" minSize={200} defaultSize={400}>
  <div >

  <TextEditor text={text} setText={setText}/>

  </div>
  <div >    
     <img  style={{height:"70vh",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px"}}
      alt="generated image"
      src={getURL(text)}/></div>
</SplitPane>
  );
}

export default App;
/*
function App() {

  const [text,setText]=useState("license")

  return (
    <>
    <Row style={{height:"100vh"}}>
      <Col  xs={4} md={4}>
        <textarea 
          cols={500} style={{height:"90vh",width:"90%",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px",fontSize:"20px"}}
          value={text}
          onChange={(event)=>setText(event.target.value)}
        /></Col>
      <Col  xs={8} md={8} >

      <img  style={{height:"70vh",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px"}}
      alt="generated image"
      src={getURL(text)}/>
     
      </Col>
    </Row>
    </>
  );
}
groupName

*/