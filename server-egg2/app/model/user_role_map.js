module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema, ObjectId } = mongoose

  const SchemaDef = new Schema({
    user_id: { type: ObjectId, required: true },
    role_id: { type: ObjectId, required: true },
  })

  const name = 'user_role_map'
  return(conn || mongoose).model(name, SchemaDef, name)
}
