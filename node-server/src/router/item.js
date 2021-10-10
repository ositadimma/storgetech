const express = require('express');
const ItemController = require('../controller/itemController');
const router = express.Router();
const cors = require('cors');
const app = express();


app.use(cors());
router.get('/api/v1/inventory/item/:id', async (req, res) => {
    const { id } = req.params;
    ItemController
     .findItemById(id)
     .then((data) => {
      res.status(200).send(data);
     })
     .catch((err) => {
      res.status(400).send(err);
     });
});

app.use(cors());
router.get('/api/v1/inventory/item', async (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET");
    res.header('Access-Control-Allow-Headers', "accept, content-type");
    res.header('Access-Control-Allow-Max-Age', "1728000");
    ItemController
     .loadTotalItems()
     .then((data) => {
         res.status(200).send(data)
     })
     .catch((err) => {
         res.status(400).send(err)
     });
});

app.use(cors());
router.post('/api/v1/inventory/item', async (req, res) => {
    const data = req.body;
        app.use(cors());
      res.header('Access-Control-Allow-Origin', "*");
      app.use(cors());
      res.header('Access-Control-Allow-Methods', "POST");
      app.use(cors());
      res.header('Access-Control-Allow-Headers', "accept, content-type");
      app.use(cors());
      res.header('Access-Control-Allow-Max-Age', "1728000");
      const item = {
       name: data.name,
       status: true,
       itemCategoryId: data.itemCategoryId,
       createdAt: new Date(),
       updatedAt: new Date(),
       isDeleted: 0
      };     
      ItemController
       .addNewItem(item)
       .then((response) => {
        res
         .status(200)
         .send('created')
       })
       .catch((err) => {
        res.status(400).send(err)
       });
});

app.use(cors());
router.put('/api/v1/inventory/item', async (req, res) => {
    const data = req.body;
      const item = {
       name: data.name,
       status: data.status,
       itemCategoryId: data.categoryId,
       updatedAt: new Date(),
      };
      itemController
       .updateItem(item, {
        id: data.id,
       })
       .then((response) => {
        res.status(400).send(response);
       })
       .catch((err) => {
        console.log(err);
        res.status(httpStatus.BAD_REQUEST).jsonp(responseUtils.buildResponseErrorDto(httpStatus.BAD_REQUEST, 'Error', err));
       });
     }
);

app.use(cors());
router.delete('/api/v1/inventory/item', async (req, res) => {
    const itemId = req.body.id;
        if (itemId < 0) {
            res.status(400).send('inaccurate item chosen')
        } else {
            ItemController
            .deleteItem(itemId)
            .then((response) => {
            res.status(200).send(response)
            })
            .catch((err) => {
             res.status(400).send(err)
            });
        }
    }
);

app.use(cors());
router.get('/api/v1/inventory/item_category', async (req, res) => {
    const { id } = req.params;
    ItemController
     .loadTotalItemCategories()
     .then((data) => {
        res.status(200).send(data)
     })
     .catch((err) => {
        res.status(400).send(err)
     });
});

app.use(cors());
router.get('/api/v1/inventory/item_category/:id', async (req, res) => {
    const { id } = req.params;
    ItemController
     .findItemCategoryById(id)
     .then((data) => {
      res.status(200).send(data);
     })
     .catch((err) => {
      res.status(400).send(err);
     });
});

app.use(cors());
router.post('/api/v1/inventory/item_category', async (req, res) => {
    const data = req.body;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "POST");
    res.header('Access-Control-Allow-Headers', "accept, content-type");
    res.header('Access-Control-Allow-Max-Age', "1728000");

    const category = {
        name: data.name,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: 0
    };     
    ItemController
    .addNewItemCategory(category)
    .then((response) => {
        res
        .status(200)
        .send('created')
    })
    .catch((err) => {
        res
        .status(400)
        .send(err)
    });
 });

app.use(cors());
router.put('/api/v1/inventory/item_category/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "POST");
    res.header('Access-Control-Allow-Headers', "accept, content-type");
    res.header('Access-Control-Allow-Max-Age', "1728000");
    const data = req.body;
    console.log(req.body.id)
      const category = {
       name: data.name,
       updated_at: new Date(),
      };
      ItemController
       .updateItemCategory(category, {
        id: req.body.id,
       })
       .then((response) => {
           res
           .status(200)
           .send(response)
       })
       .catch((err) => {
        res
        .status(400)
        .send(err)
       });
});

app.use(cors());
router.delete('/api/v1/inventory/item_category', async (req, res) => {
    const categoryId = req.body.id;
    console.log(categoryId)
    if (categoryId < 0) {
        res.send('Invalid input parameter')
    } else {
        ItemController
        .deleteItemCategory(categoryId)
        .then((response) => {
        res
        .status(200)
        .send(response)
        })
        .catch((err) => {
        res
        .status(400)
        .send(err)
        });
    }
});

module.exports= router;