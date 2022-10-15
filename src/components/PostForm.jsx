import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: "", body: ""})

    function handleChangeTitle(event) {
        setPost({...post, title: event.target.value})
    }

    function handleChangeBody(event) {
        setPost({...post, body: event.target.value})
    }

    function addNewPost(e) {
        e.preventDefault()
        const newPost = {...post, id: Date.now()}
        create(newPost)
        setPost({title: "", body: ""})
    }

    return (
        <form>
                <MyInput
                    value={post.title}
                    onChange={handleChangeTitle}
                    type="text"
                    placeholder="Название поста"
                />

                <MyInput
                    value={post.body}
                    onChange={handleChangeBody}
                    type="text"
                    placeholder="Описание поста"
                />

                <MyButton
                    type="submit"
                    onClick={addNewPost}
                >
                    Создать пост
                </MyButton>
            </form>
    );
};

export default PostForm;