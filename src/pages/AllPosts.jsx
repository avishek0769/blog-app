import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components';
import appwriteServices from '../appwrite/services';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteServices.getAllPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents);
        })
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
