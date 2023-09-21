const locationSchema = require("../schemas/locationModel");

const postLocationController = async (req, res) => {
  try {
    const place = new locationSchema(req.body);
    await place.save();

    return res.status(200).send({
      success: true,
      message: "Place added",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

const deleteLocationController = async (req, res) => {
  const { placeid } = req.params;
  try {
    const place = await locationSchema.findByIdAndDelete({ _id: placeid });
    if (!place) {
      return res.status(404).send({
        success: false,
        message: "No such place found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateLocationController = async (req, res) => {
  const { placeid } = req.params;
  try {
    const place = await locationSchema.findByIdAndUpdate(
      { _id: placeid },
      { $set: { ...req.body } },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "place updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  postLocationController,
  deleteLocationController,
  updateLocationController,
};
