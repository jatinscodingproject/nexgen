const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

app.get('/products', (req, res) => {
    res.render('pages/services');
});

app.post('/contact-submit', async(req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        address,
        message
    } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"NexGen Contact" <jatincoder104@gmail.com>`,
            to: 'mail.nexgendigitalservices.lk',
            replyTo: email,
            subject: '✨ New Contact Form Submission',
            html: `
    <div style="background:#eef2f7;padding:40px 0;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center">
                    <table width="620" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 35px rgba(0,0,0,0.12);">

                        <!-- HEADER -->
                        <tr>
                            <td style="background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:28px;text-align:center;">
                                <h1 style="margin:0;color:#ffffff;font-size:26px;letter-spacing:1px;">
                                    NexGen Digital Services
                                </h1>
                                <p style="margin:8px 0 0;color:#e0f2fe;font-size:14px;">
                                    New Website Contact Message
                                </p>
                            </td>
                        </tr>

                        <!-- BODY -->
                        <tr>
                            <td style="padding:32px;">
                                <p style="font-size:15px;color:#374151;margin-bottom:24px;">
                                    You’ve received a new enquiry from your website. The details are below:
                                </p>

                                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                                    <tr>
                                        <td style="padding:12px;font-weight:600;color:#111827;width:35%;">Full Name</td>
                                        <td style="padding:12px;color:#374151;">
                                            ${first_name} ${last_name}
                                        </td>
                                    </tr>
                                    <tr style="background:#f9fafb;">
                                        <td style="padding:12px;font-weight:600;color:#111827;">Email Address</td>
                                        <td style="padding:12px;color:#374151;">${email}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:12px;font-weight:600;color:#111827;">Phone Number</td>
                                        <td style="padding:12px;color:#374151;">${phone}</td>
                                    </tr>
                                    <tr style="background:#f9fafb;">
                                        <td style="padding:12px;font-weight:600;color:#111827;">Address</td>
                                        <td style="padding:12px;color:#374151;">${address}</td>
                                    </tr>
                                </table>

                                <!-- MESSAGE BOX -->
                                <div style="margin-top:28px;">
                                    <h3 style="margin-bottom:10px;color:#4f46e5;font-size:18px;">
                                        Message
                                    </h3>
                                    <div style="background:#eef2ff;padding:18px;border-radius:10px;color:#1f2937;font-size:14px;line-height:1.7;">
                                        ${message}
                                    </div>
                                </div>

                                <!-- CTA -->
                                <div style="margin-top:32px;text-align:center;">
                                    <a href="mailto:${email}" 
                                       style="display:inline-block;padding:14px 28px;background:#4f46e5;color:#ffffff;
                                              text-decoration:none;border-radius:30px;font-size:14px;font-weight:600;">
                                        Reply to Customer
                                    </a>
                                </div>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td style="background:#f3f4f6;padding:18px;text-align:center;font-size:13px;color:#6b7280;">
                                © ${new Date().getFullYear()} NexGen Digital Services <br>
                                <span style="font-size:12px;color:#9ca3af;">
                                    This email was generated from your website contact form.
                                </span>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </div>
    `
        };


        await transporter.sendMail(mailOptions);
        console.log(transporter.sendMail(mailOptions))
        res.render('pages/contact');

    } catch (error) {
        console.error('Email Error:', error);
        res.render('pages/contact');
    }
});



app.listen(process.env.PORT, async() => {
    try {
        console.log('Server is Ruuning on', `${process.env.PORT}`)
    } catch (err) {
        console.log('something went wrong');
    }
})