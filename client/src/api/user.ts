import axios from 'axios'
class AuthClass {
    tokenRedius() {
        throw new Error('Method not implemented.');
    }
    private url = process.env.VUE_APP_BACKEND_URL + '/api/user/v1/user';

    public async Login(body: any) {
        try {
            const response = await axios.patch(this.url, body);

            localStorage.setItem('token', response.data.data.token);
            
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }
}

export default new AuthClass()