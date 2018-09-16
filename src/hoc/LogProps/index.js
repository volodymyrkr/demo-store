import React from 'react';

function logProps(Component) {
    console.log("LOGPROPS");
    class LogProps extends React.Component {
        componentWillReceiveProps(nextProps) {
            console.log("PROPS UPDATED", nextProps);
        }
        render() {
            return <Component {...this.props}/>
        }
    }
    LogProps.displayName="LOGGGG";
    return LogProps;
}

export default logProps;
