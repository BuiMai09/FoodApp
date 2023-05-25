import { useState } from "react"
import Candies from "./Candies"
import candy from "../assest/anise-candy.png"
import biscuits from "../assest/biscuits.png"
import croissant from "../assest/croissant.png"
import lollipop from "../assest/lollipop.png"
import cake from "../assest/piece-of-cake.png"
import toast from "../assest/toast.png"


const TypeProducts = () => {
    const typeProducts = [
        { id: 1, image: candy, title: 'Candies', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' },
        { id: 2, image: cake, title: 'Cake', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' },
        { id: 3, image: biscuits, title: 'Biscuits', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' },
        { id: 4, image: toast, title: 'Bread', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' },
        { id: 5, image: croissant, title: 'Croissant', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' },
        { id: 6, image: lollipop, title: 'Lollipop', content: 'Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.' }

    ]
    return (
        <>
            <div className=' bg-stone-800 mt-14 -ml-4 '>
                <div className=' flex'>

                    <Candies typeProducts={typeProducts} />
                </div>
            </div>
        </>
    )
}
export default TypeProducts;