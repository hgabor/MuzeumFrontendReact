import { Component } from "react";

export default class Picture extends Component {

    render() {
        const { picture, onRemove } = this.props;

        return <>
            <p>Title: { picture.title }</p>
            <p>Year: { picture.year }</p>
            <p>On Display: { picture.on_display ? 'Yes' : 'No' }</p>
            <p><button onClick={onRemove}>Remove</button></p>
        </>;
    }
}
