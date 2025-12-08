// src/routes/blog.js
const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { authGuard } = require('../middleware/authGuard');
const {
    getAllPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
    getCategories,
    createCategory
} = require('../controllers/blogController');

// Schemas
const createPostSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Slug must be kebab-case'),
    content: z.string().min(10),
    featuredImageUrl: z.string().url().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(false),
    categoryId: z.number().int().optional(),
    tags: z.array(z.string()).optional(),
});

const updatePostSchema = createPostSchema.partial();

const categorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().regex(/^[a-z0-9-]+$/),
});

// Public Routes
router.get('/posts', async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getAllPosts({
            page,
            limit,
            category: req.query.category,
            tag: req.query.tag,
            search: req.query.search
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/posts/:slug', async (req, res, next) => {
    try {
        const post = await getPostBySlug(req.params.slug);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

router.get('/categories', async (req, res, next) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// Protected Query Routes (if strictly admin view needed, but public usually fine. 
// We might want an admin list that includes unpublished? boolean flag in getAllPosts? 
// For now, simple implementation)

// Protected Write Routes
router.post('/posts', authGuard, async (req, res, next) => {
    try {
        const data = createPostSchema.parse(req.body);
        const post = await createPost(data);
        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
});

router.put('/posts/:id', authGuard, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = updatePostSchema.parse(req.body);
        const post = await updatePost(id, data);
        res.json(post);
    } catch (err) {
        next(err);
    }
});

router.delete('/posts/:id', authGuard, async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        // We'll trust the controller to handle missing ID or errors
        await deletePost(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

router.post('/categories', authGuard, async (req, res, next) => {
    try {
        const { name, slug } = categorySchema.parse(req.body);
        const category = await createCategory(name, slug);
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
