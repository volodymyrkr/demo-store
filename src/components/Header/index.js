import React, {Component} from 'react';
import logProps from "../../hoc/LogProps";
import redStyle from "../../hoc/RedStyle";

class Header extends Component {
    render() {
        return (
            <div>
                Header
            </div>
        );
    }
}

export default logProps(redStyle(Header));
