import React from "react";
import { ApiContext } from "../api/api";



export default class PictureEdit extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            picture: {
                title: '',
                year: null,
                on_display: false,
            },
            errors: {}
        }
    }

    handleTitleChange = (event) => {
        const newTitle = event.currentTarget.value;

        this.setState({
            picture: {
                ...this.state.picture,
                title: newTitle,
            }
        });

        // Kliens oldali hibaüzenet:
        if (newTitle === '') {
            this.setState({
                errors: {
                    ...this.state.errors,
                    title: ['The title is required'],
                }
            })
        }
    }

    handleYearChange = (event) => {
        this.setState({
            picture: {
                ...this.state.picture,
                year: event.currentTarget.value,
            }
        });
    }

    handleSubmit = async () => {
        const result = await this.context.newPicture(this.state.picture);
        console.log(result);
        if (result.errors) {
            this.setState({ errors: result.errors });
            return;
        }
        // Alaphelyzetre állítás
        this.setState({
            picture: {
                title: '',
                year: null,
                on_display: false,
            },
            errors: {},
        });
        // Szülő komponensnek egy onChange jelzés
    }

    render() {
        const { errors } = this.state;
        const { title, year, on_display } = this.state.picture;

        return <div>
            <input type='text' value={title} onChange={this.handleTitleChange} /><br />
            { errors.title ? errors.title.map(msg => <span className="error">{ msg }</span>) : null }
            <input type='number' value={year} onChange={this.handleYearChange} /><br />
            { errors.year ? errors.year.map(msg => <span className="error">{ msg }</span>) : null }
            <input type='checkbox' checked={on_display} /><br />
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
    }

}