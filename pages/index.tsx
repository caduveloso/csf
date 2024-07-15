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

    <div>
      <div className='max-w-[1000px] px-5 py-10'>
        <h2 className='title text-5xl'>Hi, my name is Carlos</h2>
        <div className='flex flex-col gap-4 mt-10 text-2xl leading-10'>
          <p className=''>I have been passionate about <strong>design</strong> and <strong>programming</strong> since 2002. I graduated with a degree in Graphic Design in 2009 and have worked for various companies and public service organizations. Recently, I&apos;ve been focusing on helping companies in the <strong>cryptocurrency</strong> space, using my skills to contribute to their success.</p>
          <p className='mt-0'>Over the past four years, I have dedicated myself to a range of personal projects, developing my skills in design, CSS, JavaScript, and Solidity. I enjoy studying these areas and launching my own ideas. This collection showcases my work, from advertising to complex blockchain applications.</p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 py-0 md:p-4 mx-auto gap-2 bg-gradient-to-rt from-gray-300 to-gray-100'>
        {/* <Videos/> */}
        {/* <IntroText/> */}
        {posts.map(({ slug, frontmatter }: any) => (
          <div
            key={slug}
            className='bg-white border-8 border-white p-0 m-0 shadow-lg overflow-hidden'
          >
            <Link href={`post/${slug}`}>
              <Image
                className='object-cover w-full'
                width={650}
                height={340}
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              />
              <h1 className='title pt-4 pb-2 ml-1 leading-10 text-3xl'>
                {frontmatter.title}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>

  )
}
