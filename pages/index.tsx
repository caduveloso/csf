import Image from 'next/image'
import Link from 'next/link';

import React, { useState } from 'react';

import { Inter } from '@next/font/google'

import fs from 'fs';
import matter from 'gray-matter';


import Videos from './post/videos';

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

    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-0 md:p-4 mx-auto gap-2 bg-gradient-to-rt from-gray-300 to-gray-100'>
      <Videos/>
      {posts.map(({ slug, frontmatter }: any) => (
        <div
          key={slug}
          className='bg-white border-8 border-white p-0 m-0 shadow-lg overflow-hidden flex flex-col'
        >
          <Link href={`post/${slug}`}>
            <Image
              width={650}
              height={340}
              alt={frontmatter.title}
              src={`/${frontmatter.socialImage}`}
            />
            <h1 className='font-bold pt-4 pb-2 leading-5'>{frontmatter.title}</h1>
          </Link>
        </div>
      ))}
    </div>

  )
}
