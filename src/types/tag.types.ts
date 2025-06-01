import { ReactElement } from 'react';

export interface Tag {
    name: string;
    color: string;
    icon: () => ReactElement;
    hashtag: string;
}

export interface TagListProps {
    tags: Tag[];
    onTagPress: (hashtag: string) => void;
} 