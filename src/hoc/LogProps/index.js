import React from 'react';

function logProps(Component) {
    class LogProps extends React.Component {
        componentWillReceiveProps(nextProps) {
            console.log("PROPS UPDATED", nextProps);
        }
        render() {
            return <Component {...this.props}/>
        }
    }
    LogProps.displayName="LogProps(${Component.name})";
    return LogProps;
}

export default logProps;
