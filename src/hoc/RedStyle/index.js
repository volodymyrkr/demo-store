import React from "react";

function redStyle(Component) {
    class RedStyleComponent extends React.Component {
        render() {
            return <div style={{color: '#f00',display:'block', position:'fixed', top:'50%', left:'50%', transform:'translate(-50%, -50%)', dx:'-50%',fontSize: '2em'}}>
                <Component/>
            </div>
        }
    }

    RedStyleComponent.displayName="RedStyleHOC";
    return RedStyleComponent;
}

export default redStyle;
