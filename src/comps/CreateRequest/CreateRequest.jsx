import React, { Component } from 'react';
import './CreateRequest.css'
import axios from 'axios'


class CreateRequest extends Component {


     requestCreator = () => {
         console.log(this.refs.category.value)
         console.log(this.refs.description.value)

        let generated = {
            category: this.refs.category.value,
            decription: this.refs.description.value
        }
        axios.put('./makerequest', generated)
        //test #1
    }
        render() {
            
        return (
            <div className='generate-request-body' >
            <br/>
                <section  >
                    <strong>What do you need help with?</strong>
                    <div>Select a category:
                         <select name="Category selection" id="" ref = 'category' >
                            <option value="Automotive" >Automotive</option>
                            <option value="Life" >Life</option>
                            <option value="">Spritual</option>
                            <option value="">Money</option>
                            <option value="">Moving</option>
                            <option value="">Errands</option>
                            <option value="">Love</option>
                            <option value="">Coding</option>
                            <option value="">Construction</option>
                            <option value="">Baking</option>
                    </select>
                    </div>
                </section>
                <br/>
                <section>
                    <span>Please tell Faye your a brief description of your woes</span>
                    <textarea 
                    name="Request Description"
                     id="" cols="40" rows="10"
                     ref ='description'
                     placeholder='I need help to change a tire!'
                    ></textarea>
                </section>
                <br/>
                <section className='buttons' >
                    <button className='Request-help-button' onClick= {this.requestCreator} >Request Help</button>
                    <a href="http://">
                        <button className='Cancel-request'>Cancel</button>
                    </a>
                </section>
            </div>
        );
    }
}

export default CreateRequest;