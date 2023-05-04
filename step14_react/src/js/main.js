import React from 'react';
import ReactDOM from 'react-dom';

let rootElement = document.getElementById('application');
let message = 'Hello World!';

ReactDOM.render(
	<div>{message}</div>,
	rootElement
);

// 새로운 h1 요소 생성
var newHeading = document.createElement("h1");

// 텍스트 노드 생성
var headingText = document.createTextNode("제목");

// 텍스트 노드를 h1 요소에 추가
newHeading.appendChild(headingText);

// h1 요소를 body 요소에 추가
document.body.appendChild(newHeading);
