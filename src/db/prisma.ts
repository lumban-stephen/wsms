import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function validateUser(username: string, password: string): Promise<boolean> {
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

export default prisma;
