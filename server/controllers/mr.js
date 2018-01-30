// import { log } from "util";
const PostgREST = require("postgrest-client")
const Api = new PostgREST("http://haven.natapp1.cc")
const queryString = require("query-string");

async function getOne(ctx, next) {
  const id = ctx.params.id
  // const data = await Api.get(`/fa_medical_record?id=eq.${id}`)
  const data = await Api.get("/fa_medical_record").match({ id });
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

// curl -X POST -d name=val2 http://babycare.yhuan.cc/fa_medical_record
async function post(ctx, next) {
  const params = queryString.stringify(ctx.request.body)
  const data = await Api.post("/fa_medical_record").send(params)
  // const data = await Api.post("/fa_medical_record").type('json').send(ctx.request.body)
  // const data = await Api.post("/fa_medical_record").send("name=uuuuu")
  console.log(data)
  ctx.state.data = {
    data: data
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
