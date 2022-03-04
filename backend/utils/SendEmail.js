const nodeMiler = require("nodemailer");

const SendEamil = async (options) =>{

    const transporter = nodeMiler.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,
        }
    })
    const mailoption = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }

    await transporter.sendMail(mailoption);
}

module.exports = SendEamil;