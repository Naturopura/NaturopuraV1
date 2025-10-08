import User from '../models/User';
import bcrypt from 'bcryptjs';

const createDefaultAdmin = async () => {
  const defaultEmail = 'admin@naturopura.com';
  const defaultPassword = 'Admin@123';
  const defaultPhone = '7978315927';

  const existingAdmin = await User.findOne({ email: defaultEmail });
  if (existingAdmin) {
    // Update phoneNumber if missing or different
    if (!existingAdmin.phoneNumber || existingAdmin.phoneNumber !== defaultPhone) {
      existingAdmin.phoneNumber = defaultPhone;
      await existingAdmin.save();
      console.log('✅ Default admin phoneNumber updated');
    }
    return;
  }

  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  await User.create({
    name: 'Tusar Mohapatra',
    email: defaultEmail,
    password: hashedPassword,
    phoneNumber: defaultPhone,
    role: 'admin',
    isDefaultAdmin: true
  });

  console.log('✅ Default admin created');
};

export default createDefaultAdmin;
