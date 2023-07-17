# Catalog-Backend
Backend application for a product catalog website.

Functionalities
The project has the following main features:

Create a product: Allows you to create a new product, providing information such as id, name, description, price, image related to the product and the code of the category it is related to.
(As the user can associate an image to the product, the database has the model image, which has an id and its buffer)

Create a category: Allows you to create a new category, informing its name and products in this category.

Associate a product to a category: Allows you to add an existing product to an already created category. This allows you to organize and group products into specific categories.

Remove a product from a category: Provides the ability to remove a product from a category. This does not delete the product or category, it just disassociates the product from the category in question.

Delete a category: Allows you to completely delete a category, removing it from the system. This action also disassociates all products that were previously associated with that category.
