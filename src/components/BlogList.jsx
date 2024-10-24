import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import useBlogStore from '@/stores/blogStore';
import useAuthStore from '@/stores/authStore';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

export default function BlogList() {
    const { posts, isLoading: postsLoading, error: postsError, fetchPosts, deletePost } = useBlogStore();
    const { user, initializeAuth, isLoading: authLoading } = useAuthStore();
    const [deleteError, setDeleteError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch user and posts on component mount
    useEffect(() => {
        const initData = async () => {
            await initializeAuth(); // Initialize user from cookies
            fetchPosts(); // Fetch posts after user is set
        };
        initData();
    }, [fetchPosts, initializeAuth]);

    useEffect(() => {
        console.log('Fetched Posts:', posts); // Log posts after they are fetched
    }, [posts]);

    const handleDelete = async (id) => {
        setDeleteError(null);
        try {
            await deletePost(id); // This should update the posts state
        } catch (error) {
            setDeleteError('Failed to delete post. You may not have permission.');
        }
    };

    // Handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter posts based on search term
    const filteredPosts = posts.filter(post => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(lowerCaseTerm) ||
            post.authorName.toLowerCase().includes(lowerCaseTerm)
        );
    });

    console.log(user);

    if (authLoading || postsLoading) return <div className="text-white">Loading...</div>;
    if (postsError) return <div className="text-white">Error fetching posts: {postsError.toString()}</div>;

    return (
        <>
            <div className="text-yellow-400 flex items-center justify-between p-4">
                <h1 className="font-bold text-lg">List Blogs</h1>
                <div className="relative w-full max-w-md mx-auto">
                    <Input 
                        type="text" 
                        placeholder="Search anything here..." 
                        className="w-full py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none" 
                        value={searchTerm}
                        onChange={handleSearchChange} // Update search term on change
                    />
                    <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
                </div>
            </div>
            {deleteError && <div className="text-red-500">{deleteError}</div>}
            <Table className="m-10 w-[90%] bg-[#262626] rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white">Author</TableHead>
                        <TableHead className="text-white">Category</TableHead>
                        <TableHead className="text-white">Title</TableHead>
                        <TableHead className="text-white">Date Published</TableHead>
                        <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell className="text-white">{post.authorName || 'N/A'}</TableCell>
                                <TableCell className="text-white">{post.category || 'N/A'}</TableCell>
                                <TableCell className="text-white">{post.title || 'N/A'}</TableCell>
                                <TableCell className="text-white">
                                    {post.publishingDate
                                        ? new Date(post.publishingDate).toLocaleDateString()
                                        : 'N/A'}
                                </TableCell>
                                <TableCell className="text-white">
                                    <button onClick={() => handleDelete(post._id)}>
                                        <Trash2 className="h-4 w-4 text-white" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-white">No posts available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
