import { useState } from 'react'
import style from '@/styles/nick-select.module.scss'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6'

export default function NickSelect({
  fetchDataFunction = () => {},
  optionsArray = [],
  onChangeFunction = () => {},
}) {
  // 控制開關
  const [open, setOpen] = useState(false)
  // 控制選中的值
  const [value, setValue] = useState('請選擇')
  return (
    <>
      <div className={style['nick-select-container']}>
        <div
          className={style['nick-select']}
          role="presentation"
          onClick={() => {
            setOpen(!open)
          }}
        >
          <span>{value}</span>
          <div className={style[`${open ? 'icon-up' : 'icon-down'}`]}>
            <FaCaretDown />
          </div>
        </div>
        <ul
          className={
            style[`${open ? 'nick-option-list' : 'nick-option-list-hide'}`]
          }
        >
          <li
            className={style['nick-option']}
            onClick={() => {
              setValue('大大健身房')
              setOpen(!open)
            }}
            role="presentation"
          >
            大大健身房
          </li>
          <li
            className={style['nick-option']}
            onClick={() => {
              setValue('中中健身房')
              setOpen(!open)
            }}
            role="presentation"
          >
            中中健身房
          </li>
          <li className={style['nick-option']}>小小健身房</li>
          <li className={style['nick-option']}>小小健身房</li>
        </ul>
      </div>
    </>
  )
}
