import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {}
type Imputs = {
    name: string,
    price: number,
    img: string,
    desc: string,
}


const Add = (props: Props) => {
    const [preview, setPreview] = useState<string>();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Imputs>()
    const onSubmit: SubmitHandler<Imputs> = async (values: Imputs) => {
        try {
            await (axios.post(`http://localhost:3001/products`, values))
            router.push("/product");
            alert("Thêm thành công!");
            setPreview("");
            reset();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg'>
            <h1>Add Product</h1>
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
                    {...register("desc", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.desc && <span>Không để trống!</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Add