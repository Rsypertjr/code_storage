import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { use } from 'react';
import { ThemeConsumer } from 'styled-components';
import { render } from 'sass';
import { reject } from 'lodash';
import { callback } from 'chart.js/helpers';
export default function JavaScriptPlayBox(props){
/*************************  Factory Functions ******************************************************
    function personFactory(name){
        return {
            name,
            talk() {
                return `Hello I am ${name}`
            }
        }
    }
    const me = personFactory("Sina");


    function createElement(type, text, color) {
        const el = document.createElement(type)
        el.innerText = text
        el.style.color = color
        document.body.append(el)
        return {
            el, 
            setText(text) {
                el.innerText = text
            },
            setColor(color) {
                el.style.color = text
            }
        }
    }
    */
    //********************************************************* */ Constructor function
    /*
    function Person(n) {
        this.name = n
    }

    // Factory function
    function personFactory(n) {
        return {name:n}
    }

    // Factory function
    function createPerson(name){
        return{
            name: name,
            talk() {
                return `I am ${this.name}`
            }
        }
    }

    //const you = personFactory("rich");

    //const me = new Person("Sina");
    const me = createPerson('Sina');
    const you = createPerson('Qoli');
    const them = new Person("them");
    them.name = "everybody"
    const us = new Person("us");

    me.talk = function() {
        return `Hello, I am ${this.name}`;
    }

    const myCoolProto = {
        talk() {
            return `Hello, I am ${this.name}`
        },
        sayagain() {
              return `Say Again Hello, I am ${this.name}`
        }
    }
    
    function createPerson2(name) {  // Workaround for factories to create inheritance
        return Object.create(myCoolProto,{
            name: {
                value:name
            }
        })
    }
    const me2 = createPerson2('Sina Sina')
    const you2 = createPerson2('You You')

 
/*********************************   End of factory function ************************************************** */

/*****************  Constructor Functtion ************************************* 

function Person2(name) {
    this.name = name;
}

const beno = new Person2('Beno')
Person2.prototype.talk = function(){
    return `Hello, I am ${this.name}`
}

const sam = new Person2("Sam");
*/
  /************************************* THIS Object  *******************
// Outside of a function this is always a window
function talk(){
    return this
}    
const me = {
        name: 'Sina',
        talk
    }

function talk() {
    return `I am ${this.name}`
}

const me3 = {
    name: 'Sina',
    talk
}

const you3 = {
    name:'Qoli',
    talk
}

const me4 = {
    name: 'Sina'
}
const meTalk = talk.bind(me4)

const callTalk = talk.call(me4)

function talk2(lang, isPolite){
    if(isPolite){
        if(lang === 'en') {
            return `Hello, I am ${this.name}`
        } else if (lang === 'it') {
            return `Ciao bella, o sono ${this.name}`
        }
    }
    if (!isPolite) {
          if(lang === 'en') {
            return `${this.name}, what you want?`
        } else if (lang === 'it') {
            return `Sono ${this.name},🤣🤣`
        }
    }
}

talk2.call(me,'en',true)

function Person2(name) {  // Create a constructor (this)
    const this2 = {};
    this2.name = name;
    return this2
}

const me_1 = new Person2("Sina")
const you_1 = new Person2('Eric')
const her_1 = new Person2("Bebe")
const him_1 = new Person2('Stan')

function Person3(n){
    this.name = n 
    console.log(this);
    this.talk = function() {
        console.log(this)
    }
}

const me_2 = new Person3('Sina')
*/
/********************************   Callback function 

function Person3(n){
    this.name = n 
    //console.log(this);
    this.talk = function() {
       //console.log(this)
    }
    setTimeout(function() {
        console.log(this)  // this does not bind to constructor function this, between {} is different context, after {} back to constructor this
    }.bind(this),100);

     setTimeout(() => {
        console.log(this)  // Arrow function however does bind to constructor this
    },100);    
}


const me_3 = new Person3('Sina')
*/
/*************************** Arrow functions */
const sayHello = function () {
    return 'hello'
}

const sayHello2 = () => {
    return 'hello'
}

const sayHello3 = (firstName, lastName) => {
    return `Hello, ${firstName}, ${lastName}`
}
const sayHello4 = firstName => {
    return `Hello, ${firstName}`
}

const sayHello5 = firstName =>  `Hello, ${firstName}`;

// Arrow functions don't get arguments by default
const sayHello6 = function(){
    console.log(arguments)
}

const sayHello7 = () => {
    console.log(arguments);
}

// Higher order functions
setTimeout(() => {
    console.log('Hello')
,1000})

// Named functions
function sayHello_1() {
    console.log('Hello')
}

const sayHello_2 = () => {
    console.log('Hello')
}

// Constructor functions can't be arrow function
function Person_1(n) {
    this.name = n
}

const Person__1 = (n) => {
    this.name = n  // name will be undefined
}

//const me__1 = Person_1('Sina')

const me__2 = {
    talk:function() {
        return 'hello'
    }
}

const you__2 = {
    talk: () => {
        return 'hello'
    }
}

const they__1 = {
    talk: () => 'hello'
}

const me__3 = {
    name: 'Sina',
    talk: function() {
        return this
    },
    arrowTalk: () => {
        return this
    }
}

function APerson(n) {
    this.name = n 
}
APerson.prototype.talk = function() {
    return this
}

APerson.prototype.arrowTalk = () => {
    return this
}

const ame = new APerson('Sina')

function outer(callback){
    callback
}
function inner() {
    console.log(this)
}

function outer2(callback, obj){
    callback.call(obj)
}

function human(name) {   
    function sayHi() {
        console.log(`Hi I am ${name}`)
    }
    function sayHowYouFeel() {
        console.log(`${name} is feeling good!`)
    }
    return {
        sayHi,
        sayHowYouFeel
    }
}
// Higher order function Closure
// Closures hold on the reference for later
function ahuman(n) {    // holds on to value of name with sayHi is executed later, like holds state
    const name = n 
    function sayHi() {
        console.log(`Hi I am ${name}`)
    }
    function sayHowYouFeel() {
        console.log(`${name} is feeling good!`)
    }
    return {
        sayHi,
        sayHowYouFeel
    }
}
const sina = human('Sina')
const qoli = human('Qoli')
/*
document.getElementById('size-12').onclick = function(){
    document.body.style.fontSize = `12px`
}
document.getElementById('size-14').onclick = function(){
    document.body.style.fontSize = `14px`
}
document.getElementById('size-16').onclick = function(){
    document.body.style.fontSize = `16px`
}
*/
/*
function clickHandler(size) {
    return function(){
        document.body.style.fontSize = `${size}px`
    }
}
    */

/****************** Asynchronous  ********************************************** */
/*
function orderPizza(callback){
    setTimeout(() => {
        const pizza = `🍕`
        callback(pizza)
    },2000)
}

function pizzaReady(pizza) {
    console.log(`Eat the ${pizza}`)
}
const mypizza = orderPizza(pizzaReady)
*/

/*
function thing1(callback) {
    callback()
}
function thing2(callback){
    callback()
}
function thing3(callback){
    callback()
}


thing1(() => {
    thing2(() => {
        thing3()
    })
})
*/


/*****************Javascript value vs reference   ************************************************* */



const a = 1
const b = 2

const aa = [1]
const bb = [1]

const myName = 'SiNAAAA'
 
const a1 = {skill: 'Cooking'}
const b1 = {skill: 'Cooking'}


/*************************** Promises ********************************************* */
/*
let weather = getWeather()
document.body.innerText(weather)

function getWeather(){
    setTimeout(() => {
        return 'Sunny'
    })
}
    */

/****** decoupling of functions for greater reuability */
getWeather(weatherReceived)

function weatherReceived(data){
    let weather = data
    document.body.innerText(weather)
}
/* Psuedo code
function displayIcon(data) { // another function getWeather could be reused for
}
let data
function getWeather(callback) { // Asynchronous with callback
    if(data === 'Sunny') return (`☀️`)
    if(data === 'Cloudy') return (`☁️`)
    setTimeout(() => {
        callback('Sunny')
    })
}
*/

// Promise Maker/Creator
function getWeather(){
    return new Promise(function(resolve, reject){  // Promise takes function with async logic
        setTimeout(function(){
            //resolve('Sunny')
            resolve('Partly Cloudy')
            //reject('Was Sunny')
        },100)

    })
}

/* ******************* PROMISES *****************************************

// Promise Creator
function getData() {
    return new Promise(...)
}

// Promise Receiver
getData()
    .then(result => {...})
    .catch(error => {...})

*/
/*
// Writing Asynchronous Code Synchronously
// Putting 'await' in front of the function

*/
 /***********************************  Pure Functions ********************************************************* */
 // For a given input, it returns the same output with no side effects 
 // Does not rely on outside information and
 // does not change outside information

// let name = 'Shiv'
 function salut(name) {  // Name argument passed into pure function much more testable
    return `Hello ${name}`
 }

 //Lack of external influence makes this better code
 let sheepCount = 0
 function addSheep(count) {
    return count+1
 }

 // First Class Functions can return functions :: FUNCTION FACTORY
 function greeter(language) {

    return function(name){
       if(language === 'EN'){
            console.log(`Hello ${name}`)
        }
        else if (language === 'IT') {
            console.log(`Ciao ${name}`)
        }
    }
  
 }

const englishGreeting = greeter('EN')
const italianGreeting = greeter('IT')

englishGreeting('Qoli')
englishGreeting('Sina')
englishGreeting('Frank')

italianGreeting('Mario')
italianGreeting('Maria')
italianGreeting('Danilo')

// Functions can be Curried - Specialized functions
function printTotal(amount, sign) {
    return `${sign}${amount}`
}

printTotal(46,'$')
printTotal(2,'$')
printTotal(10000,'$')
printTotal(2564,'')

printTotal(8,'£')
printTotal(1000,'£')
printTotal(19,'£')

// Curry the function
function printTotal2(sign){
    return function (amount){
         return `${sign}${amount}`
    }
}

const usTotal = printTotal2('$')
usTotal(46)
usTotal(2)
usTotal(10000)
usTotal(2564)
const ukTotal = printTotal2('£')
ukTotal(8)
ukTotal(1000)
ukTotal(19)
/*************************** Functions Stored in Data Structures ******************************************************************************* */
// Dynamic Code
const add = (a,b) => a + b
const subtract = (a, b) => a - b

const operations = [add, subtract]

operations[0](1,3) //which function called can be dynamic

// Code Organization
const operations2 = {
    add: (a,b) => a + b, 
    subtract: (a,b) => a - b
}
/**************************** Functions can be Anonymous *************************************** */
function outer(){
    () => null;
    () => {return null};
}

// immediate invocation
(function now(){
    return;
})()


    useEffect(() => {
        /*
     console.log(me.talk());
     console.log(me);
     const ben = personFactory("Ben");
     console.log(ben.talk());
     const jill =  personFactory('Dr, Jill');
     console.log(jill.talk());

     const h1 = createElement('h1', 'Hey guys', 'red');
     const p = createElement('p', 'Hey guys', 'blue');
     console.log(h1);
     h1.setText("Goodbye fellas");
     console.log(h1);
     console.log(p)
     */
    /* Factory functions
    console.log(me)
    console.log(you)
    console.log(me.talk())
    console.log(you.talk())
    console.log(them)
    console.log(them.name);
    console.log(us.name);
    console.log(Object.prototype === me.__proto__)
    Object.prototype.speak = function() {
        return 'Oh Khello';
    }
    
    console.log(me.speak())
    console.log(me)
    console.log(you)

    const a = {};
    console.log(a.speak())
    console.log(window.speak())
    console.log(me.speak())
    console.log(me2)
    console.log(me2.talk())
    console.log(you.talk())
    console.log(me2.sayagain())    
    console.log(you2.sayagain())
    */

    /*  Constructor function
    console.log(me2.__proto__.talk())
    console.log(beno);
    console.log(beno.talk())
    console.log(sam.talk())
    */
   /*****   This Obj 
    console.log(me.talk())
    console.log(talk);
    console.log(window.talk)
    console.log(me3.talk())
    console.log(you3.talk())
    console.log(talk.bind(me4)())
    console.log(meTalk())
    console.log(callTalk)
    console.log(talk2.call(me,'en',true))
    console.log(talk2.call(me,'en',false))
    console.log(talk2.apply(me,['en',true]))
    console.log(talk2.apply(me,['en',false]))
    console.log(talk2.call(me,'it',true))
    console.log(talk2.call(me,'it',false))
    console.log(talk2.apply(me,['it',true]))
    console.log(talk2.apply(me,['it',false]))
    console.log(me_1)
    console.log(you_1)
    console.log(her_1)
    console.log(him_1)      
    console.log(me_2)  
    console.log(me_2.talk())
    */
   /* Callback functions run in entirely different context
   console.log(me_3)
   */
   /**************************** Anonymous functions   ******************** */
   //console.log(sayHello());
   //console.log(sayHello2())
   //console.log(sayHello3('Richard','Sypert'))
   //console.log(sayHello4('Richard'))
   //console.log(sayHello5('Richard'))
   //console.log(sayHello6('Sina','Jaz',14))
   
   //console.log(sayHello7('Sina','Jaz',14))
   //console.log(me__1)
   //console.log(new Person__1('Sina'))
   //console.log(me__2.talk())
   //console.log(you__2.talk())
   //console.log(they__1.talk())
   //console.log(me__3.talk())
   //console.log(me__3.arrowTalk())
   //console.log(ame.talk())
   //console.log(ame.arrowTalk())
   // console.log(outer(inner))
   // console.log(outer2(inner,{name:'Sina'}))
   //console.log(human('Sina'))
   //console.log(sina.sayHi())
   //console.log(qoli.sayHowYouFeel())

   //document.getElementById('size-12').onclick = clickHandler(25)
   //console.log(mypizza)
   //console.log(`Call Qoli`)
   /*
   console.log(a === b)
   console.log(aa === bb)
   console.log(a1 === b1)
   console.log(a1.skill === b1.skill)
   const name = {
        name:'Richard'
   }
   const myname = Object.create(name)
   myname.kind = "human"
   myname.age = 34
   console.log(myname)

   const ben = Object.create(myname)
   ben.age = 12;
   console.log(ben)

   class Human{
    talk() {
        return 'Talking';
    }
   }
   class SuperHuman extends Human {
    fly() {
        return 'Flying';
    }
   }
   const ben2 = new SuperHuman();
   console.log(ben2.fly())
   console.log(ben2.talk())
   console.log(ben2)

   function Dude(name){
    this.name = name;
   }
   const medude = new Dude('Sina')
   console.log(medude.prototype)  // prototype is a property of constructor function
   console.log(Dude.prototype)
   console.log(medude.__proto__)
   
   console.log(medude.__proto__ === Dude.prototype)
   Dude.prototype.talk = function() {
    return 'Talking'
   }
   console.log(medude)
   */
   /*
   const promise = getWeather()
   console.log(promise)
   promise.then(
    function(data) {      // then for when promise resolves correctly
        console.log(data)
        },
        function(data) {   // Second parameter for reject
            console.log(`Second param ${data}`)
        }
    )
    function onSuccess(data){
        console.log(`Success: ${data}`)
    }
    function onError(errorCode){
        console.log(`Error: ${errorCode}`)
    }

    function getWeatherIcon(weather) {
        return new Promise(function(resolve, reject){  // Promise takes function with async logic
            setTimeout(function(){
                switch(weather){
                    case 'Sunny':
                        resolve(`☀️`)
                        break 
                    case 'Cloudy':
                        resolve(`☁️`)
                        break 
                    case 'Rainy': 
                        resolve(`⛈️`)
                        break 
                    default:
                        reject("NO ICON FOUND!!!")

                }
                resolve('Sunny')
                //reject('Was Sunny')
            },100)

        })
    }
    getWeather().then(onSuccess,onError);
    getWeather().then(getWeatherIcon).then(onSuccess,onError)
    // Or
    getWeather().then(getWeatherIcon).then(onSuccess).catch(onError)

    function fun1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject('404')
                //resolve('404')
                resolve('Good Data')
                //reject("Bad Data")
            },100)
        })
    }

    function fun2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`🥸`)
            },100)
        })
    }

    function onFinally() {
        console.log("Finally we be done YO")
    }

    const havefun = fun1()
        .then(fun2)
        .then(onSuccess)
        .catch(onError)
        .finally(onFinally)

    console.log(havefun)
    */
    
    /*
    const havefun2 = fun1()
        .then(fun2,onError)
        .then(onSuccess)
        .catch(onError)

    console.log(havefun2)
    */

    /*
   function displayData(weather) {
    console.log(weather)
   }
   function fetchData(){
        return new Promise(function(resolve, reject){
            fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast') 
                .then(response => response.json())
                .then(data => resolve(data.properties.periods[1].shortForcase));
        })
   }

   function on_Error(err){
    console.log(`ERROR ${err}`)
   }

   fetchData()
    .then(displayData)
    .catch(onError)
*/
/********************************** ASYNC/AWAIT ********************************************* 
        function getData() {
            return new Promise(function(resolve,reject){
                setTimeout(() => {
                    resolve('Here is your data!')
                    reject('Something went wrong!')
                },1)
            })
        }

        const result = getData()
        console.log(result)

        async function start() {
            // await is only valid in async function and the top level bodies of modules
            const result2 = await getData()
            console.log(result2)
        }

        async function start2()  {
            getData()
                .then(result => {
                    console.log(result)
                })
        }

        async function start3()  {  // In a synchronous format with await although asynchronous
            const data = await fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast')
            const result3 = await data.json() 
            console.log(result3.properties.periods[1].shortForecast)
        }

        async function start4()  {
            const data = fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast')
                .then(data => data.json())
                .then(result => {
                    console.log(result.properties.periods[1].shortForecast)
                })
        }

        console.log(start())
        console.log(start2())
        console.log(start3())
        console.log(start4())
        console.log("not waiting...")

        // async returns a promise by default
        const me = {
            async sayHello() {
                return 'I am Qoli'
            }
        }
        console.log(me.sayHello());

        async function start5() {
            try{
                const result4 = await getData()   
                console.log(`Success: ${result4}`)  // or can do success handler like onSuccess()
            } catch (error) {
                console.log(`ERROR ${error}`)   // or can do failure handler like onFailure()
            }            
        }

         async function start6() {          
                const result5 = await getData() 
                .catch(error => {
                    console.log(`ERROR ${error}`)
                })  
                console.log(result5)  // still runs however        
            }


        console.log(start5())
        console.log(start6())
*/

    /*
        console.log(salut('Shiv'))
        console.log(salut('Richard'))
        let result = salut('Tom')
        if (result === 'Hello Tom'){
             console.log('PASS')

        }else {
            console.log('FAIL')
        }

        sheepCount = addSheep(sheepCount)
        sheepCount = addSheep(sheepCount)
        sheepCount = addSheep(sheepCount)
        console.log(sheepCount)
           
        */

        /******************************* EVENT LOOP ****************************************

        function getCoffee(){
            debugger
            console.log('Getting coffee...')
            doAsyncStuff()
        }
        function signASong() {
           
            console.log('Start singing')
        }

        function doAsyncStuff(){
            setTimeout(() => {                
                console.log('Done with Async stuff and coffee is here')
            },2000)
        }

        getCoffee()
        signASong()
         */
        /************************** Imperative Programming  ******************************/
        // Data Manipulation
        const array = [1,2,3,4]
        const names = ['Sina', 'Qoli', 'Ruth', "Dua"]
        const doubles = []
        for (let i = 0;i < array.length;i++){
            doubles.push(array[i] * 2)

        }
        console.log(doubles)
        /**************************** Declarative Programming *************************** */
        const doubles2 = array.map(item => item * 2)
        console.log(doubles2)

        //in React Jsx
        //import React from 'react'
        const elements = names.map(name => {
            return <li>{name}</li>
        })
        console.log(elements)

        // Dom manipulation - imperative way
        const button = document.createElement('button')
        button.textContent = 'Click me!'
        button.addEventListener(click, () => {
            console.log('Clicked!')
        })
        document.body.appendChild(button)

        // Declarative way
        `<button onClick={alert('Button Clicked!')}>Click Me</button>`

        `
            <form action="/submit" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" />
                <button type="submit">Submit</button>
            </form>
        `

        // Imperative 
        const button2 = document.querySelector('#button');
        button2.addEventListener('click', () => {
            const message = document.createElement('p');
            message.textContent = 'Button Clicked!';
            document.body.appendChild(message)

        });

        // Declarative
        function App() {
            const [clicked, setClicked] = useState(false)
            return (
                <div>
                    <button onClick={() => setClicked(true)}>Click Me</button>
                    {clicked && <p>Button Clicked!</p>}
                </div>
            )
        }

        // CSS Imperative
        const div = document.querySelector('div');
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.backgroundColor = 'blue';

        // CSS Imperative
        ` 
        div {
            width: '100px';
            height: '100px'; 
            background-color: 'blue'
        }
        `
        // File Systems - Imperative way
        const fs = require('fs')
        const files = fs.readdirSync('./directory');
        for (const file of files){
            console.log(file)
        }

        // Bash - Declarative way
        ls .

            
        },[]);

    return(
       <>
        <div id="size-12">
                <Container onClick={() => clickHandler(20)}>JavaScript Play Box</Container>
        </div>     
       </>


    );









}
