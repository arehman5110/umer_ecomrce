import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Corrected parameter name
        return hashedPassword; // Return the hashed password
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to propagate it
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match; // Return the comparison result
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to propagate it
    }
}
