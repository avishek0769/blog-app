import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteServices from '../appwrite/services';
import { useSelector } from 'react-redux';
import { Button, Container } from '../components';
import parse from "html-react-parser"

function Post() {
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector(state => state.auth.userData)
    const [image, setImage] = useState("")

    useEffect(() => {
        if (slug) {
            appwriteServices.getPost(slug).then(post => {
                if (post) setPost(post);
                else navigate("/");
                appwriteServices.getFilePreview(post.featuredImage).then(image => setImage(image))
            });
        }
        else navigate("/");
    }, [slug, navigate])

    const isAuthor = post && userData ? post.userID == userData.$id : false;

    const deletePost = () => {
        appwriteServices.deletePost(post.$id).then(status => {
            if (status) {
                appwriteServices.deleteFile(post.featuredImage);
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={image}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
