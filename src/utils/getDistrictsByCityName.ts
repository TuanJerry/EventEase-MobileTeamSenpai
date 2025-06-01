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

export const getDistrictsByCityName = async (cityName: string): Promise<string[]> => {
  try {
    const res = await fetch("https://provinces.open-api.vn/api/p/");
    const provinces: Province[] = await res.json();

    const normalizedCityName = removeVietnameseTones(cityName);
    const city: Province | undefined = provinces.find((p: Province) =>
      removeVietnameseTones(p.name).includes(normalizedCityName)
    );

    if (!city) throw new Error("Không tìm thấy tỉnh/thành phố!");

    const detailRes = await fetch(`https://provinces.open-api.vn/api/p/${city.code}?depth=2`);
    const detail: Province = await detailRes.json();

    return detail.districts.map((d: District) => d.name); // Trả về danh sách tên quận/huyện
  } catch (error: any) { // Xác định kiểu cho error
    console.error("Lỗi khi lấy danh sách quận:", error.message);
    return [];
  }
};