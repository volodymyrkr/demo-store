import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from "redux";


const ADD_ITEM="addItemAction";
const addItemAction = (text) => {
    return {
        type: ADD_ITEM,
        value: text
    }
}

const reducerOne = (state={actions:[],lastActionIndex:0}, action)=>{
    console.log("ACTION", state, action);
    switch(action.type) {
        case ADD_ITEM:
            return {
                actions: [...state.actions, action.value]
            }
        default:
            return state;
    }
}
const store = createStore(reducerOne);

export class ListOfItems extends Component {
    render = () => {
        const { items } = this.props;
        return (
            <div>
                {items.map((item)=>{
                    return <div>{item}</div>
                })}
            </div>
        )
    }
}
export class App extends Component {
    render = () => {
        return (
            <div>
                <input ref={elem => this.inputField = elem}/>
                <input type="button" value="ADD" onClick={
                    () => {
                        store.dispatch(addItemAction(this.inputField.value));
                        this.inputField.value = "";
                    }
                }/>
                <ListOfItems items={store.getState().actions}/>
            </div>
        )
    }
}

const render = ()=>{
    ReactDOM.render(<App/>, document.getElementById('root'));
};

store.subscribe(render);
store.dispatch(addItemAction("Hello"));
store.dispatch(addItemAction("Hello again"));
store.dispatch(addItemAction("Hello third"));
