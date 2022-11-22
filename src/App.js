
import './App.css';

import { Row, Col } from 'react-flexbox-grid';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import deflate from 'deflate-js'



const BASE_64_MAP="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const PUML_64_MAP="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"

const encode=(value)=>{

  const arr = Array.prototype.map.call(value, function (char) {
    return char.charCodeAt(0);
  });
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



  return (
    <>
    <Row style={{height:"100vh"}}>
      <Col  xs={3} md={3}>
        <textarea 
          cols={500} style={{height:"90vh",width:"90%",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px"}}
          value={text}
          onChange={(event)=>setText(event.target.value)}
        /></Col>
      <Col  xs={9} md={9} >

      <img  style={{height:"90vh",width:"90%",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px"}}
      alt="generated image"
      src={getURL(text)}/>
     
      </Col>
    </Row>
    </>
  );
}

export default App;
/*
 <img  style={{height:"90vh",width:"90%",margin:"10px 10px 10px 10px ", padding:"10px 10px 10px 10px"}}
      alt="generated image"
      src={getURL(text)}/>

*/