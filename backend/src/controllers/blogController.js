// src/controllers/blogController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllPosts({ page = 1, limit = 10, category, tag, search }) {
    const skip = (page - 1) * limit;
    const where = {
        published: true,
        ...(category ? { category: { slug: category } } : {}),
        ...(tag ? { tags: { some: { tag: { name: tag } } } } : {}),
        ...(search ? {
            OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ],
        } : {}),
    };

    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: { category: true, tags: { include: { tag: true } } },
        }),
        prisma.post.count({ where }),
    ]);

    return { posts, total, page, pages: Math.ceil(total / limit) };
}

async function getPostBySlug(slug) {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true, tags: { include: { tag: true } } },
    });
    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        throw error;
    }
    // Increment view count async
    prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } },
    }).catch(console.error);

    return post;
}

// Admin only
async function createPost(data) {
    const { title, slug, content, featuredImageUrl, seoTitle, seoDescription, published, categoryId, tags } = data;

    // Create tags if they don't exist
    // const tagConnectOrCreate = tags ? tags.map(tagName => ({
    //     where: { name: tagName },
    //     create: { name: tagName },
    // })) : [];

    // We can't use connectOrCreate directly in a many-to-many with explicit join table easily in one go standardly depending on prisma version quirks for explicit m-n, 
    // but with the explicit PostTag model, we need to handle it carefully.
    // Actually, usually it's cleaner to use implicit m-n, but the schema has explicit PostTag.
    // Let's resolve tags first.

    // A better approach for explicit relation:
    // 1. Upsert tags and get IDs.
    // 2. Create Post and create PostTag relations.

    // Simpler: Just rely on Prisma's nested writes if strictly follows schema
    // The schema: Post -> PostTag -> Tag

    // Let's do it in a transaction or just logical steps for simplicity if usage is low.
    // For now, let's assume we pass tag strings.

    /* 
       Note: With explicit many-to-many (PostTag), we need to create the Post, then create PostTags.
    */

    return await prisma.$transaction(async (tx) => {
        const post = await tx.post.create({
            data: {
                title,
                slug,
                content,
                featuredImageUrl,
                seoTitle,
                seoDescription,
                published,
                categoryId,
            },
        });

        if (tags && tags.length > 0) {
            for (const tagName of tags) {
                const tag = await tx.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });
                await tx.postTag.create({
                    data: {
                        postId: post.id,
                        tagId: tag.id,
                    },
                });
            }
        }
        return post;
    });
}

async function updatePost(id, data) {
    // Similar logic to create, but update.
    // Simplifying for brevity: Update scalar fields, simplistic tag handling (clear and add might be easiest for MVP)
    const { tags, ...rest } = data;

    return await prisma.$transaction(async (tx) => {
        const post = await tx.post.update({
            where: { id },
            data: rest,
        });

        if (tags) {
            // Remove existing tags
            await tx.postTag.deleteMany({ where: { postId: id } });
            // Add new ones
            for (const tagName of tags) {
                const tag = await tx.tag.upsert({
                    where: { name: tagName },
                    update: {},
                    create: { name: tagName },
                });
                await tx.postTag.create({
                    data: {
                        postId: post.id,
                        tagId: tag.id,
                    },
                });
            }
        }
        return post;
    });
}

async function deletePost(id) {
    // Delete dependent PostTags first or use cascade if set in DB (schema didn't show cascade, assuming default restrict or need manual)
    // Prisma usually handles cascade DELETE if configured in schema. Schema: 
    // model PostTag { post Post ... } - usually needs `onDelete: Cascade` in schema for auto.
    // I recall the schema view: didn't explicitly see onDelete Cascade.
    // Safest to delete PostTags first.

    await prisma.postTag.deleteMany({ where: { postId: id } });
    return await prisma.post.delete({ where: { id } });
}

async function getCategories() {
    return await prisma.category.findMany();
}

/**
 * Creates a category
 * @param {string} name 
 * @param {string} slug 
 */
async function createCategory(name, slug) {
    return await prisma.category.create({
        data: { name, slug }
    });
}

module.exports = {
    getAllPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
    getCategories,
    createCategory
};
