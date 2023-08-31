import nodemailer from 'nodemailer';
import _default from '../configs/default';

class Class {

    public userEmail = _default._USER_EMAIL;
    public passwordEmail = _default._PASS_EMAIL;
    public hostEmail = _default._HOST_EMAIL;
    public portEmail: number = Number(_default._PORT_EMAIL);

    async sendMail(emailTo: any, content: any, subject: string) {
        try {
            console.log(this.portEmail);
            console.log(emailTo);
            console.log(content);
            console.log(subject);
            const transporter = nodemailer.createTransport({
                host: this.hostEmail,
                port: this.portEmail,
                secure: true,
                auth: {
                    user: this.userEmail,
                    pass: this.passwordEmail
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const info = await transporter.sendMail({
                to: emailTo,
                subject: subject,
                html: content
            });

            return info;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
}


export default new Class()