import React, {Component} from 'react';
import redStyle from "../../hoc/RedStyle";

class Footer extends Component {
    render() {
        return (
            <div>
                Footer<br/>
                <span>Hello Ladies</span><br/>
                <span>Hello Gentelmens</span>
            </div>
        );
    }
}

export default redStyle(Footer);
