export function extractCleanAddress({
    formattedAddress,
    name,
    street,
    country
}: {
    formattedAddress: string;
    name?: string | null;
    street?: string | null;
    country?: string | null;
}): string {
    const parts = formattedAddress.split(',').map(p => p.trim());

    // Các từ khóa cần loại bỏ (ghi thường để so sánh không phân biệt hoa thường)
    const lowerCaseBlacklist = [
        name?.toLowerCase() || '',
        country?.toLowerCase() || '',
        ...(street ? [street.toLowerCase()] : [])
    ].filter(Boolean);

    // Hàm kiểm tra có chứa phần nào của blacklist
    const isBlacklisted = (part: string) => {
        const lower = part.toLowerCase();
        return lowerCaseBlacklist.some(black => black && lower.includes(black));
    };

    const filteredParts = parts.filter(part => !isBlacklisted(part));

    return filteredParts.join(', ');
}
