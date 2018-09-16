import React, {Component} from 'react';
import logProps from "../../hoc/LogProps";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            ...this.state
        }
    }
    state = {
        someStateItem: "Default Value"
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.value !== nextState.value;
    }

    clickIncreaseHandler = () => {
        this.setState((prevState) => ({
            value: this.state.value + 1,
        }));
    }
    clickDecreaseHandler = () => {
        this.setState({
            value: (this.state.value > 1) ? this.state.value - 1 : 0,
        });
    }

    componentDidUpdate() {
        this.props.onChange(this.state.value);
    }

    render() {
        const {someStateItem, value} = this.state;
        return (
            <div>
                <span>{someStateItem}</span>
                <input type='button' value='+' onClick={this.clickIncreaseHandler}/>
                {value}
                <input type='button' value='-' onClick={this.clickDecreaseHandler}/>
            </div>
        );
    }
}

export default logProps(Counter);
