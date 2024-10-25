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

    useEffect(() => {
        const initData = async () => {
            await initializeAuth();
            fetchPosts();
        };
        initData();
    }, [fetchPosts, initializeAuth]);

    useEffect(() => {
        console.log('Fetched Posts:', posts);
    }, [posts]);

    const handleDelete = async (id) => {
        setDeleteError(null);
        try {
            await deletePost(id);
        } catch (error) {
            setDeleteError('Failed to delete post. You may not have permission.');
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = posts.filter(post => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
            post.title.toLowerCase().includes(lowerCaseTerm) ||
            post.authorName.toLowerCase().includes(lowerCaseTerm)
        );
    });

    if (authLoading || postsLoading) return <div className="text-white text-center p-8">
        <div className="loader"></div>
        <p>Loading posts...</p>
    </div>;
    if (postsError) return <div className="text-white text-center p-8">
        <div className="loader"></div>
        <p>Error fetching posts: {postsError.toString()}</p>
    </div>

    return (
        <div className="w-full p-4 flex flex-col h-screen">
            
            <div className="text-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="font-bold text-lg whitespace-nowrap">List Blogs</h1>
                <div className="relative w-full sm:max-w-md">
                    <Input
                        type="text"
                        placeholder="Search anything here..."
                        className="w-full py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {deleteError && (
                <div className="text-red-500 mb-4">{deleteError}</div>
            )}

           
            <div className="flex-grow overflow-hidden rounded-lg bg-[#262626]">
                <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-[#262626] z-10">
                            <TableRow>
                                <TableHead className="text-white min-w-[120px]">Author</TableHead>
                                <TableHead className="text-white min-w-[120px]">Category</TableHead>
                                <TableHead className="text-white min-w-[200px]">Title</TableHead>
                                <TableHead className="text-white min-w-[150px]">Date Published</TableHead>
                                <TableHead className="text-white min-w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => (
                                    <TableRow key={post._id}>
                                        <TableCell className="text-white whitespace-nowrap">{post.authorName || 'N/A'}</TableCell>
                                        <TableCell className="text-white whitespace-nowrap">{post.category || 'N/A'}</TableCell>
                                        <TableCell className="text-white">{post.title || 'N/A'}</TableCell>
                                        <TableCell className="text-white whitespace-nowrap">
                                            {post.publishingDate
                                                ? new Date(post.publishingDate).toLocaleDateString()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-white">
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="hover:bg-gray-700 p-2 rounded-full transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-white text-center">
                                        No posts available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}