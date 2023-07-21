const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));
const saveUser = (path, content, cb) => {
  fs.writeFile(path, JSON.stringify(content), (err) => {
    if (err)
      cb.status(400).json({ message: 'ERRO!!Luu file khong thanh cong' });
    cb.status(201).json({ message: 'Luu file thanh cong', data: cb.data });
  });
};

//function cho cac route
exports.getAllUser = (req, res) => {
  res
    .status(200)
    .json({ message: 'Lay thong tin user thanh cong', data: { users } });
};
exports.createUser = (req, res) => {
  res.status(200).json({ message: 'Tao user moi thanh cong', data: { users } });
};
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  res.status(200).json({ message: 'User has been updated', data: { user } });
};
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  res
    .status(200)
    .json({ message: 'Xoa thong tin user thanh cong', data: { user } });
};
exports.getUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u._id === userId);
  res.status(200).json({ message: 'Thong tin 1 user', data: { user } });
};
