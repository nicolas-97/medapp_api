import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

async function sendEmailRecoveryPassword(email) {
 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });
    
    transporter.verify().then( () => { console.log("Listos para enviar el correo") });

    const info = await transporter.sendMail({
        from: '"Hey! olvidaste tu contraseña?" <natlopeztorres125@gmail.com>', // sender address
        to: 'nicolas.torreslop@gmail.com', // list of receivers
        subject: "Olvidaste tu contraseña", // Subject line
        html:  `
        <b> Esto es un test, saludos desde node :D </b>
        <br/>
        <p> 
            Ahora con una organización de archivos con mas <b>POWER!!!</b>
            "con un poco de suerte"
        </p>
        `
    });

}

export { sendEmailRecoveryPassword };