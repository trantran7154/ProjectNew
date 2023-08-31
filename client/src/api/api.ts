import axios from 'axios';

class Api {
    private url = String(process.env.VUE_APP_BACKEND_URL + '/api/product/v1/product');

    public async GetAll(query = {}) {
        try {
            const response = await axios.get(this.url, {
                params: query
            });
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }

    public async GetById(params: any) {
        try {
            const { _id } = params;
            const response = await axios.get(this.url + `/${_id}`, {
            });
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }

    public async Edit(body: any, params: any) {
        try {
            const { _id } = params;
            const response = await axios.patch(this.url + `/${_id}`, body, {
            });
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }

    public async Add(body: any) {
        try {
            const response = await axios.post(this.url, body, {
            });
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }

    public async Delete(params: any) {
        try {
            const { _id } = params;
            const response = await axios.delete(this.url + `/${_id}`, {
            });
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }
}

export default new Api()