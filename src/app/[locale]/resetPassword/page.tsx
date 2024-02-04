'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { handlePasswordResetRequest } from '../../../../actions/actions';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const locale = useLocale();



    const clientAction = async () => {

        const isValidPasswordResetRequest = await handlePasswordResetRequest(email)

        console.log(isValidPasswordResetRequest)
        if (isValidPasswordResetRequest) {
            toast({
                title: 'Password reset successfully.',
            });
            router.push(`/${locale}`);
        }
        else if (!isValidPasswordResetRequest) {
            toast({
                title: 'Invalid current password ',
                description: 'Please enter your correct credentials.',
            });
        } else {

            toast({
                title: 'Invalid current password ',
                description: 'Please enter your correct credentials.',
            });
        }

    }

    const revertBack = () => {
        // Add logic to navigate to the Forgot Password page
        router.push(`/${locale}`);
      };

    return (
        <div className="min-h-screen flex items-center justify-center">


            <Card className="w-[350px]">
                <CardContent >
                    <CardHeader>
                        <CardTitle>Find your account</CardTitle>
                        <CardDescription>Please enter your email to send a reset token and link to your email account.</CardDescription>
                    </CardHeader>
                    <div className="grid gap-4 py-4">
                        {/* Current Password */}
                        <div className="grid grid-cols-4 items-center gap-4">

                        </div>

                    </div>

                    <CardContent>
                        <form onSubmit={clientAction}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="block mb-4">
                                        Email: </Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border rounded p-2"
                                        required
                                    />
                                </div>

                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={revertBack} variant="outline">Cancel</Button>
                        <Button onClick={clientAction} variant='outline'>Send</Button>
                    </CardFooter>
                </CardContent>
            </Card>

        </div>
    );
}

