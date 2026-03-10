const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/products", (req, res) => {
  res.render("pages/services");
});

app.post("/contact-submit", async (req, res) => {

  const first_name = req.body.first_name?.trim();
  const last_name = req.body.last_name?.trim();
  const email = req.body.email?.trim();
  const phone = req.body.phone?.trim();
  const address = req.body.address?.trim();
  const message = req.body.message?.trim();

  console.log("📩 Contact Form Data:", req.body);

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
       auth: {
        user: "digitalservicesnexgen@gmail.com",
        pass: 'yvlivnxfqcangnej',
      },
    });

    await transporter.verify();
    console.log("✅ SMTP ready");


    const htmlTemplate = `
    
    <div style="background:#f1f5f9;padding:40px;font-family:Arial,sans-serif">
    
      <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">

            <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)">
              
              <tr>
                <td style="background:linear-gradient(135deg,#4f46e5,#06b6d4);padding:30px;text-align:center;color:white">
                  <h1 style="margin:0">NexGen Digital Services</h1>
                  <p style="margin-top:8px;font-size:14px">New Contact Form Message</p>
                </td>
              </tr>

              <tr>
                <td style="padding:30px">

                  <h2 style="color:#111;margin-bottom:20px">
                    📩 New Enquiry Received
                  </h2>

                  <table width="100%" style="border-collapse:collapse;font-size:14px">

                    <tr>
                      <td style="padding:10px;font-weight:bold">Full Name</td>
                      <td style="padding:10px">${first_name} ${last_name}</td>
                    </tr>

                    <tr style="background:#f9fafb">
                      <td style="padding:10px;font-weight:bold">Email</td>
                      <td style="padding:10px">${email}</td>
                    </tr>

                    <tr>
                      <td style="padding:10px;font-weight:bold">Phone</td>
                      <td style="padding:10px">${phone}</td>
                    </tr>

                    <tr style="background:#f9fafb">
                      <td style="padding:10px;font-weight:bold">Address</td>
                      <td style="padding:10px">${address}</td>
                    </tr>

                  </table>


                  <h3 style="margin-top:30px;color:#4f46e5">Message</h3>

                  <div style="
                      background:#eef2ff;
                      padding:20px;
                      border-radius:8px;
                      line-height:1.6;
                      color:#1f2937;
                      font-size:14px
                  ">
                    ${message}
                  </div>


                  <div style="margin-top:30px;text-align:center">

                    <a href="mailto:${email}"
                    style="
                    background:#4f46e5;
                    color:white;
                    padding:12px 26px;
                    text-decoration:none;
                    border-radius:25px;
                    font-size:14px;
                    font-weight:600
                    ">
                    Reply to Customer
                    </a>

                  </div>

                </td>
              </tr>

              <tr>
                <td style="background:#f3f4f6;text-align:center;padding:16px;font-size:13px;color:#6b7280">

                  © ${new Date().getFullYear()} NexGen Digital Services

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </div>

    `;


    const mailOptions = {
      from: `"NexGen Website" <${process.env.MAIL_USER}>`,
      to: "jatincoder104@gmail.com",
      replyTo: email,
      subject: "✨ New Contact Form Submission",
      html: htmlTemplate
    };


    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent:", info.messageId);

    res.redirect("/contact?success=1");

  } catch (error) {

    console.error("❌ Email Error:", error);
    res.redirect("/contact?error=1");
  }
});



app.listen(process.env.PORT, async () => {
  try {
    console.log("Server is Ruuning on", `${process.env.PORT}`);
  } catch (err) {
    console.log("something went wrong");
  }
});
