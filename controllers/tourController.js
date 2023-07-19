const fs = require('fs');
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
const saveTour = (path, content, cb) => {
  fs.writeFile(path, JSON.stringify(content), err => {
    if (err) cb.status(400).json({ message: 'ERRO!!Luu file khong thanh cong' });
    cb.status(201).json({ message: 'Luu file thanh cong', data: cb.data });
  });
};
exports.checkID = (req, res, next, val) => {
  // kiem tra thu ID cua nguoi dung co hop le khong, neu hop le thi cho next() khong thi dung o day va tra lai res la khong hop le
  if (tours.findIndex(tour => tour.id === val) !== -1) return next();
  res.json({ message: 'Invalid ID, wrong user ID' });
};
exports.getAllToursOrTour = (req, res) => {
  const id = +req.params.id;
  if (!id) {
    return res.status(200).json({
      message: 'Thong tin tat ca cac tours',
      data: tours,
    });
  }
  const indexOfTour = tours.findIndex(tour => tour.id === id);
  if (indexOfTour === -1)
    return res.status(404).json({
      message: 'Khong ton tai tour nao nhuw tren DMM',
    });
  return res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours: tours[indexOfTour] },
  });
};
exports.addTour = (req, res) => {
  const newID = tours.slice(-1).reduce((acc, oject) => {
    return acc + oject.id + 1;
  }, 0);
  res.data = Object.assign({ id: newID }, req.body);
  tours.push(res.data);

  saveTour('./dev-data/data/tours-simple.json', tours, res);
};
exports.updateTour = (req, res) => {
  const id = +req.params.id;
  const indexOfTour = tours.findIndex(tour => tour.id === id);
  if (indexOfTour == -1)
    return res.status(400).json({
      status: 'Fail to Update, can not find the tour',
    });
  tours[indexOfTour].status = 'This tour has been Updated';
  res.data = tours[indexOfTour];
  saveTour('./dev-data/data/tours-simple.json', tours, res);
};
exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const indexOfTour = tours.findIndex(tour => tour.id === id);
  if (indexOfTour == -1)
    return res.status(400).json({
      status: 'Fail to Delete, can not find the tour',
    });
  res.data = 'This tour has been successfully Delete';
  res.json({ message: res.data });
  // save tour sau khi update
  // saveTour('./dev-data/data/tours-simple.json', tours, res);};
};
