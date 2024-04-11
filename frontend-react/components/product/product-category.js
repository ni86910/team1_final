import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import style from '@/styles/product-list.module.scss'

/* 商品分類 icon */
import { FaDumbbell } from 'react-icons/fa6'
import {
  TbZoomMoney,
  TbShirtSport,
  TbCup,
  TbDeviceWatchBolt,
  TbShoppingBag,
} from 'react-icons/tb'

/* 叉叉 icon */
import { MdClose } from 'react-icons/md'

/* 搜尋價格區間icon */
import { PiArrowLineDownFill, PiArrowLineUpFill } from 'react-icons/pi'

export default function ProductCategory() {
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
                <Link
                  href="/product-list"
                  className={style['all-product-link']}
                >
                  All - 全部商品{' '}
                </Link>
                <span>(105)</span>
              </li>
              <li className={style['main-cate']}>
                <Link href="">
                  <FaDumbbell /> 室內健身
                </Link>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 有氧/重量訓練
                  <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 瑜珈 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 拳擊 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 舞蹈 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 運動恢復放鬆
                  <span>(20)</span>
                </label>
              </li>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbCup /> 營養補給品
                </Link>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 能量補給 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 乳清蛋白 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 能量飲 <span>(20)</span>
                </label>
              </li>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbShirtSport /> 服飾及配件
                </Link>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 運動服飾 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 運動包袋 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 運動水壺 <span>(20)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 配件專區 <span>(20)</span>
                </label>
              </li>
              <li className={style['main-cate']}>
                <Link href="">
                  <TbDeviceWatchBolt /> 智能運動系列
                </Link>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> 智能電子用品 <span>(20)</span>
                </label>
              </li>
            </ul>
          </li>

          <li className={style['accordion-item']}>
            <input id="s4" className={style['hide']} type="checkbox" />
            <label htmlFor="s4" className={style['accordion-label']}>
              <TbZoomMoney /> 價格區間
            </label>
            <ul className={style['accordion-child']}>
              <div className={style['sc-original']}>
                (原始區間：<span>NT$150</span>
                <span> - </span>
                <span>NT$2,290</span>)
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
