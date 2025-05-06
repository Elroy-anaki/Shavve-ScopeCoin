import { User } from "@/config/db/schema";
import { transporter } from "@/config/emails/emailConfig";
import { envVars } from "@/config/envVars/envVars.config";
import { forgotPasswordEmailTemplate, verifyAccountEmailTemplate, welcomeEmailTemplate } from "@/templates/emailsTemplates";


export const sendWelcomeEmail = async (user: User) => {
    try {
        const template = welcomeEmailTemplate(user)
        await transporter.sendMail({
            from: envVars.EMAIL_SENDER,
            to: user.userEmail,
            subject: `Welcome to ScopeCoin`,
            html: template
        })
    } catch (error) {
        throw error
    }
}

export const sendVerfiyAccountEmail = async (user: User, verifyAccountId: string) => {
    try {
        const verifyEmailLink = `${envVars.CLIENT_BASE_URL}/auth/verifyEmail/${verifyAccountId}`
        const template = verifyAccountEmailTemplate(user, verifyEmailLink)
        await transporter.sendMail({
            from: envVars.EMAIL_SENDER,
            to: user.userEmail,
            subject: `Verify Email`,
            html: template
        })
    } catch (error) {
        throw error
    }
}
export const sendResetPasswordEmail = async (user: User, resetPasswordId: string) => {
    try {
        const resetPasswordEmail = `${envVars.CLIENT_BASE_URL}/auth/resetPassword/${resetPasswordId}`
        const template = forgotPasswordEmailTemplate(user, resetPasswordEmail)
        await transporter.sendMail({
            from: envVars.EMAIL_SENDER,
            to: user.userEmail,
            subject: `Reset Passworrd`,
            html: template
        })
    } catch (error) {
        throw error
    }
}