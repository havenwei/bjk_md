var PostgREST = require("postgrest-client")
var Api = new PostgREST("http://192.168.31.196:3000");

// async function getOne(ctx, next) {
//   next
// }


async function getAll(ctx, next) {
  var data = await Api.get('/fa_medical_record')
  ctx.body = data
  // console.log(data)
}

// getAll()
// Api.get("/fa_medical_record").then(data => console.log(data))

// async function post(ctx, next) {
//   next
// }

// async function update(ctx, next) {
//   next
// }

// async function destroy(ctx, next) {
//   next
// }

// module.exports = {
//   post,
//   getOne,
//   getAll,
//   update,
//   destroy
// }
