'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

import { Card } from '@/components/ui/card';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

type Props = {};

const Home = (props: Props) => {
    return (
        <div className="h-full flex justify-center bg-secondary pt-[10%]">
            <Tabs className="w-full sm:w-96" defaultValue="login">
                <TabsList className="w-full grid grid-cols-2 h-12 p-0">
                    <TabsTrigger
                        className="h-full font-semibold text-base data-[state=active]:text-sky-500"
                        value="login"
                    >
                        Login
                    </TabsTrigger>
                    <TabsTrigger
                        className="h-full font-semibold text-base data-[state=active]:text-sky-500"
                        value="signup"
                    >
                        Sign Up
                    </TabsTrigger>
                </TabsList>
                <Card className="p-6 pt-4">
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="signup">
                        <RegisterForm />
                    </TabsContent>
                </Card>
            </Tabs>
        </div>
    );
};

export default Home;
