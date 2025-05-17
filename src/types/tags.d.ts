// Định nghĩa kiểu dữ liệu cho prop
interface Tag {
    name: string;
    color: string;
    icon: React.ComponentType<any>; // Kiểu cho component icon (SVG hoặc Icon)
}

interface TagListProps {
    tags: Tag[];
}