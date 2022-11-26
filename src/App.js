
import './App.css';


import SplitPane, { Pane } from 'react-split-pane';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Editor from 'react-simple-code-editor';
import deflate from 'deflate-js'

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


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

  const [text,setText]=useState(`@startuml
  |金蝶系统|
  |#red|CMS集成模块|
  |**CMS后台系统**|
  
  start
  if (配送瓶气订单) then (是)
     
    |司机@App|
    :厂外卸货/回收空瓶;
    |CMS后台系统|
    :推送厂外卸货和回收空瓶事件;
    |CMS集成模块|
    :根据订单类型不同推送单据;
    |金蝶系统|
    :接收不同单据;
    stop
    |库管@App|
    start
    
    :**入库操作**;
    |CMS后台系统|
    :推送厂外卸货和回收空瓶事件;
    |CMS集成模块|
    :根据订单类型不同推送单据;
    |金蝶系统|
    :接收不同单据;
    stop
  endif
  stop
  @enduml
    
  
  `)

  return (
    <SplitPane split="vertical" minSize={200} defaultSize={400}>
  <div >

  <Editor
      value={text}
      onValueChange={code => setText(code)}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15, 
        height:"90vh"
      }}
    />

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


*/