import { User } from "@/config/db/schema"

// Each function in this file return another template for sending it in email


export const welcomeEmailTemplate = (userDetails: User): string => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #2e003e; padding: 40px; color: white;">
      <div style="max-width: 600px; margin: auto; background-color: #3e0a59; border-radius: 10px; padding: 30px;">
        <h1 style="color: #e0b3ff;">Welcome to ScopeCoin, ${userDetails.userName}!</h1>
        <p>We’re excited to have you onboard. ScopeCoin is your gateway to a smarter crypto experience.</p>
        <p>If you have any questions, just reply to this email. We’re here to help!</p>
        <hr style="border-color: #661c8b;">
        <p style="font-size: 12px; color: #cccccc;">This message was sent to ${userDetails.userEmail}</p>
      </div>
    </div>
  `;
  };

  export const forgotPasswordEmailTemplate = (userDetails: User, resetPasswordLink: string): string => {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #2e003e; padding: 40px; color: white;">
        <div style="max-width: 600px; margin: auto; background-color: #3e0a59; border-radius: 10px; padding: 30px;">
          <h1 style="color: #e0b3ff;">Reset Your ScopeCoin Password</h1>
          <p>Hi ${userDetails.userName},</p>
          <p>We received a request to reset your password. Click the button below to proceed:</p>
          <a href="${resetPasswordLink}" style="display: inline-block; background-color: #9c27b0; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Reset Password</a>
          <p style="margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
          <hr style="border-color: #661c8b;">
          <p style="font-size: 12px; color: #cccccc;">This message was sent to ${userDetails.userEmail}</p>
        </div>
      </div>
    `;
  };

  export const verifyAccountEmailTemplate = (userDetails: User, verifyEmailLink: string): string => {
    return `
      <div style="font-family: Arial, sans-serif; background-color: #2e003e; padding: 40px; color: white;">
        <div style="max-width: 600px; margin: auto; background-color: #3e0a59; border-radius: 10px; padding: 30px;">
          <h1 style="color: #e0b3ff;">Verify Your ScopeCoin Account</h1>
          <p>Hi ${userDetails.userName},</p>
          <p>Click the button below to verify your email address and activate your account:</p>
          <a href="${verifyEmailLink}" style="display: inline-block; background-color: #9c27b0; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Verify Email</a>
          <p style="margin-top: 20px;">If you didn't create a ScopeCoin account, you can ignore this email.</p>
          <hr style="border-color: #661c8b;">
          <p style="font-size: 12px; color: #cccccc;">This message was sent to ${userDetails.userEmail}</p>
        </div>
      </div>
    `;
  };