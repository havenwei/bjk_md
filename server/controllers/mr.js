var PostgREST = require("postgrest-client")
var Api = new PostgREST("http://babycare.natapp1.cc");

async function getOne(ctx, next) {
}

async function getAll(ctx, next) {
  var data = await Api.get('/fa_medical_record')
  // ctx.state.data = { "helll": "world"}
  // console.log('sdfasdfasdfasdfasd')
  // console.log(data)
  ctx.state.data = {
    medical_records: data
  }
}

// getAll()
// Api.get("/fa_medical_record").then(data => console.log(data))

async function post(ctx, next) {

}

async function update(ctx, next) {

}

async function destroy(ctx, next) {

}

module.exports = {
  post,
  getOne,
  getAll,
  update,
  destroy
}
