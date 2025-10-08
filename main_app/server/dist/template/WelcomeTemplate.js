"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeEmailTemplate = void 0;
const welcomeEmailTemplate = (name) => {
    return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fffe; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <div style="background-color: rgba(255, 255, 255, 0.1); display: inline-block; padding: 12px 20px; border-radius: 50px; margin-bottom: 20px;">
          <span style="font-size: 32px;">🌾</span>
        </div>
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
          Welcome to Naturopura
        </h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 300;">
          Smart Agriculture for Modern Farmers
        </p>
      </div>
      
      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);">
        <h2 style="color: #2e7d32; margin: 0 0 24px 0; font-size: 24px; font-weight: 600; text-align: center;">
          Hello ${name}! 👋
        </h2>
        
        <p style="color: #333333; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px; text-align: center;">
          We're absolutely thrilled to have you join our community of forward-thinking farmers and agricultural innovators.
        </p>
        
        <!-- Features Section -->
        <div style="background-color: #f1f8e9; padding: 30px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #4caf50;">
          <h3 style="color: #2e7d32; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
            🚀 What's waiting for you:
          </h3>
          <ul style="color: #555555; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li style="margin-bottom: 8px;">Smart crop monitoring and analytics</li>
            <li style="margin-bottom: 8px;">Weather predictions and soil insights</li>
            <li style="margin-bottom: 8px;">Automated irrigation recommendations</li>
            <li style="margin-bottom: 8px;">Connect with fellow farmers in your area</li>
          </ul>
        </div>
        
        <!-- Call to Action -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3); transition: all 0.3s ease;">
            Explore Your Dashboard
          </a>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e8f5e8;">
          <p style="color: #666666; margin: 0 0 8px 0; font-size: 16px; font-weight: 500;">
            Happy Farming! 🌱
          </p>
          <p style="color: #888888; margin: 0; font-size: 14px;">
            — The Naturopura Team
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding: 20px; color: #888888; font-size: 12px;">
        <p style="margin: 0;">
          © 2024 Naturopura. All rights reserved.
        </p>
        <p style="margin: 8px 0 0 0;">
          Growing smarter, together 🌾
        </p>
      </div>
    </div>
  `;
};
exports.welcomeEmailTemplate = welcomeEmailTemplate;
