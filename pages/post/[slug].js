import fs from 'fs';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';



const md = markdownIt({
  html: true,
});

export async function getStaticPaths() {

    const files = fs.readdirSync('posts');

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
        },
    };
}

export default function PostPage({ frontmatter, content }) {

    /*const customTitleStyles = {
        fontSize: '4rem',
        fontWeight: 900, 
      };

    const responsiveStyle = {
    '@media (max-width: 1024px)': {
        fontSize: '10px', 
        fontWeight: 900, 
    },
    };

    const mergedStyle = { ...customTitleStyles, ...responsiveStyle };*/

    return (

        <div className='p-4'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" className='block pl-1 underline-offset-4 cursor-pointer'>
                    Works
                </Link>
                <Typography color="text.primary">
                    Details
                </Typography>
            </Breadcrumbs>
            <div className='prose prose-sm md:prose-2xl'>
                <h1 /*style={mergedStyle}*/>{frontmatter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
            </div>
        </div>

    );
}