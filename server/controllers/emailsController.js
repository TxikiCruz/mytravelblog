const nodemailer = require('nodemailer')
// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
	// you need to enable the less secure option on your gmail account
	// https://myaccount.google.com/lesssecureapps?pli=1
	service: 'Hotmail',
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	}
});
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
		console.log('=========================================> Email sent !!')
		return res.json({ on: true, message: 'email sent' })
	}
	catch (err) {
		return res.json({ ok: false, message: err })
	}
}

module.exports = { send_email }