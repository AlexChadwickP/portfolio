import { getAllPublished, getSinglePost } from "@ac/md";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ content, frontmatter }: any) {
  return <div className='w-full flex justify-center'>
    <div className='lg:w-1/3 py-10 prose'>
        <h1>{frontmatter.title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  </div>;
}

export const getStaticProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug, "posts");

  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
    console.log('Called get static paths');
  const paths = getAllPublished("posts").map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};
