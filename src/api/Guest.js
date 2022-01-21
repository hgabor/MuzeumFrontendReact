import React from "react";
import { ApiContext } from "./api";

export default class Guest extends React.Component {
    static contextType = ApiContext;

    render() {
        if (!this.context.apiToken) {
            return this.props.children;
        } else {
            return null;
        }
    }
}
