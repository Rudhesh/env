'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { changeEmail, confirmEmail, getEmailConfirmationCode } from '../../../../actions/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';


export const unstable_concurrentMode = false;

const ChangeEmail = () => {
    const router = useRouter();
    const locale = useLocale();
    const searchParams = useSearchParams();

    const userId = searchParams.get('userId') ?? '';
    const emailId = searchParams.get('email') ?? '';
    const code = searchParams.get('code') ?? '';

    const [data, setData] = useState({ succeeded: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await changeEmail(userId, emailId, code);
                setData(result);
                console.log(result.succeeded)
                if (result.succeeded) {
                    // If email change is successful, trigger email confirmation process
                    const confirmationCodeResult = await getEmailConfirmationCode(userId,emailId);
                   
                    if (confirmationCodeResult) {
                     console.log({confirmationCodeResult})
                        await confirmEmail(userId, confirmationCodeResult,emailId);
                        // Assuming you have a sendMailer function to send the confirmation email
                    }
                }
                
            } catch (error) {
                // Handle error if necessary
            }
        };

        fetchData();
    }, [userId, emailId, code]);

    const handleBackButtonClick = () => {
        router.replace(`/${locale}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Change Email</CardTitle>
                    <CardDescription>Update your email address for your account.</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Display success or error message based on the API response */}
                    {data.succeeded ? (
                        <p className="text-green-600">
                            Email changed successfully. Click button to go back to the app.
                        </p>
                    ) : (
                        <p className="text-red-600">
                            An error occurred while changing your email. Please try again later.
                        </p>
                    )}
                </CardContent>

                <CardFooter>
                    <Button variant="outline" onClick={handleBackButtonClick}>
                        Back to App
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ChangeEmail;
