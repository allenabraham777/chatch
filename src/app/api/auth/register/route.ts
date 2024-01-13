import { registerFormSchema } from '@/schema/authFormSchema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const parsedBody = registerFormSchema.parse(body);
        const { name, email, password, confirmPassword } = parsedBody;
        if (password !== confirmPassword) throw new Error('Password missmatch');
        const _user = await prisma.user.findFirst({ where: { email } });
        if (_user) throw new Error('User with this email already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { name, email, hashedPassword } });
        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json(`Error: ${error.message}`, { status: 400 });
    }
};
