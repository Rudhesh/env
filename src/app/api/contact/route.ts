import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer';

// Handles POST requests to /api


export async function POST(request: { formData: () => any; }) {
    // const formData1 = await request.formData()
    // console.log(formData1)
    // return new Response('OK')
    const username = process.env.NEXT_PUBLIC_BURNER_USERNAME;
    const password = process.env.NEXT_PUBLIC_BURNER_PASSWORD;
    const myEmail = process.env.NEXT_PUBLIC_PERSONAL_EMAIL;


    console.log("dealing with request")
    const formData = await request.formData()
    const name = formData.get('name')
    console.log(name)
    const email = formData.get('email')
    const message = formData.get('message')


    // create transporter object
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
    });

    try {

        await transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: email,
            subject: `Website activity from ${email}`,
            html: `
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            <p>Message: ${message} </p>
            `,
        })

        return NextResponse.json({ message: "Success: email was sent" })

    } catch (error) {
        console.log(error)
        NextResponse.json({ message: "COULD NOT SEND MESSAGE" })
    }


}
