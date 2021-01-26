exports.addCategory = async function (req, res) {
  const { name, image, description, typeId } = req.body;
  try {
    const category = new Category({
      name,
      image,
      description,
      typeId,
    });
    await category.save((err, data) => {
      if (err) res.json({ status: false, message: "Error " + err });
      res.json({ status: true, data: data });
    });
  } catch (error) {
    console.log(error);
  }
};
