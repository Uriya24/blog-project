import {useContext, useState} from "react";
import {PostsContext} from "../providers/posts_provider";
import {PostCard} from "../components/post_card";
import {PostList} from "../components/post_list";

export function Posts() {
    const {postsArr} = useContext(PostsContext);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [displayPostsCount, setDisplayPostsCount] = useState(2);


    const handleSearchInputChange = (event) => {
        setSearchInputValue(event.target.value);
    };

    const handleLoadMore = () => {
        setDisplayPostsCount(displayPostsCount + 2)
    }

    // A function that filter the posts based on the search input and map each post into a Post card
    const filteredPostsArr = () => {
        return postsArr.filter((post) =>
            post.title.toLowerCase().includes(searchInputValue.toLowerCase()))
            .map((post) => <PostCard singlePost={post}/>);
    };

    // If the search input is empty we display posts based on the counter, if not we display all posts that included in the search
    const displayPosts = searchInputValue === "" ? filteredPostsArr().slice(0, displayPostsCount) : filteredPostsArr();

    return (
        <div className="flex flex-col justify-center items-center">
            <input className="text-black mt-6 mb-2 px-2 border-2 rounded placeholder-black bg-gray-400"
                   name="search" type="text"
                   placeholder="Search post"
                   onChange={handleSearchInputChange}/>
            <PostList>
                {displayPosts}
            </PostList>
            {/*if search input is empty show the load more button.
               if there are no more posts to show we display a message*/}
            <div className="inline-flex items-center justify-center">
                {searchInputValue === "" && <button
                    className="m-2 px-3 py-2 text-base font-semibold bg-blue-900 rounded-lg border-2 hover:bg-blue-950"
                    onClick={handleLoadMore}>Load more</button>}
                {postsArr.length <= displayPostsCount && <span
                    className="m-2 font-semibold text-sky-500"
                >No more posts</span>}
            </div>
        </div>
    )
}