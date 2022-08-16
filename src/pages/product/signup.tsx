import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {}
type Imputs = {
    name: string,
    email: string,
    pass: string,
}


const Signup = (props: Props) => {
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
            await (axios.post(`http://localhost:3001/user`, values))
            router.push("/");
            alert("Đăng ký thành công!");
            setPreview("");
            reset();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg'>
            <h1>Signup</h1>
            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text"
                    {...register("name", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.name && <span>Không để trống!</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email"
                    {...register("email", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.email && <span>Không để trống!</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Pass</label>
                    <input type="password"
                    {...register("pass", {required: "Khong de trong"})}
                    className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {errors.pass && <span>Không để trống!</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup