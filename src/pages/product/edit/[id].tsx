import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {}
type Imputs = {
    name: string,
    price: number,
    img: string,
    desc: string,
}


const Edit = (props: Props) => {
    const [preview, setPreview] = useState<string>();
    const router = useRouter()
    const {id} = router.query
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Imputs>()
    const onSubmit: SubmitHandler<Imputs> = async (values: Imputs) => {
        try {
            await (axios.put(`http://localhost:3001/products/${id}`, values))
            router.push("/product");
            alert("Sửa thành công!");
            setPreview("");
            reset();
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async() => {
            const data = await axios.get(`http://localhost:3001/products/${id}`);
            reset(data.data)
        })()
    }, [preview, id, reset])
    return (
        <div className='bg'>
            <h1>Edit Product</h1>
            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text"
                    {...register("name", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.name && <span>Không để trống!</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                    <input type="number"
                    {...register("price", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.price && <span>Không để trống!</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Img</label>
                    <input type="text"
                    {...register("img", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.img && <span>Không để trống!</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Desc</label>
                    <input type="text"
                    {...register("desc")}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {/* {errors.desc && <span>Không để trống!</span>} */}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Edit