import userModel from "../models/user.model";
import helper from "../module/helper";
import emailModule from "../module/email";
import passwordModule from "../module/password"
import jwtModule from "../module/jwt"
import { IDataJWT } from "../interface/module/helper";

class Service {
    private message: string;
    private status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }

    public async login(body: any) {
        try {
            const { email, password } = body;

            const user = await userModel.findOne({
                email: email,
            });

            if (!user) {
                this.setStatus(400);
                this.setMessage("Email hoac mat khau chua dung !");
                return false;
            }

            // So sánh password hash
            const bcryptCompare = await passwordModule.compare(
                password,
                user.password
            );

            if (!bcryptCompare) {
                this.setStatus(400);
                this.setMessage(
                    `Thong tin dang nhap chua chinh xac !`
                );
                return false;
            }

            // Lưu một số thông tin
            user.loginAt = new Date(Date.now());

            // Tạo jwt
            const payload = {
                id: user._id,
            };

            const jwtSignUser = await jwtModule.createJWT(payload, "generate", 60 * 60 * 24);
            const refreshToken = await jwtModule.createJWT(payload, "refresh", 60 * 60 * 24 * 30);
            user.token = jwtSignUser;
            user.refreshToken = refreshToken;
            user.save();

            this.setStatus(200);
            this.setMessage("Dang nhap thanh cong !");
            return {
                token: jwtSignUser,
                refresh: refreshToken
            };
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async register(body: any) {
        try {
            const { password, email } = body;

            // check email
            const email_ = await userModel.findOne({ email: email });
            if (email_) {
                this.setStatus(400);
                this.setMessage("Email da ton tai!");
                return false;
            }

            const random = await helper.randomNumber();
            const passwordHashed = await helper.hash(password, 10);

            body.password = passwordHashed;

            const dataForm = {
                ...body,
                otp: random
            };
            const register = await userModel.create(dataForm);
            register.save();

            //send mail
            await emailModule.sendMail(email, String(random), 'Otp xac thuc');

            // create token JWT
            const dataJWT: IDataJWT = {
                sub: register._id,
                expdate: 5,
            }
            const token = await helper.getTokenJWT(dataJWT);

            this.setStatus(200);
            this.setMessage("Dang ky thanh cong!");
            return { token }
        } catch (error) {
            console.log(error);
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public async verify(body: any, params: any) {
        try {

            this.setStatus(200);
            this.setMessage("");
            return true;
        } catch (error) {
            this.setStatus(500);
            this.setMessage("Connection error, please try again later !");
            return false;
        }
    }

    public getMessage = () => {
        return this.message
    }

    private setMessage = (message: string) => {
        this.message = message
    }

    public getStatus = () => {
        return this.status
    }

    private setStatus = (status: number) => {
        this.status = status
    }
}

export default new Service('', 0)