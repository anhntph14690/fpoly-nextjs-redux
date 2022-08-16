import { IProducts } from '@/models/product'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

type Props = {}

const List = (props: Props) => {
    const { data } = useSWR<IProducts[]>("/products");
    console.log(data)
    const handleRemove = async (id: any) => {
        const confirm = window.confirm("Ban muon xoa?");
        if (confirm) {
            await (axios.delete(`http://localhost:3001/products/${id}`))
            alert("Xoa thanh cong")
        }
    }
    return (
        <div className='bg'>
            <Link href={`/product/add`}>
                <button id='add'>Add</button>
            </Link>
            <Link href={`/product/signup`}>
                <button id='signup'>Signup</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Img</th>
                        <th scope="col">Desc</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        return <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{item.name}</th>
                            <th>{item.price}</th>
                            <th>{item.img}</th>
                            <th>{item.desc}</th>
                            <th>
                                <Link href={`/product/edit/${item.id}`}>
                                    <button id='edit'>Edit</button>
                                </Link>
                                <button id='remove' onClick={() => (handleRemove(item.id))}>Remove</button>
                            </th>


                        </tr>
                    })}

                </tbody>
            </table>

        </div>
    )
}

export default List