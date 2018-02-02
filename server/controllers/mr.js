// const queryString = require("query-string");
// const graphql = require("graphql")
// const postgraphql = require('postgraphql').postgraphql
var graphql = require('graphql.js')
var graph = graphql("http://wx.baojiankang.cc/graphql")

var allMedicalRecordsByUserId = `query allMedicalRecordsByUserId {
                                    allMedicalRecordsByUserId(user_id: 1){
                                            id
                                            name
                                            gender
                                            chiefComplaint
                                            identityCard
                                            preliminaryDiagnosis
                                            onsetDate
                                            updatedAt
                                            createdAt
                                    }
                                  }`;

var medicalRecordsById = `query medicalRecordsById($id: Int!) {
                              medicalRecordsById(id: $id) {
                                id
                                name
                                gender
                                height
                                weight
                                identityCard
                                chiefComplaint
                                vaccinationHistory
                                familyHistory
                                personalHistory
                                allergicHistory
                                pastMedicalHistory
                                historyOfPresentIllness
                                physicalExamination
                                laboratoryAndSupplementaryExaminations
                                imagingExamination
                                bmi
                                temperature
                                pulse
                                respiratoryRate
                                oxygenSaturation
                                painScore
                                diastolicPressure
                                systolicPressure
                                preliminaryDiagnosis
                                treatmentRecommendation
                                remarks
                                createdAt
                                updatedAt
                              }
                          }`;


var createMR = `mutation createMR($medical_record: MedicalRecordInputType!){
                  createMedicalRecord(medical_record: $medical_record) {
                    id
                    name
                  }
                }`;


async function getOne(ctx, next) {
  const id = parseInt(ctx.params.id);
  const data = await graph(medicalRecordsById, { id: id });
  ctx.state.data = { medical_record: data.medicalRecordsById };
}

async function getAll(ctx, next) {
  const data = await graph(allMedicalRecordsByUserId)();
  console.log(data);
  ctx.state.data = { medical_records: data.allMedicalRecordsByUserId };

}

async function post(ctx, next) {
  // const params = queryString.stringify(ctx.request.body);
  const data = await graph(createMR, {
    medical_record: Object.assign({}, ctx.request.body, { user_id: 1 })
  });
  console.log(data);
  ctx.state.data = { data: data };
}

// curl -X PATCH -d name=val2 http://babycare.yhuan.cc/fa_medical_record?id=eq.1
async function update(ctx, next) {
  // const data = await Api.patch(`/fa_medical_record?id=eq.${id}`);
  console.log(data);
  ctx.state.data = { status: "OK" };
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
};
