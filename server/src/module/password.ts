import bcrypt from 'bcryptjs';

class Password {
    // mã hóa pass
    public generateHash(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
    }

    public generateHashCall(password: string) {
        return bcrypt.hash(password, 0)
    }

    public compare(password: string, passwordCompare: string) {
        return bcrypt.compare(password, passwordCompare)
    }
}

export default new Password()