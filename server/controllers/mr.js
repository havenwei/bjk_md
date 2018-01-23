// import { log } from "util";

var PostgREST = require("postgrest-client")
var Api = new PostgREST("http://babycare.yhuan.cc")

async function getOne(ctx, next) {
  const id = ctx.params.id
  const data = await Api.get(`/fa_medical_record?id=eq.${id}`)
  ctx.state.data = {
    medical_record: data
  }
}

async function getAll(ctx, next) {
  const data = await Api.get('/fa_medical_record')
  // ctx.state.data = { "helll": "world"}
  console.log(data)
  ctx.state.data = {
    medical_records: data
  }
}

async function post(ctx, next) {
  const data = await Api.post(`/fa_medical_record`)
  // ctx.state.data = { "helll": "world"}
  // console.log('sdfasdfasdfasdfasd')
  console.log(data)
  ctx.state.data = {
    status: 'OK'
  }
}

// curl -X PATCH -d name=val2 http://babycare.yhuan.cc/fa_medical_record?id=eq.1

async function update(ctx, next) {
  const data = await Api.patch(`/fa_medical_record?id=eq.${id}`)
  console.log(data);
  ctx.state.data = {
    status: "OK"
  };
}

async function destroy(ctx, next) {
  // const data = await Api.delete('/fa_medical_record')
  // ctx.state.data = { medical_records: data };
}

module.exports = {
  post,
  getOne,
  getAll,
  update,
  destroy
}
