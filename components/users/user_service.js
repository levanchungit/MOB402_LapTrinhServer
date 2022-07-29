const userModel = require("../users/user_model");

const login = async (username, password) => {
  // let user = users.find((item) => item.email == email);
  let user = await userModel.find({ username });
  if (user.length > 0) {
    return user[0];
  }
  return null;
};

const get = async (page, size) => {
  //select id,name from products
  // const items = products.slice((page - 1) * size, page * size);
  const items = await userModel
    .find({})
    .skip((page - 1) * size)
    .limit(size);
  return items;
};

const insert = async (user) => {
  const _user = new userModel(user);
  await _user.save();
};

const update = async (id, user) => {
  if (!user.image) {
    delete user.image;
  }

  await userModel.findByIdAndUpdate(id, user);
};

const remove = async (id) => {
  await userModel.findByIdAndDelete(id);
};

//API
const signIn = async (username, password) => {
  try {
    let user = await userModel.find({ username });
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    throw new Error("Có lỗi rồi");
  }
};

const signUp = async (username, password, fullname, image) => {
  const user = new userModel({ username, password, fullname, image });
  return await user.save();
};

const checkUsername = async (username) => {
  try {
    let user = await userModel.find({ username });
    if (user.length > 0) return true;
    return false;
  } catch (error) {
    throw new Error("Có lỗi rồi");
  }
};

const getInfo = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

module.exports = {
  login,
  get,
  insert,
  update,
  remove,
  signIn,
  signUp,
  checkUsername,
  getInfo,
};
