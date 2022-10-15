import {useMemo} from "react";

// сортировка
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort])) //localeCompare используется при сортировке
        }
        return posts;
    }, [sort, posts])

    return sortedPosts
}

//возвращает отфильтрованный и отсортированный массив
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearcherPosts = useMemo(() => { // остаются только те посты, которые прошли фильтрацию
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query)) // toLowerCase игнорирует регистр
    }, [query, sortedPosts])
    return sortedAndSearcherPosts
}
