import {useContext} from "react";
import {PostsContext} from "../providers/posts_provider";
import {useForm} from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom";
import {UserContext} from "../providers/user_provider";

export function EditPost() {
    const navigate = useNavigate()
    const {id} = useParams();
    const {user} = useContext(UserContext);
    const {postsArr, setPostsArr, getPostById} = useContext(PostsContext);
    const initialPost = getPostById(id);
    const {register, handleSubmit, formState} = useForm({
        defaultValues: initialPost
    });

    if (!user) {
        return <p className="text-center text-red-500 text-2xl mt-3">Only admin can edit posts!</p>
    }

    const handleEditPostSubmit = (data) => {
        // Creating a post with the same attributes as the original post, but with different title, body and date
        const editedPost = {
            ...initialPost,
            title: data.title,
            body: data.body,
            date: data.date,
        }

        // replacing the new edited post with the original post in the posts array, by creating actually a new array of posts
        const updatedPostsArr = postsArr.map((post) => post.id.toString() === id ? editedPost : post);
        setPostsArr(updatedPostsArr);

        // Navigate to the '/posts' page after editing a post using the navigate function from react-router-dom
        navigate("/posts");
    }

    return (<div className="container mx-auto p-4 my-6 text-center w-full max-w-md">
            <h3 className="mb-12 text-3xl font-bold">Edit post</h3>
            <form className="text-black flex flex-col" onSubmit={handleSubmit(handleEditPostSubmit)}>
                {formState.errors.title &&
                    <span className="text-start text-red-600">{formState.errors.title.message}</span>}
                <input className="mb-4 px-1 border-2 rounded placeholder-black bg-gray-400"
                       type="text" placeholder="Post title" {...register('title', {
                    required: "Title is required",
                    minLength: {value: 3, message: "Title must be at least 3 characters long"},
                })}/>
                {formState.errors.body &&
                    <span className="text-start text-red-600">{formState.errors.body.message}</span>}
                <textarea className="mb-10 h-40 px-1 border-2 rounded placeholder-black bg-gray-400"
                          placeholder="Post content" {...register('body', {required: "Content is required",})}>
                </textarea>
                {formState.errors.date && (
                    <span className="text-start text-red-600">{formState.errors.date.message}</span>)}
                <input
                    className="mb-4 px-1 border-2 rounded placeholder-black bg-gray-400"
                    type="date" {...register('date', {required: "Date is required",})}
                />
                <button
                    className="px-4 py-1 font-semibold border-2 text-white bg-blue-900 rounded-lg hover:bg-blue-950"
                    type="submit">Submit Post
                </button>
            </form>
        </div>)
}