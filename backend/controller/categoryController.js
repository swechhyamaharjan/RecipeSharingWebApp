import Category from "../model/category.js";

const addCatergory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(400).send({ message: "Category name already exists!!" })
    }
    const category = await Category.create({
      name,
      description
    })
    res.send(category);
  } catch (error) {
    res.status(500).send({ error: "Server Errror", message: error.message });
  }
}

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ error: "Server Errror", message: error.message });
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryBody = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category doesn't exists!!" })
    }
    const updateCategory = await Category.findByIdAndUpdate(
      categoryId,
      categoryBody,
      { new: true }
    )
    res.status(200).send({ message: "Category updated successfully", updateCategory });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category not found!!!" })
    }
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

}
export { addCatergory, getAllCategory, updateCategory, deleteCategory };