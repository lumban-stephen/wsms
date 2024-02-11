import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt, { hash } from 'bcryptjs'

const prisma = new PrismaClient();

export async function validateUser(username: string, password: string): Promise<boolean> {
    try {
        const user = await prisma.users.findFirst({
            where: { username: username }
        });

        if (!user) {
            return false; // User not found
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, <string> user.password);

        return isPasswordValid;
    } catch (error) {
        console.error("Error validating user:", error);
        return false;
    }
}

export async function registerUser(username: string, password: string) {
    try {
        const hashedPass = await hash(password, 12);

        const user = await prisma.users.create({
            data: {
                username: username,
                password: hashedPass
            }
        });

        return user;
    } catch(error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export default prisma;
