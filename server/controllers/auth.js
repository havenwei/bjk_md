var graphql = require('graphql.js')
var graph = graphql("http://wx.baojiankang.cc/graphql")

// var graphql = require("graphql.js");
// var graph = graphql("http://babycare.yhuan.cc/graphql");


var unionIdForUserId = `query unionIdForUserId($id: String!){
                            unionIdForUserId(id: $id)
                        }`;

var createUserFromWxUserInfo = `mutation createUserFromWxApp($wx_userinfo: WxInfoInputType!){
                  createUserFromWxApp(wx_userinfo: $wx_userinfo) {
                    id
                  }
                }`;

async function createUserFromWxApp(ctx, next) {
    console.log("createUserFromWxApp")
    try {
        console.log(ctx.request.body)
        const data = await graph(createUserFromWxUserInfo, { wx_userinfo: ctx.request.body });
        console.log(data);
        ctx.state.data = { data: data };
    } catch (error) {
        console.log(error);
    }
}

async function exchangeUnionIdForUserId(ctx, next) {
    try {
        // console.log(ctx)
        console.log(ctx.params.unionId)
        // console.log(ctx.query)
        var unionId = ctx.params.unionId;
        const data = await graph(unionIdForUserId, { id: unionId });
        console.log(data);
        ctx.state.data = { userId: data.unionIdForUserId };
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    exchangeUnionIdForUserId,
    createUserFromWxApp
};
