require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "image",
           "name",
           "price",
           "productId",
           "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.status(200).json(products);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = Number(req.params.productId);
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`Cannot find product with "productId" ${productId}`, 404));
      } else {
        res.status(200).json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
      where "c"."cartId" = $1
    `;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        const cartItems = result.rows;
        res.status(200).json(cartItems);
      })
      .catch(err => next(err));
  }
});

app.post('/api/cart/', (req, res, next) => {
  const productId = Number(req.body.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return next(new ClientError('"productId" must be a positive integer', 400));
  }
  const sql = `
    select "price"
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rowCount) {
        throw (new ClientError(`Cannot find product with productId ${productId}`, 400));
      }
      const price = result.rows[0].price;
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price
        };
      } else {
        const sql = `
        insert into "carts"("cartId", "createdAt")
        values(default, default)
        returning "cartId"
      `;
        return db.query(sql)
          .then(result => {
            const cartId = result.rows[0].cartId;
            return {
              cartId: cartId,
              price: price
            };
          });
      }
    })
    .then(cartObject => {
      req.session.cartId = cartObject.cartId;
      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const params = [cartObject.cartId, productId, cartObject.price];
      return db.query(sql, params)
        .then(result => {
          const cartItemId = result.rows[0].cartItemId;
          return cartItemId;
        });
    })
    .then(cartItemId => {
      const sql = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1
      `;
      const params = [cartItemId];
      return db.query(sql, params)
        .then(result => {
          const cartResult = result.rows[0];
          res.status(201).json(cartResult);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return next(new ClientError('"cartId" not found', 400));
  } else if (req.body.name && req.body.creditCard && req.body.shippingAddress) {
    const sql = `
      insert into "orders"("orderId", "cartId", "name", "creditCard", "shippingAddress", "createdAt")
      values(default, $1, $2, $3, $4, default)
      returning "orderId", "createdAt", "name", "creditCard", "shippingAddress"
    `;
    const params = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
    return db.query(sql, params)
      .then(result => {
        const order = result.rows[0];
        delete req.session.cartId;
        return res.status(201).json(order);
      })
      .catch(err => next(err));
  } else {
    return next(new ClientError('Must include "name", "creditCard", and "shippingAddress"', 400));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
