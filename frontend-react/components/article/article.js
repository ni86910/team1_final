import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import TOP from '@/components/TOPbutton/top'
import Swiper from '@/components/article/swiper/swiper'
import Image from 'next/image'
import Link from 'next/link'
import { ARTICLE_ITEM } from '@/configs/index'
import { RiArticleFill } from 'react-icons/ri'

export default function Article() {
  const [artData, setArtData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('全部文章') // 默认选中全部文章
  const [selectedTitle, setSelectedTitle] = useState('') // 默认选中文章标题为空
  const [categoryCounts, setCategoryCounts] = useState({}) // 保存每个类别的文章数量
  const [articleTitles, setArticleTitles] = useState([]) // 保存文章标题列表
  const router = useRouter()

  useEffect(() => {
    fetch(ARTICLE_ITEM, { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
        setArtData(data)

        // 统计每个类别的文章数量
        const counts = {}
        data.forEach((item) => {
          counts[item.article_item] = counts[item.article_item]
            ? counts[item.article_item] + 1
            : 1
        })
        setCategoryCounts(counts)

        // 获取文章标题列表
        const titles = []
        data.forEach((item) => {
          if (!titles.includes(item.title)) {
            titles.push(item.title)
          }
        })
        setArticleTitles(titles)
      })
    if (router.query.article) {
      setSelectedCategory(router.query.article)
    }
    if (router.query.title) {
      setSelectedTitle(router.query.title)
    }
  }, [router.isReady])

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value
    setSelectedCategory(selectedValue) // 更新选择的文章分类

    // 获取该分类下的文章标题列表
    const titles = artData
      .filter((item) => item.article_item === selectedValue)
      .map((item) => item.title)

    // 更新 URL 参数
    router.push(
      {
        pathname: '/article',
        query: { article: selectedValue, title: '' },
      },
      undefined,
      { scroll: false }
    )

    setArticleTitles(titles)
  }

  const handleTitleChange = (e) => {
    const selectedValue = e.target.value
    setSelectedTitle(selectedValue) // 更新选择的文章标题

    // 更新 URL 参数
    router.push(
      {
        pathname: '/article',
        query: { article: selectedCategory, title: selectedValue },
      },
      undefined,
      { scroll: false }
    )
  }

  const filteredArtData = artData.filter((item) => {
    return (
      (selectedCategory === '全部文章' ||
        item.article_item === selectedCategory) &&
      (selectedTitle === '' || item.title === selectedTitle)
    ) // 根据选择的文章分类和标题进行过滤
  })

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 text-center" style={{ marginTop: 20 }}>
            <Swiper />
          </div>
          <div className="section-title">
            <h3 className="mt-4 text-center">
              <RiArticleFill />
              文章內容
            </h3>
            <span className="mt-4" style={{ color: '#EB6234' }}>
              我們提供最新、最實用的健身相關知識。
            </span>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <select
            name="select"
            id="select"
            className="form-select form-select-lg mb-3"
            style={{ width: 200, marginRight: 15 }}
            data-type="select"
            data-width="medium"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="全部文章">全部文章</option>
            <option value="運動健身">
              運動健身 ({categoryCounts['運動健身'] || 0})
            </option>
            <option value="健康飲食">
              健康飲食 ({categoryCounts['健康飲食'] || 0})
            </option>
          </select>
          <select
            name="title"
            id="title"
            className="form-select form-select-lg mb-3"
            style={{ width: 420 }}
            value={selectedTitle}
            onChange={handleTitleChange}
          >
            <option value="">全部標題</option>
            {articleTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <div className="row" style={{ marginBottom: 20 }}>
          {filteredArtData.map((v, i) => {
            return (
              <div key={i} className="col-4" style={{ marginTop: 20 }}>
                <div className="card" style={{ height: 400 }}>
                  <div className="card-body">
                    <p className="card-text">{v.article_item}</p>
                    <Image
                      src={`/img/article/${v.article_image}`}
                      alt=""
                      style={{ marginBottom: 10 }}
                      width={300}
                      height={200}
                    />
                    <Link href={`/article/${v.article_id}`}>
                      <h5 className="card-title" style={{ color: 'black' }}>
                        {v.title}
                      </h5>
                    </Link>
                    <p className="card-text">發表日期: {v.post_date}</p>
                    <p className="card-text">作者: {v.teacher_name}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <TOP />
    </>
  )
}
