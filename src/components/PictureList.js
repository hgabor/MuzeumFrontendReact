import { Component } from "react";
import { ApiContext } from "../api/api";
import Picture from "./Picture";
import PictureEdit from "./PictureEdit";

export default class PictureList extends Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: null,
            pictures: [],
        }
    }

    loadPictures = () => {
        this.context.getPictures().then(pictures => {
            this.setState({
                pictures: pictures,
                error: null,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error.message,
                loading: false,
            });
            /*clearTimeout(this.timerId);
            this.timerId = setTimeout(() => {
                this.setState({ loading: true });
                this.loadPictures();
            }, 5000);*/
        });
    }

    componentDidMount() {
        this.loadPictures();
    }

    handleRemovePicture = async (picture) => {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        await this.context.deletePicture(picture.id);
        // Hibakezeles
        const newPictures = await this.context.getPictures();
        this.setState({
            pictures: newPictures,
        });
    };

    render() {
        const { pictures, error, loading } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <>
                <p className='error'> Error: { error } </p>
                <button onClick={this.loadPictures}>Retry</button>
            </>
        }

        return <div>
            <PictureEdit />
            <ul>
                {
                    pictures.map(p => <li key={p.id}>
                        <Picture
                            picture={p}
                            onRemove={() => this.handleRemovePicture(p)}
                        />
                    </li>)
                }
            </ul>
        </div>
    }
}


