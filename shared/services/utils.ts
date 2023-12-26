import bcrypt from 'bcrypt';


class UtilService {
    /**
     * Validate User's password
     * @param password
     * @param userPassword
     * @returns
     */
    isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    /**
     * Encode User's password
     * @param password
     * @returns
     */
    encodePassword(password: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}


export const utilService = new UtilService();