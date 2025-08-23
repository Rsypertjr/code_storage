import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, CardText, Tooltip, OverlayTrigger, ButtonGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import $ from 'jquery';
import { use } from 'react';
import { ThemeConsumer } from 'styled-components';
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
/*************************** Anonymous functions */
const sayHello = function () {
    return 'hello'
}

const sayHello2 = () => {
    return 'hello'
}

const sayHello3 = (name) => {
    return `Hello, ${name}`
}



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
   console.log(sayHello());
   console.log(sayHello2())
   console.log(sayHello3('Richard'))



    },[]);

    return(
       <>
       <Container>JavaScript Play Box</Container>
       </>


    );









}
