const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./dev-data/data/users.json'));

//function cho cac route
exports.getAllUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.createUser = (req, res) => {
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);
  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  res.status(200).json({ message: 'This route was not defined yet' });
};
exports.getUser = (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u._id === userId);
  res.status(200).json({ message: 'This route was not defined yet' });
};
