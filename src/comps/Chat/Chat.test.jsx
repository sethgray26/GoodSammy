
import React from 'react'
import ReactDOM from 'react-dom'
import Chat from './Chat'

describe('Chat component tests', ()=>{
    test('handle Change should hand off something to setState', ()=>{
        const chat = new Chat();
        chat.setState = (state)=>{
            expect((state.messageInput ==="I get set")).toBeTruthy()
        }
        chat.handleChange({target:{value:"I get set"}});
    })

    test('handle Change passes in a string exactly', ()=> {
        const chat = new Chat();
        chat.setState = (state) => {
            console.log(state.messageInput)
            expect(state.messageInput).toEqual("my string")
        }
        chat.handleChange( {target:{value:"my string"}})        
    })
})