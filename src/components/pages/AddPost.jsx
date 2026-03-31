import { useForm } from "react-hook-form";
import { Button, Inputbox, Logo } from "../index.js";
import postService from '../../appwrite/postService.js'
import { useSelector } from "react-redux";
import { useState } from "react";

function AddPost() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.auth.userData);

    const addpost = async (data) => {
        if (!user || loading) return
        try {
            setLoading(true)
            const res = await postService.createPost({
                title: data.title,
                content: data.content,
                userId: user.$id
            })
            console.log(res)
            reset()
        }
        catch (error) {
            console.log("FULL ERROR:", error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className=''>
            <h1>Add Post Page</h1>
            <div className='w-full bg-blue-100 h-125  p-2 flex'>
                <form
                    className="mt-4 w-[50%]"
                    onSubmit={handleSubmit(addpost)}>
                    <div>
                        <Inputbox
                            label="title"
                            type="text"
                            placeholder="Enter post title"
                            {...register(
                                "title", {
                                required: "This is required",
                            }
                            )}
                        />
                        <textarea
                            className="w-full mt-4 p-2 border rounded-lg"
                            placeholder="Enter post content"
                            {...register("content", { required: "Content is required" })}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Adding..." : "Add Post"}
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddPost
