'use client' 

import addWishList from '@/api/wighlist/addwishlist';
import removeWishList from '@/api/wighlist/removeWishList';
import React, { useState } from 'react' 
import { FaHeart, FaRegHeart } from 'react-icons/fa' 
import { toast } from 'sonner';

export default function Mywishlist({ id, initialLike }: { id: string, initialLike: boolean } ) { 
    const [isLiked, setIsLiked] = useState(initialLike);
    const [isLoading, setIsLoading] = useState(false);

    async function toggleWishlist(id: string) {
        if (isLoading) return;
        
        // Optimistic Update: Change UI immediately
        const previousState = isLiked;
        setIsLiked(!previousState);
        setIsLoading(true);

        try {
            if (!previousState) {
                const resp = await addWishList(id);
                if (resp.status === 'success') {
                    toast.success(resp.message);
                } else {
                    // Rollback if failed
                    setIsLiked(previousState);
                    toast.error(resp.message || "Failed to add to wishlist");
                }
            } else {
                const resp = await removeWishList(id);
                if (resp.status === 'success') {
                    toast.success('Removed successfully');
                } else {
                    // Rollback if failed
                    setIsLiked(previousState);
                    toast.error(resp.statusMsg || "Failed to remove from wishlist");
                }
            }
        } catch (error: unknown) {
            // Rollback on network/server error
            setIsLiked(previousState);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Operation failed");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div onClick={() => toggleWishlist(id)} className="cursor-pointer">
            {isLiked ? (
                <FaHeart className='text-red-500 transition-colors duration-200' /> 
            ) : (
                <FaRegHeart className="text-gray-400 transition-colors duration-200 hover:text-red-400" />
            )}
        </div>
    );
}
