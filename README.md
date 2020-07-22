# light-box

A full stack Node.js and React shopping cart app.

## Technologies Used

- React.js
- Webpack 4
- Babel
- Bootstrap 4
- Node.js
- PostgreSQL
- HTML 5
- CSS 3
- AWS EC2
- font-awesome

## Live Demo

Try the application live at [https://light-box.sarahchoung.com/]

## Features

- Users can view the products for sale.
- Users can view details of a product.
- Users can add a product to their cart.
- Users can view their cart summary.
- Users can place an order.

## Preview

![Light Box](server/public/images/light-box-preview.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- postgreSQL

### Getting Started

1. Clone the repository.

```shell
git clone https://github.com/SarahChoung/light-box.git
cd light-box
```

2. Install all dependencies with NPM.

```shell
npm install
```

3. Import the example database to postgreSQL.

```shell
npm run db:import
```

4. Start the project. Once you can, view the application by opening http://localhost:3000 in your browser.

```shell
npm run dev
```
