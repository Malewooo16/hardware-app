"use client"

import React, {useEffect, useState} from 'react'
import Link from "next/link";
import toSentenceCase from '@/app/utilities/toUpperCase';
import StarsRatings from '@/app/main-components/Rating';
import Image from 'next/image'
interface Product {
    id: number;
    title: string;
    price: string;
    images: any;
    thumbnail: string;
    rating:number;
  }

export default function Page({ params }: { params: { category: string } }) {
    const [productsArr, setProductsArr] = useState <any> ([]);
    const categoryTitle = toSentenceCase(params.category);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${params.category}`)
      .then((response) => response.json())
      .then((productData) => setProductsArr(productData.products));
      
  }, [params.category]);
  return (
    <div style={{ display: "inline", width: "95%" }}>
    <h1 style={{ textAlign: "center" }}> {categoryTitle} </h1>
    {productsArr.length > 0 ? (
      <div className="row categories">
        {productsArr.map((product: Product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="col-lg-3 col-md-4 col-sm-6 mb-4 mx-3 card">
            <div
              key={product.id}
              
            >
              <div className="products-imgs">
                {" "}
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={200}
                  height={250}
                />{" "}
              </div>

              <ul>
                <li>{product.title}</li>
                <li>$ {product.price}</li>
                <StarsRatings value={product.rating} />
              </ul>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p>Loading Products ...</p>
    )}
    {/* <ReactPaginate
      pageCount={Math.ceil(count / 20)}
      previousLabel={<ArrowBackIos />}
      nextLabel={<ArrowForwardIos />}
      onPageChange={handlePageChange}
      containerClassName="pagination-btns"
      disabledClassName="disabled-pagination-btn"
      activeClassName="active-pagination-btn"
    /> */}
  </div>
  )
}
