import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {combineReducers, createStore} from "redux";

const APPLY_FILTER = "applyFilder";
const DROP_FILTER = "dropFilder";

const FILTER_ALL = "showAll";
const FILTER_NEW = "showNew";
const FILTER_COMPLETED = "showCompleted";

const ADD_ITEM = "addItemAction";
const SELECT_ITEM = "selectItemAction";

const GENERATE_ID = "generateIdAction";

const addItemAction = (item) => {
    return {
        type: ADD_ITEM,
        id: store.getState().lastActionIndex,
        text: item.text
    }
}
const selectItemAction = (itemId) => {
    return {
        type: SELECT_ITEM,
        id: itemId
    }
}
const generateIdAction = (last) => {
    return {
        type: GENERATE_ID
    }
}

const itemReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                id: action.id,
                value: action.text,
                checked: true
            };
        case SELECT_ITEM:
            if (state.id !== action.id) return state;
            return {
                ...state,
                checked: !state.checked
            }
        default:
            return state;
    }
}

const listReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            console.log("ADD ACTION ", action)
            return [...state, itemReducer(undefined, action)]
        case SELECT_ITEM:
            console.log("SELECT ACTION ", action.id);
            return state.map(item => itemReducer(item, action))
        default:
            console.log("UNKNOWN ACTION IS DETECTED ", state);
            return state;
    }
}

const filterReducer = (state = FILTER_ALL, action) => {
    switch (action.type) {
        case APPLY_FILTER:
            return action.filter;
        case DROP_FILTER:
            return FILTER_ALL;
        default:
            return state;
    }
}

const lastActionIndexReducer = (state = 1, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return state + 1;
        default:
            return state;
    }
}

const appReducer = combineReducers(
    {
        lastActionIndex: lastActionIndexReducer,
        filter: filterReducer,
        actions: listReducer
    }
)
const store = createStore(appReducer);

export class ListOfItems extends Component {
    render = () => {
        const {items} = this.props;
        return (
            <div>
                {items.map((item) => {
                    return <div
                        onClick={
                            (e) => {
                                e.preventDefault();
                                store.dispatch(selectItemAction(item.id));
                            }
                        }
                        style={{textDecoration: item.checked ? 'line-through' : 'none'}}
                        key={item.id} id={item.id}>{item.id}. {item.value}</div>
                })}
            </div>
        )
    }
}

export class App extends Component {
    render = () => {
        let words = ["Есть", "жизнь", "на", "Марсе"];
        let numbers = [1, 2, 3, 4, 5];
        let sums = [];
        numbers.reduce(
            (result, item) => {
                sums.push(result);
                return result + item;
            });

        return (
            <div>
                <input ref={elem => this.inputField = elem}/>
                <input type="button" value="ADD" onClick={
                    () => {
                        if (this.inputField.value !== '') {
                            store.dispatch(addItemAction({
                                id: store.getState().lastActionIndex,
                                text: this.inputField.value
                            }));
                            this.inputField.value = "";
                        }
                    }
                }/>
                <ListOfItems items={store.getState().actions} onSelectItem={(itemId) => {
                    store.dispatch(selectItemAction(itemId))
                }}/>
                <div>
                    <div><h5>Words</h5></div>
                    <Fragment>
                        {
                            words.map((item, index) => (<div key={index}>{item} {item.length}</div>))
                        }
                    </Fragment>
                    <div><h5>Sums</h5></div>
                    <Fragment>
                        {
                            sums.map((item, index) => <div key={index}>{index + 1} {item}</div>)
                        }
                    </Fragment>
                </div>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App/>, document.getElementById('root'));
};

store.subscribe(render);
store.dispatch(addItemAction({text: "Hello"}));
store.dispatch(addItemAction({text: "Hello"}));
