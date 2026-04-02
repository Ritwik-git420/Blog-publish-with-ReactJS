import React, { useEffect, useState } from 'react'
import { Button } from '../index'
import postService from '../../appwrite/postService'
import { MdDelete } from "react-icons/md"
import {Inputbox} from "../index"

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchposts()
    }, [])

    const deleteposts = async (id) => {
        try {
            setLoading(true)
            const res = await postService.deletePost(id)
            setPosts(posts.filter((post) => post.$id !== id))
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const fetchposts = async () => {
        try {
            setLoading(true)
            const res = await postService.getPosts()
            setPosts(res)
            console.log(res)

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const editposts = (id) => {
        setEditingId(prev => prev === id ? null : id)
    }

    return (
        <div className=''>
            <h1>All Post Page</h1>
            <div className='w-full bg-blue-100 h-125  p-2 flex justify-between'>
                <div className="postcard bg-amber-100 h-125 w-4/5 m-2 p-2 overflow-y-auto scroll-smooth space-y-3">
                    {[...posts].reverse().map((post) => (
                        <div
                            key={post.$id}
                            className={`bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 ${editingId === post.$id ? "border-2 border-blue-500" : ""}`}>

                            {/* LEFT CONTENT */}
                            {editingId === post.$id ?
                                (<form 
                                className='flex-1 break-words min-w-0 max-w-[75%] sm:max-w-full'>
                                    <h2>{post.title}</h2>

                                </form>)
                                :
                                (<div className="flex-1 break-words min-w-0 max-w-[75%] sm:max-w-full">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {post.content}
                                    </p>
                                </div>)
                            }

                            {/* RIGHT ACTIONS */}
                            <div className="flex justify-end sm:justify-center flex-shrink-0 gap-2">
                                {<Button
                                    onClick={() => deleteposts(post.$id)}
                                    className={`flex items-center gap-1 bg-red-400 hover:bg-red-200 text-white px-3 py-1.5 rounded-md text-sm transition 
                                    ${editingId === post.$id ? "hidden" : ""}`}
                                >
                                    <MdDelete />
                                    Delete
                                </Button>}
                                {<Button
                                    onClick={() => editposts(post.$id)}
                                    className="flex items-center gap-1 bg-red-400 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition"
                                >
                                    <MdDelete />
                                    Edit
                                </Button>}
                            </div>

                        </div>
                    ))}
                </div>
                <div className="logo flex flex-col  items-center w-1/5 p-2 m-2 bg-emerald-300">
                    <Button onClick={fetchposts}
                        className={`mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={loading}

                    >
                        Refresh Posts
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AllPost
