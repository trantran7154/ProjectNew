import axios from 'axios'
class AuthClass {
    tokenRedius() {
        throw new Error('Method not implemented.');
    }
    private url = process.env.VUE_APP_BACKEND_URL + '/api/user/v1/';

    public async Login(email: string, password: string) {
        try {
            const response = await axios.post(this.url + 'login', {
                email, password
            });

            localStorage.setItem('token', response.data.data.token);

            const user = await this.GetProfileToken(response.data.data.token)
            localStorage.setItem('user', JSON.stringify(user.data));
            
            return response.data;
        } catch (err: any) {
            return err.response.data;
        }
    }

    public async GetProfileToken(token: string){
        try{
            const response = await axios.get(this.url + 'get-profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch(err: any){
            return err.response.data;
        }
    }
}

export default new AuthClass()