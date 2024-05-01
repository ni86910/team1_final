import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'

// 1. 建立context
const CartContext = createContext(null)

// 2. 建立一個Context Provider元件
// 提供給全站最上層元件(_app.js)使用，集中這個context要用的狀態在裡面管理
export function CartProvider({ children }) {
  // 購物車的商品項目。會在加入時，擴充一個qty屬性代表數量
  const [items, setItems] = useState([])
  const { auth } = useAuth()

  const multiAdd = (items, product_id, input_qty = 1) => {
    return items.map((v, i) => {
      if (v.product_id === product_id) return { ...v, qty: v.qty + input_qty }
      else return v
    })
  }

  // 純函式: 單純改變狀態陣列的函式 ---- START
  // 處理商品數量(qty)遞增的函式
  const increment = (items, product_id) => {
    return items.map((v, i) => {
      // 如果商品物件資料中的id屬性符合傳入的id時，則將qty屬性+1
      if (v.product_id === product_id) return { ...v, qty: v.qty + 1 }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // 處理商品數量(qty)遞減的函式
  const decrement = (items, product_id) => {
    return items.map((v, i) => {
      // 如果商品物件資料中的id屬性符合傳入的id時，則將qty屬性-1
      if (v.product_id === product_id) return { ...v, qty: v.qty - 1 }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  // 處理商品刪除的函式
  const remove = (items, product_id) => {
    return items.filter((v, i) => {
      return v.product_id !== product_id
    })
  }

  // 加入到購物車
  const add = (items, item, input_qty = 1) => {
    // 先判斷是否在購物車已經有這個商品
    const foundIndex = items.findIndex((v, i) => {
      return v.product_id === item.product_id
    })

    // 如果有存在==> 數量+1
    if (foundIndex > -1) {
      // return increment(items, item.product_id)
      return multiAdd(items, item.product_id, input_qty)
    } else {
      // 如果沒有===> 新增到購物車(需要擴充商品數量屬性qty:1)
      const newItem = { ...item, qty: input_qty }
      // 1 2
      return [...items, newItem]
    }
  }
  //純函式: 單純改變狀態陣列的函式 ---- END

  // 以下為處理函式-----
  // 加入到購物車的處理函式
  const cartStorageKey = `Team1_cart_member_${auth.member_id}`

  const addItem = (item, input_qty) => {
    setItems(add(items, item, input_qty))
  }

  // 遞增數量的處理函式
  const incrementItemById = (product_id) => {
    setItems(increment(items, product_id))
  }

  // 遞減數量的處理函式
  const decrementItemById = (product_id) => {
    setItems(decrement(items, product_id))
  }

  // 移除項目的處理函式
  const removeItemById = (product_id) => {
    setItems(remove(items, product_id))
  }

  // 計算總數量
  const calcTotalItems = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].qty
    }
    return total
  }

  // 計算總金額
  const calcTotalPrice = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].qty * items[i].price
    }
    return total
  }

  // 上面也可以用下面的語法來寫
  // 陣列迭代方法 reduce(累加、歸納)，2個值計算出1個值，最終得到1個值
  // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  const totalItems = items.reduce((acc, v) => acc + v.qty, 0)
  const totalPrice = items.reduce((acc, v) => acc + v.qty * v.price, 0)


  // 宣告 myPoints 並給予初始值
  const [myPoints, setMyPoints] = useState(0)

  useEffect(() => {
    // localStorage 有東西，且items沒東西，就設定給items
    const str = localStorage.getItem(cartStorageKey)
    if (str && items.length === 0) {
      try {
        const localState = JSON.parse(str)
        setItems(localState)
      } catch (ex) {
        console.log(ex)
      }
    }
    // 如果items不是空的，則把items設定給localStorage
    if (items.length > 0) {
      localStorage.setItem(cartStorageKey, JSON.stringify(items))
    }
  }, [items])

  return (
    <CartContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{
        items,
        incrementItemById,
        decrementItemById,
        removeItemById,
        addItem,
        totalItems,
        setItems,
        totalPrice,
        calcTotalItems,
        calcTotalPrice,
        myPoints,
        setMyPoints,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 3. 提供一個包裝好的useContext名稱
// 提供給消費者(consumers)方便使用，直接呼叫就能使用
export const useCart = () => useContext(CartContext)
