// utils/extractTime.ts
export interface TimeParts {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    period: string;
}

export const extractTime = (dateString: string): TimeParts => {
    // Mặc định trả về nếu chuỗi không hợp lệ
    const defaultParts: TimeParts = {
        day: 'N/A',
        month: 'N/A',
        year: 'N/A',
        hour: 'N/A',
        minute: 'N/A',
        period: 'N/A',
    };

    try {
        // Tách chuỗi thành phần ngày và phần giờ
        const [datePart, timePart, period] = dateString.split(' ');

        if (!datePart || !timePart) {
        return defaultParts;
        }

        // Tách ngày, tháng, năm
        const [day, month, year] = datePart.split('-');
        if (!day || !month || !year) {
        return defaultParts;
        }

        // Tách giờ, phút, AM/PM
        const [hour, minute] = timePart.split(':');
        if (!hour || !minute || !period) {
        return defaultParts;
        }

        return {
        day,
        month,
        year,
        hour,
        minute,
        period: period.toUpperCase(), // Chuẩn hóa AM/PM
        };
    } catch (error) {
        return defaultParts;
    }
};