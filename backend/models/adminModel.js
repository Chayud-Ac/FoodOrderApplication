import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// we can use presave to ensure the password is hashed before saving as well or we can define plane model and manually hashing the password by ourself. This Admin just show some pre hook
// So in process of creating the admin user we don't have to hash the password otherwise it will double hashing which will cause an error
adminSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
