import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import appwriteServices from '../appwrite/services';
import { Input, Select, Button, RTE } from "../components/index.js"

export default function PostForm({ post }) {
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "",
        }
    })

    const submit = async (data) => {        
        if (post) {
            const file = data.image[0] ? await appwriteServices.uploadFile(data.image[0]) : null;
            if (file) await appwriteServices.deleteFile(post.featuredImage);

            const dbPost = await appwriteServices.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) navigate(`/post/${dbPost.$id}`)
        }
        else {
            const file = await appwriteServices.uploadFile(data.image[0]);
            data.featuredImage = file.$id;

            const doc = await appwriteServices.createPost({
                ...data,
                userID: userData.$id
            })
            if (doc) navigate(`/post/${doc.$id}`);
        }
    }

    const slugFormation = useCallback(value => {
        if (value && typeof value == "string") return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")

        return ""
    }, [])

    useEffect(() => {
        if(post){
            appwriteServices.getFilePreview(post.featuredImage).then(url => setImage(url));
        }
        else setImage("data:image/jpeg;base64,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")

        const subscription = watch((value, { name }) => {
            if (name == "title") {
                setValue("slug", slugFormation(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe();

    }, [watch, slugFormation, setValue])

    const handleFile = (file) => {
        console.log("Hello");
        if(file){
            setImage(URL.createObjectURL(file));
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input label="Title : " placeholder="Enter a title" className="mb-4" {...register("title", { required: true })} />
                <Input label="Slug : " placeholder="Enter a slug" className="mb-4" {...register("slug", { required: true })} onInput={(e) => {
                    setValue("slug", e.currentTarget.value, { shouldValidate: true })
                }} />
                <RTE name="content" label="Content" control={control} defaultValue={getValues("content")} />

                <div className="w-2/3 mb-6 px-2">
                    <div className="w-full mb-4">
                        <img width="100%" src={image} className="rounded-lg" />
                    </div>
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        handleFile={handleFile}
                        {...register("image", { required: !post })}
                    />
                    <Select 
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}                        
                    </Button>
                </div>
            </div>
        </form>
    )
}

