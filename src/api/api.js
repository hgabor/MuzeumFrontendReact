import { createContext, Component } from "react";

export const ApiContext = createContext({
    apiToken: null,
    getPictures: () => {},
    deletePicture: (id) => {},
    newPicture: (picture) => {},
    editPicture: (picture) => {},
});

export class ApiProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiToken: '',
            getPictures: this.getPictures,
            deletePicture: this.deletePicture,
        }
    }

    getPictures = async () => {
        const response = await fetch(`${this.props.serverAddress}/api/paintings`);
        // Hibakezeles
        const pictures = await response.json();
        // Hibakezeles
        return pictures;
    };

    deletePicture = async (id) => {
        return await fetch(`${this.props.serverAddress}/api/paintings/${id}`, {
            'method': 'DELETE',
        });
    };

    render() {
        return <ApiContext.Provider value={this.state}>
            { this.props.children }
        </ApiContext.Provider>
    }
}

