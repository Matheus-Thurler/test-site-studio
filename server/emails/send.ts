import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend('re_UdxphSwW_2R5g25H7zM6ibvHrqVwGRZjj')

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'HR Folio <contact@hrcd.ptbr>',
      to: ['contact@hrcd.ptbr'],
      subject: 'Nouveau message de HR Folio',
      html: `
      <p>Un nouveau message a été envoyé depuis le formulaire de contact de HR Folio.</p>
      <p>Voici les détails du message :</p>
      <ul>
        <li>Nom : ${fullname}</li>
        <li>Email : ${email}</li>
        <li>Téléphone : ${phone}</li>
        <li>Sujet : ${subject}</li>
        <li>Message : ${message}</li>
      </ul>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
