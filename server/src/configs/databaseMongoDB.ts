
import Default from '../configs/default';
const username: string = String(process.env.MONGO_USERNAME)
const password: string = String(process.env.MONGO_PASSWORD)
const cluster = String(process.env.MONGO_CLUSTER)
const dbname: string = Default._MONGO_DBNAME

console.log(dbname);

export default {
    // 'url': `mongodb://${username}:${password}@${cluster}/?retryWrites=true&w=majority`,
    // 'options': {
    //  'user':   username,
    // 	'pass':   password,
    // 	'dbName': dbname, 
    // 	'useNewUrlParser': true,
    // 	'useUnifiedTopology': true,
    // },

    'url': `mongodb://127.0.0.1:27017/` + dbname,
    'options': {
        // 'user': username,
        // 'pass': password,
        // 'dbName': dbname,
        // 'useNewUrlParser': true,
        // 'useUnifiedTopology': true,
    },
}