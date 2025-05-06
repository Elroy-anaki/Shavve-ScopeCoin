import { createTransport, Transporter } from "nodemailer";
import { envVars } from "../envVars/envVars.config";

export const transporter: Transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: envVars.EMAIL_SECURE,
    auth: {
      user: String(envVars.EMAIL_SENDER), 
      pass: String(envVars.EMAIL_SENDER_PASSWORD), 
    },
  });

