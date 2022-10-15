import React, {useEffect, useRef, useState} from "react";
import Counter from "../components/Counter";
import '../styles/App.css';
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Preloader from "../components/Preloader/Preloader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearcherPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // async function fetchPosts() {  // пример setTimeout
    //     setIsPostsLoading(true)
    //     setTimeout(async () => {
    //    подгружаются пост...
    //         setIsPostsLoading(false)
    //     }, 1000)
    //
    // }
// получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                {/*форма для создания поста*/}
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            {/*форма для фильтрации поста*/}
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Колличкство элементов на странице"
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 25, name: "25"},
                    {value: -1, name: "Показать все"},
                ]}
            />
            {postError &&
            <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList
                posts={sortedAndSearcherPosts}
                title="Посты про JS"
                remove={removePost}
            />
            <div ref={lastElement} style={{height: 20, background: "red"}}/>
            {isPostsLoading &&
            <Preloader/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

            <Counter/>
        </div>
    )
}

export default Posts;