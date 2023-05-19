import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: 'c047608e1f7a4b7bb3e434f9f037d2b3'
    }
});