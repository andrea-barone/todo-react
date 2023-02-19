import { nanoid } from "nanoid";

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

export const tagColors = [
  '#FF0000',
  '#00FF00',
  '#0000FF'
]

const tags = []

export const addTag = (tag) => {
  FILTER_MAP[tag.name] = (task) => task.tags.includes(tag.name)
  tags.push({ ...tag, id: nanoid() })
}

export const getTags = () => tags

export const getFilters = () => FILTER_MAP
