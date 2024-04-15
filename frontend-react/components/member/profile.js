import { useEffect, useState } from 'react'
import { API_SERVER } from '../common/config'
import { uploadImage } from '@/utils/uploadImage'
import { useAuth } from '@/context/auth-context' // 登出
import { useRouter } from 'next/router'
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

const redBorder = {
  border: '1px solid red',
}
const redText = {
  color: 'red',
}

export default function ProfilePage({ member_id }) {
  const router = useRouter()

  const { auth, logout } = useAuth() // 登出

  const [profile, setProfile] = useState({})
  const [newProfileImage, setNewProfileImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false) // 新增編輯狀態

  // 會員登入後,取得資訊
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
        })
        .catch((error) => console.error('獲取資料時出錯:', error))
    }
  }, [auth.member_id])

  const sendData = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`${API_SERVER}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profile),
      })
    } catch (error) {
      console.error('發生錯誤:', error)
    }
  }

  const handleInputChange = (event) => {
    if (isEditing) {
      // 只有在編輯狀態下才允許修改
      const { name, value } = event.target
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }))
    }
  }

  const handleFileUpload = async (event) => {
    if (isEditing) {
      // 只有在編輯狀態下才允許上傳圖片
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onloadend = async () => {
        setNewProfileImage(reader.result)

        // 調用 uploadImage 函數處理圖像上傳邏輯
        const imageUrl = await uploadImage(file)
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
  }

  // 編輯資料
  const [formData, setFormData] = useState({
    member_id: 0, // 資料的 primary key
    m_name: '',
    m_account: '',
    mobile: '',
    birthday: '',
    address: '',
  })
  // 欄位預設的錯誤訊息
  const [errorMsg, setErrorMsg] = useState({
    m_name: '',
    m_account: '',
    mobile: '',
  })

  const validateName = (m_name) => {
    return m_name.toString().length >= 2
  }
  const validateEmail = (m_account) => {
    return m_account.toString().indexOf('@') >= 0 // 粗略的判斷方式
  }
  const validateMobile = (mobile) => {
    return /^09\d{2}-?\d{3}-?\d{3}$/.test(mobile)
  }

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.m_name]: e.target.value }
    setFormData(newFormData)
  }
  const validateFields = () => {
    let tmpIsPass = true
    let tmpErrorMsg = { ...errorMsg }
    // 欄位資料驗證
    if (!validateName(formData.m_name)) {
      tmpErrorMsg = { ...tmpErrorMsg, m_name: '請輸入正確的姓名' }
      tmpIsPass = false
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, m_name: '' }
    }

    if (!validateEmail(formData.m_account)) {
      tmpErrorMsg = { ...tmpErrorMsg, m_account: '請輸入正確的 Email' }
      tmpIsPass = false
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, m_account: '' }
    }

    if (!validateMobile(formData.mobile)) {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: '請輸入正確的手機號碼' }
      tmpIsPass = false
    } else {
      tmpErrorMsg = { ...tmpErrorMsg, mobile: '' }
    }
    setErrorMsg(tmpErrorMsg)
    return tmpIsPass
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出
    if (!validateFields()) {
      alert('必填欄位請填入符合格式的值')
      return // 沒通過檢查的話, 就返回
    }

    const dataModified = { ...formData }
    // 沒有要更動的欄位去掉
    delete dataModified.member_id
    delete dataModified.created_at

    const r = await fetch(`${API_SERVER}/profile/${member_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataModified),
    })

    const result = await r.json()

    console.log(result)
    if (result.success) {
      alert('資料修改成功')
      console.log(document.referrer)
      router.back()
    } else {
      alert('資料沒有修改')
    }
  }

  useEffect(() => {
    if (!member_id) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${API_SERVER}/profile/${member_id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.success) {
          setFormData({ ...result.data })
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
          <Container>
            <Row>
              <Col className={style['title']}>會員基本資料</Col>
            </Row>
          </Container>
          {/* self-pic Start*/}
          <Form
            className={style['profile-row']}
            encType="application/x-www-form-urlencoded"
          >
            <Row className={style['profile-first-row']}>
              <Col className={style['profile-first-col']}>
                <Col className={style['self-pic']}>
                  <Image
                    src={newProfileImage || '/img/member/default-self.jpg'}
                    width={150}
                    height={100}
                    alt="selfie"
                    className={style['profile-img']}
                  />
                  <button
                    className={style['upload-text']}
                    onClick={() => document.getElementById('file0').click()}
                    disabled={!isEditing} // 根據編輯狀態設定按鈕是否可用
                    style={{
                      color: isEditing ? '#EB6234' : 'gray',
                      backgroundColor: isEditing ? 'white' : '#f0f0f0',
                    }}
                  >
                    <MdChangeCircle /> 更換頭像
                    <input
                      type="file"
                      id="file0"
                      onChange={handleFileUpload}
                      style={{
                        display: 'none',
                        backgroundColor: isEditing ? 'white' : '#f0f0f0',
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
              {/* self-pic End*/}

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
                        onChange={handleInputChange}
                        readOnly={!isEditing} // 根據編輯狀態設定欄位是否可編輯
                      />
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={(event) => handleInputChange(event)} // 修改這裡，將事件傳遞給 handleInputChange 函數
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
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
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
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className={style['row-btn']}>
                <Col xs="auto">
                  {isEditing ? ( // 根據編輯狀態顯示不同的按鈕
                    <Button
                      type="submit"
                      className={style['edit-btn']}
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
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
    </>
  )
}
