import React from 'react'
// import Link from 'next/link'
import style from '@/styles/product-search.module.scss'
import { IoIosSearch } from 'react-icons/io'

export default function ProductSearch() {
  return (
    <>
      <div className={`mb-5 ms-5 ${style['shop-sidebar-search']}`}>
        <form className={style['search']}>
          <div className={style['search-wrapper']}>
            <input
              type="text"
              name=""
              placeholder="Search for..."
              className={style['search-field']}
            />
            <button type="submit" className={style['search-icon']}>
              <IoIosSearch />
            </button>
          </div>
        </form>
      </div>
      {/* <form action="#">
                    <input
                      className={`col-9`}
                      type="text"
                      placeholder="請輸入商品關鍵字..."
                    />
                    <button
                      type="submit"
                      className={`col-3 ${style['search-icon']}`}
                    >
                      搜尋
                    </button>
                  </form> */}
    </>
  )
}
