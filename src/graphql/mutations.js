// eslint-disable
// this is an auto generated file. This will be overwritten

export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    image
    mainImage
    price
    stars
    info
    type
    title
  }
}
`;
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    id
    name
    image
    mainImage
    price
    stars
    info
    type
    title
  }
}
`;
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
    id
    name
    image
    mainImage
    price
    stars
    info
    type
    title
  }
}
`;
export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    image
    name
    amount
    process
    createdAt
    zipCode
  }
}
`;
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    image
    name
    amount
    process
    createdAt
    zipCode
  }
}
`;
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    image
    name
    amount
    process
    createdAt
    zipCode
  }
}
`;
