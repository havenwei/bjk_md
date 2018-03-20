// rootPathname, useQcloudLogin, cos, serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken
const CONF = {
  port: "5757",
  rootPathname: "",

  serverHost: "",
  tunnelServerUrl: "",
  tunnelSignatureKey: "",

  // 对象存储云API密钥
  qcloudAppId: 1256055848,
  qcloudSecretId: "AKIDjOtDVcrJ5gBkEXMbhghdkhTjz49JuaZU",
  qcloudSecretKey: "3l3EF5mJZTFtSq3JuQmygDanHh1BC2nN",

  // 微信小程序 App ID
  appId: "wx218800b558d61f52",

  // 微信小程序 App Secret
  appSecret: "37530899a42eb9ab0db105eccdfbb2ad",

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  // pass: "S8uBd6bV",

  mysql: {
    host: "localhost",
    port: 3306,
    user: "root",
    db: "cAuth",
    pass: "Z7L-RKg-dSe-7tn",
    char: "utf8mb4"
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: "ap-guangzhou",
    // Bucket 名称
    fileBucket: "bjk",
    // 文件夹
    uploadFolder: ""
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: "abcdefgh"
};

module.exports = CONF
