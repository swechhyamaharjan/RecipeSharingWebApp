import Category from "../model/category.js";

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existCategory = await Category.findOne({
      name: { $regex: `^${name}$`, $options: "i" }
    });

    if (existCategory) {
      return res.status(400).json({ message: "Category name already exists!" });
    }
    const category = await Category.create({
      name,
      description,
      image: req.file?.path || "",
    });

    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({error: error.message});
  }
};


const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send({ error: "Server Errror", message: error.message });
  }
}
const getCategoryById = async(req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if(!category) return res.status(404).send({message: "Category not found"});
    res.send(category);
  } catch (error) {
  res.status(500).send({ error: "Server Errror", message: error.message });
  }
}

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category doesn't exist!" });
    }
    // Update fields
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    // Update image only if new one is uploaded
    if (req.file) {
      category.image = req.file.path;
    }
    const updatedCategory = await category.save();
    res.status(200).send({
      message: "Category updated successfully",
      updatedCategory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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
export { addCategory, getAllCategory, updateCategory, deleteCategory, getCategoryById };