import React, { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/services.js'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    const [image, setImage] = useState("")
    useEffect(()=>{
        appwriteServices.getFilePreview(featuredImage).then(image => setImage(image))
    }, [])

    return (
        <Link to={`/post/${$id}`} >
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={image} alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
