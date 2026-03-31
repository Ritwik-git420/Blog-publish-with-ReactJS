import React, { useEffect, useState } from 'react'
import { Button } from '../index'
import postService from '../../appwrite/postService'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchposts()
    }, [])
    


    const fetchposts = async () => {
        try {
            setLoading(true)
            const res = await postService.getPosts()
            setPosts(res)
            
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className=''>
            <h1>All Post Page</h1>
            <div className='w-full bg-blue-100 h-125  p-2 flex justify-between'>
                <div className="postcard bg-amber-100 h-125 w-4/5 m-2 p-2 overflow-y-auto scroll-smooth space-y-3">
                    {posts.map((post) => (
                        <div key={post.$id} className="bg-white p-3 m-2 rounded shadow">
                            <h2 className="text-lg font-bold">{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
                <div className="logo flex flex-col  items-center w-1/5 p-2 m-2 bg-emerald-300">
                    <Button onClick={fetchposts}
                    className={`mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disable = {loading }

                    >
                        Refresh Posts
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default AllPost
