import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const envFilePath = environment === 'production' ? '.env.production' : environment == 'test' ? '.env.test' : '.env.development';
dotenv.config({ path: envFilePath });

class Default {
    public _PORT = String(process.env.PORT);
    public _ENV_NODE = environment;
    public _MONGO_DBNAME = String(process.env.MONGO_DBNAME);
    public _JWT_SECRET = "Pj67pOHfQ0TJlEV00dFGbbA0BxH6K5S38iS08zIroEgyTigj8Z";
    public _USER_EMAIL = "vuongbaot1905@gmail.com";
    public _PASS_EMAIL = "yqpfntoevtltbiry";
    public _HOST_EMAIL = "smtp.gmail.com";
    public _PORT_EMAIL = "465";
}

export default new Default()