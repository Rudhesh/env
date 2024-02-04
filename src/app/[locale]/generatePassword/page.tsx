"use client"
import { useState } from 'react';
import base64 from "base-64";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { resetPassword } from '../../../../actions/actions';
import { useRouter } from "next/navigation";
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';



const GeneratePassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const router = useRouter()
    const locale = useLocale();
    const encodedNewPassword = base64.encode(newPassword);
   

    const searchParams = useSearchParams()

    const emailId = searchParams.get('email') ?? '';
    const code = searchParams.get('code') ?? '';

    async function clientAction() {

        const isValidCurrentPassword = await resetPassword(emailId, encodedNewPassword, code);
        console.log(isValidCurrentPassword)
        if (isValidCurrentPassword.succeeded) {
            toast({
                title: 'Password changed successfully.',
            });

            router.replace(`/${locale}`)

        }
        else if (isValidCurrentPassword?.error) {
            toast({
                title: 'Invalid current password ',
                description: 'Please enter your correct credentials.',
            });
        } else {

            toast({
                title: 'Invalid current password ',
                description: 'Please enter your correct credentials.',
            });

            router.replace("/login")
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center">

            <Card className="w-[350px]">
                <CardContent >
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <div className="grid gap-4 py-4">
                        {/* Current Password */}
                        <div className="grid grid-cols-4 items-center gap-4">
                        </div>

                    </div>

                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">

                                    <Label htmlFor="currentPassword" >
                                        New Password
                                    </Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        className="col-span-3"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                    <Button variant="outline">Cancel</Button>
                        <Button variant='outline' onClick={clientAction}>Password Reset</Button>
                    </CardFooter>
                </CardContent>
            </Card>


        </div>
    );
};

export default GeneratePassword;
