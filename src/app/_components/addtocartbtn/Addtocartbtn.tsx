'use client'
import AddToCart from '@/cartactions/addcart'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/cartContext'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function Addtocartbtn({id}:{id:string}) {
    const context = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);

    async function checkAddproduct(id: string) {
        if (isLoading) return;
        setIsLoading(true);
        
        try {
            const res = await AddToCart(id);

            if (!res.success) {
                toast.error(res.message);
                return;
            }

            toast.success("Added to cart successfully");
            
            if (context) {
                context.setNumberOfCarts(prev => prev + 1);
            }

        } catch (error) {
            console.error(error);
            const err = error as Error;
            toast.error(err.message || "Failed to add to cart");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Button 
                onClick={() => checkAddproduct(id)} 
                disabled={isLoading}
                className='cursor-pointer capitalize bg-main hover:bg-blue-700 w-full my-2'
            >
                {isLoading ? "Adding..." : "Add to cart"}
            </Button>
        </div>
    )
}
