const nodemailer = require('nodemailer')

// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
	// you need to enable the less secure option on your gmail account
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
		//clientId: process.env.OAUTH_CLIENTID,
		//clientSecret: process.env.OAUTH_CLIENT_SECRET,
		//refreshToken: process.env.OAUTH_REFRESH_TOKEN
	}
})

const send_email = async (req, res) => {
	const { name, email, subject, message } = req.body
	const default_subject = 'This is a default subject'
	const mailOptions = {
		to: process.env.NODEMAILER_EMAIL,
		subject: "New message from " + name,
		html: '<p>' + (subject || default_subject) + '</p><p><pre>' + message + '</pre></p>'
	}
	try {
		const response = await transport.sendMail(mailOptions)
		console.log(response)
		console.log('Email sent!')
		return res.json({ on: true, message: 'email sent' })
	}
	catch (err) {
		return res.json({ ok: false, message: err })
	}
}

module.exports = { send_email }