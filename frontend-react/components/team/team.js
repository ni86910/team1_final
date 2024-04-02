import React from 'react'

export default function Team() {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>團隊介紹</h4>
                <div className="breadcrumb__links">
                  <a href="./index.html">首頁</a>
                  <span>團隊介紹</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* About Section Begin */}
      <section className="about spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about__pic">
                <img src="/img/team/about-us.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section End */}
      {/* Team Section Begin */}
      <section className="team spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span style={{ color: '#EB6234' }}>教練團隊</span>
                <h2>Meet Our 教練團隊</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item">
                <img
                  src="/img/team/team-1.jpg"
                  alt=""
                  data-bs-toggle="modal"
                  data-bs-target="#modalJohnSmith"
                />
                <h4>John Smith</h4>
                <span>健身教練</span>
              </div>
            </div>
            {/* Modal for John Smith */}
            <div
              className="modal fade"
              id="modalJohnSmith"
              tabIndex={-1}
              aria-labelledby="modalJohnSmithLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalJohnSmithLabel">
                      John Smith
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Add modal body content here */}
                    <img src="/img/team/team-1.jpg" alt="" />
                    <p>其他相關信息...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Modal for John Smith */}
            {/* Repeat the above pattern for other team members */}
            {/* Add modals for Christine Wise, Sean Robbins, and Lucy Myers */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item">
                <div
                  className="modal-trigger"
                  data-bs-toggle="modal"
                  data-bs-target="#modalChristineWise"
                >
                  <img src="/img/team/team-2.jpg" alt="" />
                </div>
                <h4>Christine Wise</h4>
                <span>營養師</span>
              </div>
            </div>
            {/* Modal for Christine Wise */}
            <div
              className="modal fade"
              id="modalChristineWise"
              tabIndex={-1}
              aria-labelledby="modalChristineWiseLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalChristineWiseLabel">
                      Christine Wise
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Add modal body content here */}
                    <img src="/img/team/team-2.jpg" alt="" />
                    <p>其他相關信息...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Modal for Christine Wise */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item">
                <div
                  className="modal-trigger"
                  data-bs-toggle="modal"
                  data-bs-target="#modalSeanRobbins"
                >
                  <img src="/img/team/team-3.jpg" alt="" />
                </div>
                <h4>Sean Robbins</h4>
                <span>營養師</span>
              </div>
            </div>
            {/* Modal for Sean Robbins */}
            <div
              className="modal fade"
              id="modalSeanRobbins"
              tabIndex={-1}
              aria-labelledby="modalSeanRobbinsLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalSeanRobbinsLabel">
                      Sean Robbins
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Add modal body content here */}
                    <img src="/img/team/team-3.jpg" alt="" />
                    <p>其他相關信息...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Modal for Sean Robbins */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="team__item">
                <div
                  className="modal-trigger"
                  data-bs-toggle="modal"
                  data-bs-target="#modalLucyMyers"
                >
                  <img src="/img/team/team-4.jpg" alt="" />
                </div>
                <h4>Lucy Myers</h4>
                <span>健身教練</span>
              </div>
            </div>
            {/* Modal for Lucy Myers */}
            <div
              className="modal fade"
              id="modalLucyMyers"
              tabIndex={-1}
              aria-labelledby="modalLucyMyersLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalLucyMyersLabel">
                      Lucy Myers
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    {/* Add modal body content here */}
                    <img src="/img/team/team-4.jpg" alt="" />
                    <p>其他相關信息...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Modal for Lucy Myers */}
          </div>
        </div>
      </section>
      {/* Team Section End */}
      {/* Client Section Begin */}
      <section className="clients spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span style={{ color: '#EB6234' }}>合作夥伴</span>
                <h2>Happy Clients</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-1.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-2.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-3.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-4.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-5.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-6.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-7.png" alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-6">
              <a href="#" className="client__item">
                <img src="/img/team/client-8.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Client Section End */}
    </>
  )
}
