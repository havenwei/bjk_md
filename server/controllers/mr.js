var graphql = require('graphql.js')
var graph = graphql("http://wx.baojiankang.cc/graphql")

// var graphql = require("graphql.js");
// var graph = graphql("http://babycare.yhuan.cc/graphql");

var allMedicalRecordsByUserId = `query allMedicalRecordsByUserId($id: Int!) {
                                    allMedicalRecordsByUserId(user_id: $id){
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

var medicalRecordById = `query medicalRecordById($id: Int!) {
                              medicalRecordById(id: $id) {
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
                                medical_record_images_categoryA {
                                  data
                                  category
                                }
                                medical_record_images_categoryB {
                                  data
                                  category
                                }
                                medical_record_images_categoryC {
                                  data
                                  category
                                }
                              }
                          }`;

var createMR = `mutation createMedicalRecord($medical_record: MedicalRecordInputType!){
                  createMedicalRecord(medical_record: $medical_record) {
                    id
                    name
                  }
                }`;

var updateMR = `mutation updateMedicalRecord($medical_record: MedicalRecordInputType!){
                  updateMedicalRecord(medical_record: $medical_record) {
                    id
                  }
                }`;

var unionIdForUserId = `query unionIdForUserId($id: String!){
                            unionIdForUserId(id: $id)
                        }`;

async function getOne(ctx, next) {
  const id = parseInt(ctx.params.id);
  const data = await graph(medicalRecordById, { id: id });
  ctx.state.data = { medical_record: data.medicalRecordById };
}

async function getAll(ctx, next) {
  try {
      console.log("this is server .....");
      // console.log(ctx.params)
      // console.log(ctx.query)
      const user_id = parseInt(ctx.query.user_id);
      console.log(user_id);
      const data = await graph(allMedicalRecordsByUserId, { id: user_id });
      console.log(data);
      ctx.state.data = { medical_records: data.allMedicalRecordsByUserId };
  }catch (error){
    console.log(error)
  }
}

async function post(ctx, next) {
  try {
      // const params = queryString.stringify(ctx.request.body);
      const data = await graph(createMR, {
        medical_record: ctx.request.body
      });
      console.log(data);
      ctx.state.data = { data: data };
  } catch (error) {
    console.log(error);
  }
}

// curl -X PATCH -d name=val2 http://babycare.yhuan.cc/fa_medical_record?id=eq.1
async function update(ctx, next) {
  try {
    // const data = await Api.patch(`/fa_medical_record?id=eq.${id}`);
    console.log(ctx.request.body);
    const data = await graph(updateMR, {
      medical_record: ctx.request.body
    });
    console.log(data);
    ctx.state.data = { status: "OK" };
  } catch (error) {
    console.log(error);
  }
}

async function destroy(ctx, next) {
  // const data = await Api.delete('/fa_medical_record')
  // ctx.state.data = { medical_records: data };
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
  post,
  getOne,
  getAll,
  update,
  destroy
};
