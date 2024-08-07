export const POST_ALIAS = 'api.cart.post';
const post = () => {
  cy.fixture('api/cart/post').then((response) => {
    cy.intercept('POST', new RegExp(/api\/v1\/cart/), (req) => req.reply({ body: response, delay: 500 })).as(
      POST_ALIAS
    );
  });
};

export const GET_ITEMS_POST_ALIAS = 'api.cart.get-items.post';
const getItemsPost = () => {
  cy.fixture('api/cart/get-items/post').then((response) => {
    cy.intercept('POST', new RegExp(/api\/v1\/cart\/get-items/), (req) => req.reply({ body: response, delay: 500 })).as(
      GET_ITEMS_POST_ALIAS
    );
  });
};

export const ADD_ITEM_POST_ALIAS = 'api.cart.add-item.post';
const addItemPost = () => {
  cy.fixture('api/cart/add-item/post').then((response) => {
    cy.intercept('POST', new RegExp(/api\/v1\/cart\/add-item/), (req) => req.reply({ body: response, delay: 500 })).as(
      ADD_ITEM_POST_ALIAS
    );
  });
};

export const UPDATE_ITEM_POST_ALIAS = 'api.cart.update-item.post';
const updateItemPost = () => {
  cy.fixture('api/cart/update-item/post').then((response) => {
    cy.intercept('POST', new RegExp(/api\/v1\/cart\/update-item/), (req) =>
      req.reply({ body: response, delay: 500 })
    ).as(UPDATE_ITEM_POST_ALIAS);
  });
};

export const REMOVE_ITEM_POST_ALIAS = 'api.cart.remove-item.post';
const removeItemPost = () => {
  cy.fixture('api/cart/remove-item/post').then((response) => {
    cy.intercept('POST', new RegExp(/api\/v1\/cart\/remove-item/), (req) =>
      req.reply({ body: response, delay: 500 })
    ).as(REMOVE_ITEM_POST_ALIAS);
  });
};

const interceptCart = {
  post,
  POST_ALIAS,
  getItems: {
    post: getItemsPost,
    POST_ALIAS: GET_ITEMS_POST_ALIAS,
  },
  addItem: {
    post: addItemPost,
    POST_ALIAS: ADD_ITEM_POST_ALIAS,
  },
  updateItem: {
    post: updateItemPost,
    POST_ALIAS: UPDATE_ITEM_POST_ALIAS,
  },
  removeItem: {
    post: removeItemPost,
    POST_ALIAS: REMOVE_ITEM_POST_ALIAS,
  },
};

export default interceptCart;
