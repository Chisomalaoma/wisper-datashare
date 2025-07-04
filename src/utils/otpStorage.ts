// Simple in-memory OTP storage for demo purposes
// In production, use Redis or database with proper expiration

interface OTPRecord {
    otp: string;
    nin: string;
    phone: string;
    createdAt: number;
    expiresAt: number;
}

const otpStorage = new Map<string, OTPRecord>();

export const storeOTP = (nin: string, phone: string, otp: string): void => {
    const key = `${nin}_${phone}`;
    const now = Date.now();
    const expiresAt = now + (5 * 60 * 1000); // 5 minutes expiration

    otpStorage.set(key, {
        otp,
        nin,
        phone,
        createdAt: now,
        expiresAt
    });

    // Clean up expired OTPs
    cleanupExpiredOTPs();
};

export const verifyOTP = (nin: string, phone: string, otp: string): boolean => {
    const key = `${nin}_${phone}`;
    const record = otpStorage.get(key);

    if (!record) {
        return false;
    }

    // Check if OTP is expired
    if (Date.now() > record.expiresAt) {
        otpStorage.delete(key);
        return false;
    }

    // Check if OTP matches
    if (record.otp !== otp) {
        return false;
    }

    // Remove OTP after successful verification
    otpStorage.delete(key);
    return true;
};

export const cleanupExpiredOTPs = (): void => {
    const now = Date.now();
    for (const [key, record] of otpStorage.entries()) {
        if (now > record.expiresAt) {
            otpStorage.delete(key);
        }
    }
};

// Clean up expired OTPs every minute
setInterval(cleanupExpiredOTPs, 60 * 1000); 