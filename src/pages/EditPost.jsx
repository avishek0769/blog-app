import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteServices from '../appwrite/services';
import { Container, PostForm } from '../components/index.js';

function EditPost() {
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug).then(post => setPost(post));
        }
        else navigate("/")
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
