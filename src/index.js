import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from "redux";


const ADD_ITEM="addItemAction";
const SELECT_ITEM="selectItemAction";
const addItemAction = (text) => {
    return {
        type: ADD_ITEM,
        value: text
    }
}
const selectItemAction = (item) => {
    return {
        type: SELECT_ITEM,
        value: item
    }
}

const reducerOne = (state={actions:[],lastActionIndex:0}, action)=>{
    switch(action.type) {
        case ADD_ITEM:
            console.log("ADD ACTION ", action)
            return {
                actions: [...state.actions, {id:state.lastActionIndex+1, value:action.value}],
                lastActionIndex: state.lastActionIndex+1
            }
        case SELECT_ITEM:
            console.log("SELECT ACTION ", action)
            return state;
        default:
            console.log("UNKNOWN ACTION IS DETECTED");
            return state;
    }
}
const store = createStore(reducerOne);

export class ListOfItems extends Component {
    onClickItem = (e)=>{
        const clickedItem  = this.props.items.filter((item)=>{
            return item.id == e.target.id;
        });
        store.dispatch(selectItemAction(clickedItem[0]));
        console.log("CLICKED ITEM", clickedItem[0].value);
    }
    render = () => {
        const { items } = this.props;
        return (
            <div>
                {items.map((item)=>{
                    return <div onClick={this.onClickItem} key={item.id} id={item.id}>{item.id}. {item.value}</div>
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
                <ListOfItems items={store.getState().actions} onSelectItem={(item)=>{
                    store.dispatch(selectItemAction(item))
                }}/>
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
