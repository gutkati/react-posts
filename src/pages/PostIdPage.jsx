import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useFetching} from "../hooks/useFetching";
import Preloader from "../components/Preloader/Preloader";
import PostService from "../API/PostService";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id).then(r => params.id)
        fetchComments(params.id).then(r => params.id)
    }, [])

    return (

        <div>
            <h1>Пользователь попал на страницу поста с ID = {params.id}</h1>
            {isLoading
                ? <Preloader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2>
                Комментарии:
            </h2>
            {isComLoading
                ? <Preloader/>
                : <div>
                    {comments.map(comm =>
                        <div style={{margin: 15}}
                             key={comm.id}
                        >
                            <h4>{comm.email}</h4>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}

export default PostIdPage;