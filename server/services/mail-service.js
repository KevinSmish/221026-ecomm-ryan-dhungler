import nodemailer from "nodemailer";
import dotenv from "dotenv";

class MailService {
  constructor() {
    dotenv.config();

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOrderMail(to, name, status) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: "Order status",
        text: "",
        html: `
            <div>
                <h1>Hi ${name}, Your order's status is: <span style="color:red;">${status}</span></h1>
                <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
            </div>
            `,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new MailService();
