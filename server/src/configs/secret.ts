import dotenv from 'dotenv'
dotenv.config()

export default {
	secret: String(process.env.JWT_SECRET),
	refresh: String(process.env.JWT_SECRET_REFRESH),
	secretCallAPI: String(process.env.JWT_SECRET_CALL_API),
	refreshCallAPI: String(process.env.JWT_SECRET_REFRESH_CALL_API),
}