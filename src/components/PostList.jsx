import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import "../styles/App.css"

const PostList = ({posts, title, remove}) => {

    if (!posts.length) { // проверяем, что массив пустой
        return (
            <h1 style={{textAlign: "center"}}>
                Посты не найдены!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {/*библиотека анимации*/}
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem
                            number={index + 1}
                            post={post}
                            remove={remove}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostList;