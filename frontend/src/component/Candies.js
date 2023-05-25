
const Candies = (props) => {
    const typeProducts = props.typeProducts
    return (
        <>
            <div >
                <div className="mb-12 ml-14 grid  md:grid-cols-3 gap-4 ">
                    {
                        typeProducts?.map(typeProduct => {
                            return (
                                <div className="w-74  mr-24 mt-12" key={typeProduct.id}>
                                    <img className="w-18 h-14 invert mb-2" src={typeProduct.image} ></img>
                                    <div className="text-3xl font-semibold my-4 text-slate-100">{typeProduct.title}</div>
                                    <p className="text-slate-100 my-4">{typeProduct.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Candies;