import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, Search } from "lucide-react";
import useBlogStore from '@/stores/blogStore';
import useAuthStore from '@/stores/authStore';
import { Input } from '../components/ui/input';

// Skeleton loader for table rows
const TableRowSkeleton = () => (
    <TableRow>
        <TableCell className="text-white">
            <div className="h-4 w-24 bg-[#262626] animate-pulse rounded"></div>
        </TableCell>
        <TableCell className="text-white">
            <div className="h-4 w-20 bg-[#262626] animate-pulse rounded"></div>
        </TableCell>
        <TableCell className="text-white">
            <div className="h-4 w-48 bg-[#262626] animate-pulse rounded"></div>
        </TableCell>
        <TableCell className="text-white">
            <div className="h-4 w-28 bg-[#262626] animate-pulse rounded"></div>
        </TableCell>
        <TableCell className="text-white">
            <div className="h-8 w-8 bg-[#262626] animate-pulse rounded-full"></div>
        </TableCell>
    </TableRow>
);

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

    const isLoading = authLoading || postsLoading;

    return (
        <div className="w-full p-4 flex flex-col h-screen">
            <div className="text-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="font-bold text-lg whitespace-nowrap sm:ml-0 ml-12">List Blogs</h1>
                <div className="relative w-full sm:max-w-md">
                    <Input
                        type="text"
                        placeholder="Search anything here..."
                        className="w-full py-2 px-4 bg-[#262626] text-gray-200 rounded-full border-none focus:outline-none focus:ring-2 hover:border-none"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        disabled={isLoading}
                    />
                    <Search className="absolute right-3 top-2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {deleteError && (
                <div className="text-red-500 mb-4">{deleteError}</div>
            )}

            <div className="flex-grow overflow-hidden rounded-lg bg-[#1a1a1a]">
                <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-200px)]">
                    <Table>
                        <TableHeader className="sticky top-0 bg-[#262626] z-10">
                            <TableRow>
                                <TableHead className="text-[#98989a] min-w-[120px]">Author</TableHead>
                                <TableHead className="text-[#98989a] min-w-[120px]">Category</TableHead>
                                <TableHead className="text-[#98989a] min-w-[200px]">Title</TableHead>
                                <TableHead className="text-[#98989a] min-w-[150px]">Date Published</TableHead>
                                <TableHead className="text-[#98989a] min-w-[80px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-[#1a1a1a] border-t-[#98989a]">
                            {isLoading ? (
                                // Show 5 skeleton rows while loading
                                [...Array(5)].map((_, index) => (
                                    <TableRowSkeleton key={index} />
                                ))
                            ) : postsError ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-white text-center">
                                        Error fetching posts: {postsError.toString()}
                                    </TableCell>
                                </TableRow>
                            ) : Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
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