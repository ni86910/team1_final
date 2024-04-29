import { useEffect, useState } from 'react'
import { API_SERVER } from '../common/config'
import { uploadImage } from '@/utils/uploadImage'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import validator from 'validator'
import Swal from 'sweetalert2'
import Image from 'next/image'
import Link from 'next/link'

/* My module.scss */
import style from '@/styles/profile.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import { Button, Nav, Navbar, Form, Container, Row, Col } from 'react-bootstrap'
/* React-icon */
import { MdChangeCircle } from 'react-icons/md'
import { FaStarOfLife } from 'react-icons/fa6'

export default function ProfilePage({ member_id }) {
  const router = useRouter()

  const { auth, logout } = useAuth() // 登出

  const [profile, setProfile] = useState({})
  const [newProfileImage, setNewProfileImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false) // 新增編輯狀態
  const [formChanged, setFormChanged] = useState(false)

  // 會員登入
  useEffect(() => {
    console.log(auth)
    if (auth.member_id) {
      fetch(`${API_SERVER}/profile`, {
        //credentials: 'include',
        headers: new Headers({
          Authorization: `Bearer ${auth.token}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfile(data)
          setNewProfileImage(`${API_SERVER}/avatar/${data.avatar}`)
        })
        .catch((error) => console.error('獲取資料時出錯:', error))
    }
  }, [auth.member_id])

  // 初始值
  const [data, setData] = useState({
    m_name: '',
    mobile: '',
    address: '',
  })
  // 錯誤回應欄位
  const [errors, setErrors] = useState({
    m_name: '',
    mobile: '',
    address: '',
  })

  // 因為上傳照片只是單一事件不需要使用到onSubmit來做到多工處理,只要使用onChang就可以了
  const handleFileUpload = async (event) => {
    // 只有在編輯狀態下才允許上傳圖片
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      setNewProfileImage(reader.result)

      // 調用 uploadImage 函數處理圖像上傳邏輯
      const imageUrl = await uploadImage(file, profile)
      if (imageUrl) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profileImage: imageUrl,
        }))
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  // 驗證表單字段
  const validateFields = () => {
    const newErrors = {}
    if (!validator.isLength(data.m_name, { min: 2 })) {
      newErrors.m_name = '名稱不得小於2字元'
    }

    if (!validator.isMobilePhone(data.mobile, 'zh-TW')) {
      newErrors.mobile = '手機號碼為必填欄位'
    }

    if (!validator.isEmpty(data.address, { ignore_whitespace: true })) {
      newErrors.address = '地址為必填欄位'
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === '')
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出
    if (!validateFields()) {
      return
    }

    const dataModified = { ...profile }
    // 沒有要更動的欄位去掉
    delete dataModified.member_id
    delete dataModified.created_at

    const r = await fetch(`${API_SERVER}/profile/${profile.member_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataModified),
    })

    const result = await r.json()

    console.log(result)
    if (result.success) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '資料新增成功',
        showConfirmButton: false,
        timer: 2000,
      })
      console.log(document.referrer)
      setIsEditing(false)
      router.push('/member/profile')
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '資料沒有修改',
        showConfirmButton: false,
        timer: 2000,
      })
      if (!validateFields)
        toast.error('請填入符合格式的值', {
          duration: 2000,
          style: {
            backgroundColor: 'black',
            color: 'white',
          },
        })
    }
  }

  // 處理輸入框變化
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    if (isEditing) {
      // 只有在編輯狀態下才允許修改
      const { name, value } = event.target
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }))
    }
  }
  // 處理輸入框失去焦點
  const handleBlur = (e) => {
    validateFields()
  }

  useEffect(() => {
    if (!member_id) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${API_SERVER}/profile/${member_id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setData({ ...result.data })
        } else {
          router.push('/member/profile')
        }
      })
  }, [member_id, router])
  // console.log(formData);
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="/member/profile" className={SideBar['text-h4']}>
              個人資料
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Link
                className={SideBar['Nav-link']}
                href="/member/member-center"
              >
                會員中心
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/order">
                我的訂單
              </Link>
              <Link
                className={SideBar['Nav-link']}
                href="/member/course-records"
              >
                課程紀錄
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/points">
                我的點數
              </Link>
              <Link className={SideBar['Nav-link']} href="/member/favorite">
                我的收藏
              </Link>
              <Link
                className={SideBar['Nav-link']}
                href={'#'}
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                  alert('你已成功登出')
                  router.push('/member/login')
                }}
              >
                登出
              </Link>
            </Nav>
          </Container>
        </Navbar>
        {/* Side Bar End */}
        {/* Profile Start */}
        <Container className={style['profile-section']}>
          <style jsx>{`
            .error {
              color: red;
              font-size: 12px;
              text-align: center;
            }
          `}</style>
          <Container>
            <Row>
              <Col className={style['title']}>會員基本資料</Col>
            </Row>
          </Container>
          {/* self-pic Start*/}
          <Row className={style['profile-first-row']}>
            <Form
              className={style['profile-row']}
              encType="application/x-www-form-urlencoded"
            >
              <Col className={style['profile-upload-self-col']}>
                <Col className={style['self-pic']}>
                  <Image
                    src={newProfileImage || '/img/member/default-self.jpg'}
                    width={130}
                    height={130}
                    alt="selfie"
                    className={style['profile-img']}
                  />
                  <button
                    type="button"
                    className={style['upload-text']}
                    onClick={(e) => {
                      document.getElementById('file0').click()
                    }}
                  >
                    <MdChangeCircle /> 更換頭像
                    <input
                      type="file"
                      id="file0"
                      onChange={handleFileUpload}
                      style={{
                        display: 'none',
                      }}
                    />
                  </button>
                </Col>
                <Col className={style['member-describe']}>
                  <div className={style['member-fit']}>菲特友會員</div>
                  <div className={style['member-date']}>永久效期</div>
                </Col>
                <Col className={`col-6 col-md-4 ${style['member-card-box']}`}>
                  <Image
                    src="/img/member/member-card.png"
                    width={200}
                    height={110}
                    alt="member-card"
                    priority={true}
                    className={style['member-card']}
                  />
                </Col>
              </Col>
            </Form>
          </Row>
          {/* self-pic End*/}
          <Form
            className={style['profile-row']}
            encType="application/x-www-form-urlencoded"
            onSubmit={onSubmit}
          >
            <Row className={style['profile-first-row']}>
              {/* Form Start*/}
              <Row className={style['profile']}>
                <Col className={style['profile-col']}>
                  <div
                    className={style['profile-row']}
                    encType="application/x-www-form-urlencoded"
                  >
                    <Form.Group className={`mb-3 ${style['label-name']}`}>
                      <Form.Label className={style['label-text']}>
                        <FaStarOfLife className={style['icon-padding']} />
                        姓名
                      </Form.Label>
                      <Form.Control
                        style={{
                          borderRadius: '10px',
                          backgroundColor: isEditing ? 'white' : '#f0f0f0',
                        }}
                        type="text"
                        name="m_name"
                        id="m_name"
                        value={profile.m_name || ''}
                        onChange={handleChange}
                        readOnly={!isEditing} // 根據編輯狀態設定欄位是否可編輯
                        onBlur={handleBlur}
                      />
                      <div className="error">{errors.m_name}</div>
                    </Form.Group>
                  </div>
                </Col>
                <Col className={style['profile-col']}>
                  <div className={style['profile-row']}>
                    <Form.Group className={`mb-3 ${style['label-name']}`}>
                      <Form.Label className={style['label-text']}>
                        <FaStarOfLife className={style['icon-padding']} />
                        <div>信箱</div>
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: '10px' }}
                        type="email"
                        name="m_account"
                        id="m_account"
                        value={profile.m_account || ''}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row className={style['profile']}>
                <Col className={style['profile-col']}>
                  <div className={style['profile-row']}>
                    <Form.Group className={`mb-3 ${style['label-name']}`}>
                      <Form.Label className={style['label-text']}>
                        <FaStarOfLife className={style['icon-padding']} />
                        生日
                      </Form.Label>
                      <Form.Control
                        style={{ borderRadius: '10px' }}
                        type="date"
                        name="birthday"
                        id="birthday"
                        value={profile.birthday || ''}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </div>
                </Col>
                {/*value={profile.gender || ''} 將性別的值設定為 profile 物件中的 gender 屬性的值，如果沒有值則設為空字串。 */}
                {/*onChange={handleInputChange} 會在使用者選擇性別時觸發 handleInputChange 函式，並更新 profile 物件中的 gender 屬性的值。 */}
                {/*name="gender" 將欄位的名稱設定為 gender，以便在 handleInputChange 函式中辨識。 */}
                <Col className={style['profile-col']}>
                  <div className={style['profile-row']}>
                    <Form.Group className={`mb-3 ${style['label-name']}`}>
                      <Form.Label className={style['label-text']}>
                        <FaStarOfLife className={style['icon-padding']} />
                        性別
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={profile.gender || ''}
                        onChange={(event) => handleChange(event)} // 修改這裡，將事件傳遞給 handleInputChange 函數
                        name="gender"
                        id="gender"
                        disabled
                      >
                        <option value="">選擇性別</option>
                        <option value="男">男生</option>
                        <option value="女">女生</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row className={style['profile']}>
                <Col className={style['profile-col']}>
                  <div className={style['profile-row']}>
                    <Form.Group className={`mb-3 ${style['label-name']}`}>
                      <Form.Label className={style['label-text']}>
                        <FaStarOfLife className={style['icon-padding']} />
                        手機
                      </Form.Label>
                      <Form.Control
                        style={{
                          borderRadius: '10px',
                          backgroundColor: isEditing ? 'white' : '#f0f0f0',
                        }}
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={profile.mobile || ''}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        onBlur={handleBlur}
                      />
                      <div className="error">{errors.mobile}</div>
                    </Form.Group>
                  </div>
                </Col>
                <Col className={style['profile-col']}>
                  <Form.Group className={`mb-3 ${style['label-name']}`}>
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      地址
                    </Form.Label>
                    <Form.Control
                      style={{
                        borderRadius: '10px',
                        backgroundColor: isEditing ? 'white' : '#f0f0f0',
                      }}
                      as="textarea"
                      rows={1}
                      name="address"
                      id="address"
                      value={profile.address || ''}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      onBlur={handleBlur}
                    />
                    <div className="error">{errors.address}</div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className={style['row-btn']}>
                <Col xs="auto">
                  {isEditing ? ( // 根據編輯狀態顯示不同的按鈕
                    <Button type="submit" className={style['edit-btn']}>
                      確認修改
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setIsEditing(true)
                      }}
                      className={style['edit-btn']}
                    >
                      我要編輯
                    </Button>
                  )}
                </Col>
              </Row>
            </Row>
          </Form>
        </Container>
      </section>
      <Toaster />
    </>
  )
}
