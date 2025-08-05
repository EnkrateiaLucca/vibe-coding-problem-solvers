# Pattern 11: Context-Based Coding - Use Official Documentation

## The Authoritative Source Pattern

When working with frameworks, libraries, or APIs, always provide AI with the official, up-to-date documentation to ensure accurate, current implementations.

**Flow**: Identify Technology → Find Official Docs → Provide Context → Generate Code

---

## Example 1: React Query Implementation

### The Problem
AI generates outdated React Query code using v3 syntax when the project uses v5.

### Without Context (Outdated Result)
```javascript
// AI generates this based on older training data
import { useQuery } from 'react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery(
    ['user', userId],
    () => fetchUser(userId),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.name}</div>;
}
```

### With Official Documentation Context
```markdown
Here's the current React Query v5 documentation for useQuery:

## useQuery

```typescript
function useQuery(options: UseQueryOptions): UseQueryResult

interface UseQueryOptions {
  queryKey: QueryKey
  queryFn?: QueryFunction
  gcTime?: number
  staleTime?: number
  select?: (data: TData) => unknown
  placeholderData?: TData | PlaceholderDataFunction<TData>
  retry?: boolean | number | RetryFunction
  // ... other options
}
```

### Basic Usage
```typescript
import { useQuery } from '@tanstack/react-query'

function Profile() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return <div>{data.name}</div>
}
```

Please create a UserProfile component that fetches user data using React Query v5 syntax.
```

### AI Generated Result (With Context)
```typescript
import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProfileProps {
  userId: string;
}

function UserProfile({ userId }: UserProfileProps) {
  const { 
    data, 
    isLoading, 
    error,
    isError 
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes (replaces cacheTime)
    retry: 3,
    enabled: !!userId, // Only run query if userId is provided
  });

  if (isLoading) {
    return <div className="loading">Loading user profile...</div>;
  }

  if (isError && error) {
    return (
      <div className="error">
        Error loading profile: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div>No user data found</div>;
  }

  return (
    <div className="user-profile">
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
    </div>
  );
}

export default UserProfile;
```

---

## Example 2: Next.js App Router Implementation

### The Challenge
Implementing authentication with Next.js App Router using the latest patterns.

### Context Provided
```markdown
Here's the official Next.js 14 App Router documentation for middleware and authentication:

## Middleware

Middleware allows you to run code before a request is completed. Based on the user's request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Add your logic here
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs.

```typescript
// app/api/auth/route.ts
export async function GET(request: Request) {}
export async function POST(request: Request) {}
```

## Server Components vs Client Components

Server Components run on the server and can directly access backend resources. Client Components run in the browser and handle interactivity.

Please implement a complete authentication system using these patterns.
```

### AI Generated Implementation
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token
    const payload = await verifyJWT(token);
    
    // Add user info to request headers for server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Invalid token, redirect to login
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('auth-token');
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};
```

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signJWT } from '@/lib/auth';
import { validateUser } from '@/lib/users';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await validateUser(email, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = await signJWT({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Create response with token
    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          role: user.role 
        } 
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

```typescript
// app/dashboard/page.tsx (Server Component)
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserData } from '@/lib/users';

export default async function DashboardPage() {
  const headersList = headers();
  const userId = headersList.get('x-user-id');
  const userRole = headersList.get('x-user-role');

  if (!userId) {
    redirect('/login');
  }

  // Fetch user data on server
  const userData = await getUserData(userId);

  return (
    <div className="dashboard">
      <h1>Welcome, {userData.name}!</h1>
      <p>Role: {userRole}</p>
      {/* Server-rendered content */}
    </div>
  );
}
```

---

## Example 3: Prisma Database Integration

### Context: Latest Prisma Documentation
```markdown
Here's the current Prisma documentation for defining models and relationships:

## Schema Definition

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String?
  posts    Post[]
  profile  Profile?
  
  @@map("users")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  tags      Tag[]
  
  @@map("posts")
}
```

## Client Usage

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create with relations
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    posts: {
      create: [
        {
          title: 'Hello World',
          content: 'This is my first post',
        },
      ],
    },
  },
  include: {
    posts: true,
  },
})
```

Please create a complete blog schema with users, posts, comments, and tags, including all necessary relationships and CRUD operations.
```

### AI Generated Implementation
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  avatar    String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts     Post[]
  comments  Comment[]
  likes     Like[]
  follows   Follow[] @relation("UserFollows")
  followers Follow[] @relation("UserFollowers")
  
  @@map("users")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  coverImage  String?
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  author      User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId    String
  comments    Comment[]
  likes       Like[]
  tags        PostTag[]
  
  @@map("posts")
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  author    User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  post      Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  parentId  String?
  replies   Comment[] @relation("CommentReplies")
  
  @@map("comments")
}

model Tag {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  color       String?
  createdAt   DateTime  @default(now())
  
  // Relations
  posts       PostTag[]
  
  @@map("tags")
}

model PostTag {
  post   Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId String
  tag    Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)
  tagId  String
  
  @@id([postId, tagId])
  @@map("post_tags")
}

model Like {
  id       String @id @default(cuid())
  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId   String
  post     Post   @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId   String
  createdAt DateTime @default(now())
  
  @@unique([userId, postId])
  @@map("likes")
}

model Follow {
  id          String @id @default(cuid())
  follower    User   @relation("UserFollows", fields: [followerId], references: [id], onDelete: Cascade)
  followerId  String
  following   User   @relation("UserFollowers", fields: [followingId], references: [id], onDelete: Cascade)
  followingId String
  createdAt   DateTime @default(now())
  
  @@unique([followerId, followingId])
  @@map("follows")
}
```

```typescript
// lib/blog.ts - CRUD Operations
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// User Operations
export const userService = {
  async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      include: {
        _count: {
          select: {
            posts: true,
            followers: true,
            follows: true,
          },
        },
      },
    });
  },

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          where: { published: true },
          take: 5,
          orderBy: { publishedAt: 'desc' },
        },
        _count: {
          select: {
            posts: true,
            followers: true,
            follows: true,
          },
        },
      },
    });
  },
};

// Post Operations
export const postService = {
  async createPost(data: Prisma.PostCreateInput) {
    return prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  },

  async getPublishedPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    return prisma.post.findMany({
      where: { published: true },
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  },

  async getPostBySlug(slug: string, userId?: string) {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        comments: {
          where: { parentId: null },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!post) return null;

    // Check if current user has liked the post
    let isLiked = false;
    if (userId) {
      const like = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId: post.id,
          },
        },
      });
      isLiked = !!like;
    }

    return { ...post, isLiked };
  },

  async updatePost(id: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  },

  async deletePost(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  },
};

// Comment Operations
export const commentService = {
  async createComment(data: Prisma.CommentCreateInput) {
    return prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  async getCommentsByPost(postId: string) {
    return prisma.comment.findMany({
      where: { 
        postId,
        parentId: null, // Only root comments
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },
};

// Like Operations
export const likeService = {
  async toggleLike(userId: string, postId: string) {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return { liked: false };
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return { liked: true };
    }
  },
};

export default prisma;
```

---

## Documentation Context Best Practices

### 1. Finding Official Documentation
```markdown
# Documentation Source Checklist

## Framework/Library Documentation
✅ Official project documentation site
✅ GitHub repository README and docs folder
✅ Package registry (npm, PyPI) documentation
❌ Third-party tutorials (can be outdated)
❌ Stack Overflow answers (may be outdated)
❌ Personal blog posts (unless very recent)

## Version-Specific Documentation
✅ Check the exact version you're using
✅ Look for migration guides between versions
✅ Check changelog for breaking changes
✅ Use version-specific documentation URLs

## API Documentation
✅ Official API reference documentation
✅ OpenAPI/Swagger specifications
✅ SDK documentation from the provider
✅ Rate limits and authentication details
```

### 2. Effective Context Extraction
```markdown
# Documentation Context Template

## Technology: [Name and Version]
## Source: [Official Documentation URL]
## Last Updated: [Date from documentation]

## Relevant Sections:
### Basic Usage
[Copy exact code examples from docs]

### Advanced Features
[Copy relevant advanced examples]

### Configuration Options
[Copy configuration schema/options]

### Common Patterns
[Copy recommended patterns]

### Error Handling
[Copy error handling examples]

## Request:
[Your specific implementation request]
```

### 3. Multi-Technology Context
```typescript
// When working with multiple technologies, provide context for each
const contextPrompt = `
I'm building a React application with the following stack:

## React 18.2.0 - Official Hooks Documentation
[React hooks documentation excerpts]

## TypeScript 5.0 - Official Type Definitions
[TypeScript interface and type documentation]

## Next.js 14 - App Router Documentation
[Next.js App Router documentation excerpts]

## TailwindCSS 3.3 - Utility Classes
[TailwindCSS utility class documentation]

Please create a [specific component request] using these technologies with their current best practices.
`;
```

---

## Version-Specific Context Examples

### React Query v3 vs v5
```typescript
// ❌ Without version context - AI might generate v3 syntax
import { useQuery } from 'react-query';

// ✅ With v5 context - AI generates current syntax
import { useQuery } from '@tanstack/react-query';
```

### Express.js 4 vs 5
```javascript
// ❌ Outdated body parsing (Express 4)
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// ✅ Built-in body parsing (Express 5 with context)
// No additional middleware needed
app.use(express.json());
```

### React Router v5 vs v6
```jsx
// ❌ Old routing syntax
import { Switch, Route } from 'react-router-dom';

// ✅ Current routing syntax (with context)
import { Routes, Route } from 'react-router-dom';
```

---

## API Context Examples

### Stripe API Integration
```markdown
Here's the current Stripe API documentation for Payment Intents:

## Create a PaymentIntent

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});
```

## Confirm a PaymentIntent

```javascript
const paymentIntent = await stripe.paymentIntents.confirm(
  'pi_1234567890',
  {
    payment_method: 'pm_card_visa',
  }
);
```

## Handling Webhooks

```javascript
const sig = request.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

switch (event.type) {
  case 'payment_intent.succeeded':
    // Handle successful payment
    break;
}
```

Please implement a complete payment flow using these current patterns.
```

### OpenAI API Integration
```markdown
Here's the current OpenAI API documentation for Chat Completions:

## Create Chat Completion

```javascript
const completion = await openai.chat.completions.create({
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello world" }
  ],
  model: "gpt-4",
  max_tokens: 100,
  temperature: 0.7,
});
```

## Streaming Responses

```javascript
const stream = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Say this is a test' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

Please implement a chat interface using the current API patterns.
```

---

## Context Documentation Workflow

### 1. Technology Identification
```bash
# Check versions in your project
npm list --depth=0
cat package.json | grep -A 10 dependencies
```

### 2. Documentation Gathering Script
```python
#!/usr/bin/env python3
"""
Documentation Context Gatherer
Helps collect official documentation for AI context
"""

import requests
from pathlib import Path

def get_npm_package_docs(package_name):
    """Get official documentation URL for npm package"""
    try:
        response = requests.get(f"https://registry.npmjs.org/{package_name}")
        data = response.json()
        
        docs_url = (
            data.get('homepage') or 
            data.get('repository', {}).get('url') or
            f"https://www.npmjs.com/package/{package_name}"
        )
        
        return {
            'name': package_name,
            'version': data.get('dist-tags', {}).get('latest'),
            'docs_url': docs_url,
            'description': data.get('description')
        }
    except:
        return None

def generate_context_template(packages):
    """Generate context template for AI prompting"""
    template = "# Project Documentation Context\n\n"
    
    for pkg in packages:
        if pkg:
            template += f"## {pkg['name']} v{pkg['version']}\n"
            template += f"**Description**: {pkg['description']}\n"
            template += f"**Documentation**: {pkg['docs_url']}\n\n"
            template += "### Key Documentation Sections to Include:\n"
            template += "- Basic usage examples\n"
            template += "- Configuration options\n" 
            template += "- API reference\n"
            template += "- Best practices\n\n"
    
    return template

# Usage
packages = ['react', 'next', '@tanstack/react-query', 'prisma']
context_info = [get_npm_package_docs(pkg) for pkg in packages]
template = generate_context_template(context_info)
print(template)
```

### 3. Context Validation Checklist
```markdown
# Context Quality Checklist

Before providing documentation context to AI:

## Accuracy
- [ ] Documentation is from official source
- [ ] Version matches your project
- [ ] Examples are current (not deprecated)
- [ ] API endpoints/methods are correct

## Completeness  
- [ ] Includes basic usage patterns
- [ ] Shows error handling approaches
- [ ] Covers configuration options
- [ ] Includes TypeScript types (if applicable)

## Relevance
- [ ] Documentation matches your use case
- [ ] Examples are similar to your requirements
- [ ] Includes edge cases you might encounter
- [ ] Shows integration patterns with other tools
```

---

## Context-Based Coding Success Metrics

### Code Quality Improvements
- **Fewer deprecated patterns**: Using current best practices
- **Better error handling**: Following official recommendations
- **Proper TypeScript types**: Using official type definitions
- **Performance optimizations**: Following official performance guides

### Development Speed
- **Reduced debugging time**: Correct implementations from the start
- **Fewer refactoring cycles**: Current patterns don't need updating
- **Better team alignment**: Everyone using official patterns
- **Easier maintenance**: Code follows documented standards

### Learning Acceleration
- **Official patterns**: Learning the "right way" immediately
- **Version awareness**: Understanding when to upgrade dependencies
- **Best practices**: Following community-approved approaches
- **Future-proofing**: Code that works with newer versions

Remember: Official documentation is your source of truth. When in doubt, always prefer the official docs over community tutorials or older Stack Overflow answers!