import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_SERVER } from '../common/config'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'

/* 商品分類 icon */
import { FaDumbbell } from 'react-icons/fa6'
import { TbZoomMoney, TbShirtSport, TbCup, TbShoppingBag } from 'react-icons/tb'

/* 叉叉 icon */
import { MdClose } from 'react-icons/md'

/* 搜尋價格區間icon */
import { PiArrowLineDownFill, PiArrowLineUpFill } from 'react-icons/pi'

export default function ProductCategory() {
  const [categoryChecked, setCategoryChecked] = useState({})
  const router = useRouter()

  const category = [
    { id: 4, name: '有氧/重量訓練', count: 16 },
    { id: 5, name: '瑜珈', count: 15 },
    { id: 6, name: '拳擊', count: 7 },
    { id: 7, name: '舞蹈', count: 1 },
    { id: 8, name: '運動恢復放鬆', count: 7 },
    { id: 9, name: '能量補給', count: 7 },
    { id: 10, name: '乳清蛋白', count: 8 },
    { id: 11, name: '能量飲', count: 5 },
    { id: 12, name: '運動服飾', count: 17 },
    { id: 13, name: '運動包袋', count: 3 },
    { id: 14, name: '運動水壺', count: 3 },
    { id: 15, name: '配件專區', count: 11 },
    { id: 16, name: '智能電子用品', count: 4 },
  ]

  const handleCategoryChange = (categoryId, event) => {
    event.preventDefault() // 阻止預設的表單提交行為

    const params = new URLSearchParams(router.query)
    const currentCategories = params.getAll('category') // 取得目前的分類參數值，若不存在則為空陣列
    const updatedCategories = [...currentCategories, categoryId] // 將新的分類加入到陣列中
    params.delete('category') // 刪除目前的分類參數
    updatedCategories.forEach((category) => params.append('category', category)) // 將更新後的分類參數重新加入到 URLSearchParams 中

    // 更新 URLSearchParams
    router.push(`?${params.toString()}`)

    // router.push({
    //   query: { ...router.query, category: categoryId },
    // })

    // 更新 categoryChecked 狀態
    // const updatedChecked = {
    //   ...categoryChecked,
    //   [categoryId]: !categoryChecked[categoryId],
    // }
    // setCategoryChecked(updatedChecked)

    // const selectedCategories = Object.keys(updatedChecked).filter(
    //   (key) => updatedChecked[key]
    // )

    // const categoryQuery =
    //   selectedCategories.length > 0
    //     ? `category=${selectedCategories.join(',')}`
    //     : ''

    // const url = `${API_SERVER}/product${
    //   categoryQuery ? `?${categoryQuery}` : ''
    // }`

    // router.push(url, undefined, { shallow: true, append: true })
  }

  // const ResetPriceRange = () => {
  //   const [minValue, setMinValue] = useState('')
  //   const [maxValue, setMaxValue] = useState('')
  // }

  return (
    <>
      {/* 產品分類選單 start */}
      <div className={style['shop-sidebar-accordion']}>
        <ul className={style['accordion']}>
          <li className={style['accordion-item']}>
            <input id="s1" className={style['hide']} type="checkbox" />
            <label htmlFor="s1" className={style['accordion-label']}>
              <TbShoppingBag /> 商品分類
            </label>
            <ul className={style['accordion-child']}>
              <li>
                <Link href="#" className={style['reset-filter-btn']}>
                  <MdClose /> 清除分類條件
                </Link>
                <hr />
                <Link href="/product" className={style['all-product-link']}>
                  All - 全部商品{' '}
                </Link>
                <span>(104)</span>
              </li>
              <li className={style['main-cate']} key={1}>
                <Link href="">
                  <FaDumbbell /> 室內健身
                </Link>
              </li>
              <Link href={`/product/?category=${4}`}>
                <li className={style['cate-name']}>
                  有氧/重量訓練
                  <span>(16)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${5}`}>
                <li className={style['cate-name']}>
                  瑜珈 <span>(15)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${6}`}>
                <li className={style['cate-name']}>
                  拳擊 <span>(7)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${7}`}>
                <li className={style['cate-name']}>
                  舞蹈 <span>(1)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${8}`}>
                <li className={style['cate-name']}>
                  運動恢復放鬆
                  <span>(7)</span>
                </li>
              </Link>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbCup /> 營養補給品
                </Link>
              </li>
              <Link href={`/product/?category=${9}`}>
                <li className={style['cate-name']}>
                  能量補給 <span>(7)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${10}`}>
                <li className={style['cate-name']}>
                  乳清蛋白 <span>(8)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${11}`}>
                <li className={style['cate-name']}>
                  能量飲 <span>(5)</span>
                </li>
              </Link>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbShirtSport /> 服飾及配件
                </Link>
              </li>
              <Link href={`/product/?category=${12}`}>
                <li className={style['cate-name']}>
                  運動服飾 <span>(17)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${13}`}>
                <li className={style['cate-name']}>
                  運動包袋 <span>(3)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${14}`}>
                <li className={style['cate-name']}>
                  運動水壺 <span>(3)</span>
                </li>
              </Link>

              <Link href={`/product/?category=${15}`}>
                <li className={style['cate-name']}>
                  配件專區 <span>(11)</span>
                </li>
              </Link>
              <Link href={`/product/?category=${16}`}>
                <li className={style['cate-name']}>
                  智能電子用品 <span>(4)</span>
                </li>
              </Link>
            </ul>
          </li>

          <li className={style['accordion-item']}>
            <input id="s4" className={style['hide']} type="checkbox" />
            <label htmlFor="s4" className={style['accordion-label']}>
              <TbZoomMoney /> 價格區間
            </label>
            <ul className={style['accordion-child']}>
              <div className={style['sc-original']}>
                (原始區間：<span>NT$30</span>
                <span> - </span>
                <span>NT$2,999</span>)
              </div>
              <div className={style['sc-range']}>
                <div className={style['sc-bdy']}>
                  <p className={style['sc-text']}>
                    最低 <PiArrowLineDownFill />
                  </p>
                  <input
                    type="number"
                    min={0}
                    className={style['sc-input']}
                    defaultValue=""
                  />
                </div>
                <div className={style['sc-range']}> 至 </div>
                <div className={style['sc-bdy']}>
                  <p className={style['sc-text']}>
                    最高 <PiArrowLineUpFill />
                  </p>
                  <input
                    type="number"
                    min={0}
                    className={style['sc-input']}
                    defaultValue=""
                  />
                </div>
              </div>
              <div className={`row ${style['sc-btn-filter']}`}>
                <button
                  type="button"
                  className={`col-4 col ${style['sc-btn-price']}`}
                >
                  篩選
                </button>
                <button
                  type="button"
                  className={`col-4 ${style['sc-btn-reset']}`}
                  onClick={() => {
                    // setMinValue('')
                    // setMaxValue('')
                  }}
                >
                  重置
                </button>
              </div>
            </ul>
          </li>
        </ul>
      </div>
      {/* 產品分類選單 end */}
    </>
  )
}
