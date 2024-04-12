export const API_SERVER = 'http://localhost:3001'

export const LOGIN_POST = `${API_SERVER}/login` // POST

export const AB_LIST = `${API_SERVER}/member/api`
export const AB_ADD_POST = `${API_SERVER}/member/add` // POST

// AB_ITEM_DELETE: `${AB_ITEM_DELETE}/17`
export const AB_ITEM_DELETE = `${API_SERVER}/member` // DELETE

// 取得通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM}/${sid}`
export const AB_ITEM = `${API_SERVER}/member` // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${AB_ITEM_UPDATE_PUT}/${sid}`
export const AB_ITEM_UPDATE_PUT = `${API_SERVER}/member/edit` // PUT

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt` // 登入, POST

// 加入或移除 喜愛清單 "/like-toggle-jwt/:pid"
export const JWT_TOGGLE_LIKE = `${API_SERVER}/like-toggle-jwt` // GET
