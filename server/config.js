// rootPathname, useQcloudLogin, cos, serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken
const CONF = {
  port: "5757",
  rootPathname: "",

  serverHost: "",
  tunnelServerUrl: "",
  tunnelSignatureKey: "",

  // 对象存储云API密钥
  qcloudAppId: 1255892295,
  qcloudSecretId: "AKIDueASVK9IRL2VkkS2LPFrEMFuMZYRRUdW",
  qcloudSecretKey: "oOjsmSs2yfEZibEbiaCYeU3MPDl23g4C",

  // 微信小程序 App ID
  appId: "wx3d77b65e4978ca04",

  // 微信小程序 App Secret
  appSecret: "955f42453ad5b1c7f4ace0b4cc10b08c",

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: "localhost",
    port: 3306,
    user: "root",
    db: "cAuth",
    pass: "1qaz2wsx./",
    char: "utf8mb4"
  },

  cos: {
    /**
     * 地区简称
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: "ap-guangzhou",
    // Bucket 名称
    fileBucket: "qcloudtest",
    // 文件夹
    uploadFolder: ""
  },

  // 微信登录态有效期
  wxLoginExpires: 7200,
  wxMessageToken: "abcdefgh"
};

module.exports = CONF
