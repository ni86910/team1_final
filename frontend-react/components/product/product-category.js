import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'

/* 商品分類 icon */
import { FaDumbbell } from 'react-icons/fa6'
import { TbZoomMoney, TbShirtSport, TbCup, TbShoppingBag } from 'react-icons/tb'

/* 搜尋價格區間icon */
import { PiArrowLineDownFill, PiArrowLineUpFill } from 'react-icons/pi'

export default function ProductCategory({category, page}) {
  const router = useRouter()
  const { pathname, query } = router
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handlePriceFilter = () => {
    // 將最低價格和最高價格傳遞到後端進行篩選
    const queryParams = {}
    if (minPrice) {
      queryParams.minPrice = minPrice
    }
    if (maxPrice) {
      queryParams.maxPrice = maxPrice
    }
    router.push({
      pathname: '/product',
      query: { ...router.query, ...queryParams },
    })
  }

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
                <hr />
                <Link
                  href="/product"
                  className={style['all-product-link']}
                  style={{
                    color: `${pathname === '/product' ? '#EB6234' : '#111111'}`,
                  }}
                >
                  All - 全部商品{' '}
                </Link>
                <span>(104)</span>
              </li>
              <li className={style['main-cate']} key={1}>
                <Link href="">
                  <FaDumbbell /> 室內健身
                </Link>
              </li>
              {/* <Link href={`/product/?category=${4}`}> */}
              <Link
                href={{
                  pathname: '/product',
                  query: { ...router.query, category: '4' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '4' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '4' ? '800' : ''}`,
                  }}
                >
                  有氧/重量訓練
                  <span>(16)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { ...router.query, category: '5' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '5' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '5' ? '800' : ''}`,
                  }}
                >
                  瑜珈 <span>(15)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '6' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '6' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '6' ? '800' : ''}`,
                  }}
                >
                  拳擊 <span>(7)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { ...router.query, category: '7' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '7' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '7' ? '800' : ''}`,
                  }}
                >
                  舞蹈 <span>(1)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '8' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '8' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '8' ? '800' : ''}`,
                  }}
                >
                  運動恢復放鬆
                  <span>(7)</span>
                </li>
              </Link>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbCup /> 營養補給品
                </Link>
              </li>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '9' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '9' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '9' ? '800' : ''}`,
                  }}
                >
                  乳清蛋白 <span>(8)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '10' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '10' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '10' ? '800' : ''}`,
                  }}
                >
                  能量補給 <span>(7)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '11' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '11' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '11' ? '800' : ''}`,
                  }}
                >
                  能量飲 <span>(5)</span>
                </li>
              </Link>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbShirtSport /> 服飾及配件
                </Link>
              </li>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '12' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '12' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '12' ? '800' : ''}`,
                  }}
                >
                  運動服飾 <span>(17)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '13' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '13' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '13' ? '800' : ''}`,
                  }}
                >
                  運動包袋 <span>(3)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '14' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '14' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '14' ? '800' : ''}`,
                  }}
                >
                  運動水壺 <span>(3)</span>
                </li>
              </Link>

              <Link
                href={{
                  pathname: '/product',
                  query: { category: '15' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '15' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '15' ? '800' : ''}`,
                  }}
                >
                  配件專區 <span>(11)</span>
                </li>
              </Link>
              <Link
                href={{
                  pathname: '/product',
                  query: { category: '16' },
                }}
              >
                <li
                  className={style['cate-name']}
                  style={{
                    color: `${query.category === '16' ? '#EB6234' : ''}`,
                    fontWeight: `${query.category === '16' ? '800' : ''}`,
                  }}
                >
                  智能電子用品 <span>(4)</span>
                </li>
              </Link>
            </ul>
          </li>
          {/* 搜尋價格區間 start */}
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
                    max={2999}
                    className={style['sc-input']}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
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
                    max={2999}
                    className={style['sc-input']}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className={`row ${style['sc-btn-filter']}`}>
                <button
                  type="button"
                  className={`col-4 col ${style['sc-btn-price']}`}
                  onClick={handlePriceFilter}
                >
                  篩選
                </button>
                <button
                  type="button"
                  className={`col-4 ${style['sc-btn-reset']}`}
                  onClick={() => {
                    setMinPrice('')
                    setMaxPrice('')
                  }}
                >
                  重置
                </button>
              </div>
            </ul>
          </li>
          {/* 搜尋價格區間 end */}
        </ul>
      </div>
      {/* 產品分類選單 end */}
    </>
  )
}
