import { createContext, Component } from "react";

export const ApiContext = createContext({
    apiToken: null,
    networkError: false,
    login: (email, password) => {},
    getPictures: () => {},
    deletePicture: (id) => {},
    newPicture: (picture) => {},
    editPicture: (picture) => {},
    getUserData: () => {},
});

export class ApiProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiToken: '',
            networkError: false,
            login: this.login,
            getPictures: this.getPictures,
            deletePicture: this.deletePicture,
            getUserData: this.getUserData,
            newPicture: this.newPicture,
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('authToken');
        if (token) {
            this.setState({ apiToken: token });
        }
    }

    async fetchApi(endpoint, method = 'GET', data = null) {
        try {
            const response = await fetch(`${this.props.serverAddress}/api/${endpoint}`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.apiToken ? `Bearer ${this.state.apiToken}` : null,
                },
                body: data ? JSON.stringify(data) : null,
            });
            this.setState({ networkError: false });
            return response;
        } catch(exception) {
            this.setState({ networkError: true });
        }
    }

    login = async (email, password) => {
        const response = await this.fetchApi('login', 'POST', { email, password });
        const data = await response.json();
        if (data.message) {
            throw new Error(data.message);
        } else {
            window.localStorage.setItem('authToken', data.token);
            this.setState({apiToken: data.token});
        }
    }

    getPictures = async () => {
        const response = await this.fetchApi('paintings');
        // Hibakezeles
        const pictures = await response.json();
        // Hibakezeles
        return pictures;
    };

    deletePicture = async (id) => {
        return await this.fetchApi(`paintings/${id}`, 'DELETE');
    };

    newPicture = async (picture) => {
        let response = await this.fetchApi('paintings', 'POST', picture);
        return await response.json();
    };

    getUserData = async () => {
        if (!this.state.apiToken) throw new Error('User is not logged in');
        const response = await this.fetchApi('user');
        return response.json();
    };

    render() {
        return <ApiContext.Provider value={this.state}>
            { this.props.children }
        </ApiContext.Provider>
    }
}

