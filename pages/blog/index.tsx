import Image from 'next/image'
import Link from 'next/link';

import { Inter } from '@next/font/google'

import fs from 'fs';
import matter from 'gray-matter';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
  
}


export default function Blog({ posts }: any) {


  return (

    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-4 md:p-4 mx-auto gap-4'>
      {posts.map(({ slug, frontmatter }: any) => (
        <div
          key={slug}
          className='border border-gray-200 p-0 m-0 shadow-lg overflow-hidden flex flex-col'
        >
          <Link href={`blog/post/${slug}`}>
              <Image
                width={650}
                height={340}
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              />
              <h1 className='p-4'>{frontmatter.title}</h1>
          </Link>
        </div>
      ))}
    </div>
    
  )
}
