import mongoose from "mongoose";
import { Item } from "../models/index.js";
import { MenuItem } from '../type/index.js';


const getItems = async (params: MenuItem.ItemQuery) => {
  const query: mongoose.FilterQuery<MenuItem.Item> = {};

  if (params.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice }
  }

  if (params.category) {
    query.category = { $eq: params.category }
  }

  if (params.searchTerms) {
    const qReg = new RegExp(params.searchTerms, 'i');

    query.$or = [
      { name: qReg },
      { description: qReg },
      { category: qReg },
      { ingredients: qReg },

    ]
  }

  console.log(query);

  const items = await Item.find(query, null, {sort: {'_id': -1}});

  return items;
}

const getItemById = async (itemId: string) => {
  const itemDoc = await Item.findById(itemId);
  if (itemDoc) {
    const item: MenuItem.Item = {
      name: itemDoc.name,
      category: itemDoc.category,
      description: itemDoc.description || '',
      imageUrl: itemDoc.imageUrl || '',
      ingredients: itemDoc.ingredients,
      price: itemDoc.price || 0
    }
    return item;
  }
  return null;
}
const createItem = (req: MenuItem.ItemRequest) => {
  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    ingrediants: req.body.ingredients,
    description: req.body.description,
  });

  newItem.price = req.body.price ?? 10; //coelacing
  return newItem.save()
    .then(()=>{
      return true;
    })
}

export default {
  getItems,
  createItem,
  getItemById
}