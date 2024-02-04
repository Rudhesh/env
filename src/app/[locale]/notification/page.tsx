
import { sendMail } from "@/lib/mail"
import Layout from "../../../components/layout"



export default function Notification() {
const sent =async () => {
    'use server'
await sendMail({
    to : 'rudeshdhote@gmail.com',
    name:'vadid',
    subject: 'test mail',
    body: '<h1>Hello World !</h1>'
})
}
  
    return (
        <Layout>
            <h1>Notification</h1>
        <form >
            <button formAction={sent}>test</button>
        </form>
      </Layout>
    )
}