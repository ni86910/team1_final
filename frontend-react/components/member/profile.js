import { useEffect, useState } from 'react'
import Image from 'next/image'
import { uploadImage } from '@/utils/uploadImage'
import { API_SERVER } from '../common/config'
/* My module.scss */
import style from '@/styles/profile.module.scss'
import SideBar from '@/styles/m-sidebar.module.scss'
/* React-Bootstrap */
import { Button, Nav, Navbar, Form, Container, Row, Col } from 'react-bootstrap'
/* React-icon */
import { MdChangeCircle } from 'react-icons/md'
import { FaStarOfLife } from 'react-icons/fa6'

export default function ProfilePage() {
  const [profile, setProfile] = useState({})
  const [newProfileImage, setNewProfileImage] = useState(null)
  const [isEditing, setIsEditing] = useState(false) // 新增編輯狀態

  useEffect(() => {
    fetch(`${API_SERVER}/member/profile`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('獲取資料時出錯:', error))
  }, [])

  const sendData = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_SERVER}/member/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        console.log('資料修改成功')
        setIsEditing(false) // 送出表單後取消編輯狀態
      } else {
        console.error('資料修改失敗')
      }
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
  return (
    <>
      <section className={SideBar['member-center-container']}>
        {/* Side Bar Begin */}
        <Navbar className={SideBar['m-sidebar']}>
          <Container className={SideBar['m-container']}>
            <Navbar.Brand href="#profile" className={SideBar['text-h4']}>
              個人資料
            </Navbar.Brand>
            <Nav className={`me-auto ${SideBar['nav-side']}`}>
              <Nav.Link className={SideBar['Nav-link']} href="#member-center">
                會員中心
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#order">
                我的訂單
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#course-records">
                課程紀錄
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#points">
                我的點數
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#favorite">
                我的收藏
              </Nav.Link>
              <Nav.Link className={SideBar['Nav-link']} href="#logout">
                登出
              </Nav.Link>
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
                >
                  <MdChangeCircle /> 更換頭像
                  <input
                    type="file"
                    id="file0"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
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
                  className={style['member-card']}
                />
              </Col>
            </Col>
            {/* self-pic End*/}

            {/* Form Start*/}
            <Row className={style['profile']}>
              <Col className={style['profile-col']}>
                <Form
                  className={style['profile-row']}
                  onSubmit={sendData}
                  encType="application/x-www-form-urlencoded"
                >
                  <Form.Group className={`mb-3 ${style['label-name']}`}>
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      姓名
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="text"
                      name="m_name"
                      id="m_name"
                      value={profile.m_name || ''}
                      onChange={handleInputChange}
                      readOnly={!isEditing} // 根據編輯狀態設定欄位是否可編輯
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
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
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className={style['profile']}>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
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
                    />
                  </Form.Group>
                </Form>
              </Col>
              {/*value={profile.gender || ''} 將性別的值設定為 profile 物件中的 gender 屬性的值，如果沒有值則設為空字串。 */}
              {/*onChange={handleInputChange} 會在使用者選擇性別時觸發 handleInputChange 函式，並更新 profile 物件中的 gender 屬性的值。 */}
              {/*name="gender" 將欄位的名稱設定為 gender，以便在 handleInputChange 函式中辨識。 */}
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group className={`mb-3 ${style['label-name']}`}>
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      性別
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={profile.gender || ''}
                      onChange={handleInputChange}
                      name="gender"
                      id="gender"
                    >
                      <option>Open this select menu</option>
                      <option value="0">男生</option>
                      <option value="1">女生</option>
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className={style['profile']}>
              <Col className={style['profile-col']}>
                <Form className={style['profile-row']}>
                  <Form.Group className={`mb-3 ${style['label-name']}`}>
                    <Form.Label className={style['label-text']}>
                      <FaStarOfLife className={style['icon-padding']} />
                      手機
                    </Form.Label>
                    <Form.Control
                      style={{ borderRadius: '10px' }}
                      type="text"
                      name="mobile"
                      id="mobile"
                      value={profile.mobile || ''}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col className={style['profile-col']}>
                <Form.Group className={`mb-3 ${style['label-name']}`}>
                  <Form.Label className={style['label-text']}>
                    <FaStarOfLife className={style['icon-padding']} />
                    地址
                  </Form.Label>
                  <Form.Control
                    style={{ borderRadius: '10px' }}
                    as="textarea"
                    rows={2}
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
                  <Button type="submit" className={style['edit-btn']}>
                    儲存
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className={style['edit-btn']}
                  >
                    確認修改
                  </Button>
                )}
              </Col>
            </Row>
          </Row>
        </Container>
      </section>
    </>
  )
}
