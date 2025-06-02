const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

// Định nghĩa kiểu dữ liệu cho API response
interface Province {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
  wards?: any[]; // Có thể thêm chi tiết nếu cần
}

const cityCodeMap: Record<string, number> = {
  "ha noi": 1,
  "ho chi minh": 79,
  "da nang": 48,
  "hai phong": 31,
  "can tho": 92,
  "binh duong": 74,
  "dong nai": 75,
  "khanh hoa": 56,
  "quang ninh": 22,
  "thua thien hue": 46,
  "nghe an": 40,
  "da lat": 68, // (lam dong)
  "vinh phuc": 26,
  "quang nam": 49,
  "tay ninh": 72,
  "long an": 80,
  "tien giang": 82,
  "ba ria vung tau": 77,
  "nam dinh": 36,
  "ninh binh": 37,
  "ben tre": 83,
};

export const getDistrictsByCityName = async (
  cityName: string
): Promise<string[]> => {
  try {
    const normalizedCityName = removeVietnameseTones(cityName)
      .toLowerCase()
      .trim();

    const cityCode = cityCodeMap[normalizedCityName];
    if (!cityCode)
      throw new Error(`Không tìm thấy mã tỉnh/thành phố: ${cityName}`);

    const detailRes = await fetch(
      `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
    );
    const detail: Province = await detailRes.json();

    return detail.districts.map((d: District) => d.name);
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách quận:", error.message);
    return [];
  }
};
