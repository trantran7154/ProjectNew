import axios from 'axios'
import userApi from "../api/user";

class ProfileClass {
    private url = process.env.VUE_APP_BACKEND_URL + '/api/user/v1/get-profile';

    public async getProfile() {
        try {
            const g_profile = await axios.get(this.url, {
                headers: {
                    Authorization: `Bearer ${await userApi.tokenRedius()}`
                }
            })
            return g_profile.data
        } catch (error: any) {
            return error.response.data;
        }
    }
}

export default new ProfileClass();