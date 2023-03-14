const nodemailer = require("nodemailer");
const {google} =require('googleapis')
const config=require('./config')
const OAuth2=google.auth.OAuth2
const OAuth2_client=new OAuth2(config.clientId,config.clientSecret)
OAuth2_client.setCredentials({refresh_token:config.refreshToken})

module.exports = async (email, subject, text) => {
	try {
        // const accessToken=OAuth2_client.getAccessToken()
		const transporter = nodemailer.createTransport({
			 host: process.env.HOST,
			// service: 'gmail',
			// port: Number(process.env.EMAIL_PORT),
			// secure: Boolean(process.env.SECURE),
			auth: {
				type: "OAuth2",
				user: config.user,
				clientId: config.clientId,
				clientSecret: config.clientSecret,
				refreshToken: config.refreshToken
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			text:"Please click the link below to reset your password. 🙂" +text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};