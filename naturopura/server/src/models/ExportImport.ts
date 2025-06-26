import mongoose, { Schema, Document } from "mongoose";

export interface IExportImport extends Document {
  type: "export" | "import";
  count: number;
  storeManager: mongoose.Types.ObjectId;
  date: Date;
}

const ExportImportSchema: Schema = new Schema({
  type: { type: String, enum: ["export", "import"], required: true },
  count: { type: Number, required: true },
  storeManager: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IExportImport>("ExportImport", ExportImportSchema);