# EventEase-MobileTeamSenpai

A Event Recommendation Mobile App made by team Mobile Team Senpai - HCMUT BKU

Copyright belonged to Mobile Team Senpai

# Cấu trúc thư mục
````
EventEase-MobileTeamSenpai/
│── assets/              # Hình ảnh, biểu tượng, âm thanh, fonts
│── src/                 # Code chính của ứng dụng
│   ├── api/             # Các hàm gọi API (fetch, axios, firebase, ...)
│   ├── components/      # Các component dùng chung (Button, Card, ...)
│   ├── constants/       # Các hằng số (màu sắc, fonts, spacing, ...)
│   ├── contexts/        # Context API (nếu không dùng Redux)
│   ├── hooks/           # Các custom hooks (useAuth, useTheme, ...)
│   ├── navigation/      # Điều hướng (React Navigation)
│   ├── screens/         # Các màn hình (HomeScreen, LoginScreen ProfileScreen, ...)
│   ├── services/        # Xử lý logic ứng dụng (Auth, Firebase, Database)
│   ├── store/           # Redux hoặc Zustand (quản lý trạng thái)
│   ├── types/           # Các định nghĩa TypeScript (interfaces, types)
│   ├── utils/           # Hàm tiện ích chung (formatDate, validateEmail, ...)
│   ├── App.tsx          # File gốc của ứng dụng
│── .gitignore           # Các file cần bỏ qua khi commit vào Git
│── app.json             # Cấu hình chung cho Expo
│── babel.config.js      # Cấu hình Babel
│── package.json         # Danh sách thư viện và scripts
│── tsconfig.json        # Cấu hình TypeScript
│── yarn.lock / package-lock.json # Quản lý phiên bản dependency
```

# Cách chạy dự án
1. Clone repository về máy:
    ```bash
    https://github.com/TuanJerry/EventEase-MobileTeamSenpai.git
    ```
2. Cài đặt các dependencies:
    ```bash
    cd EventEase-MobileTeamSenpai
    npm install
    ```
3. Chạy dự án trên thiết bị giả lập hoặc thiết bị thật:
    ```bash
    npm start
    ```

