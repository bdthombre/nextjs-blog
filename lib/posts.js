import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    //Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName)=> {
        //remove .md to get id
        const id = fileName.replace(/\.md$/,'');

        // read markdown
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //use gray-matter for metadata
        const matterResults = matter(fileContents);

        return {
            id,
            ...matterResults.data,
        };
    });
    // sort posts by date
    return allPostsData.sort((a,b)=>{
        if (a.date < b.date){
            return 1;
        } else {
            return -1;
        }

    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
      // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName)=>
    {
        return {
            params:{
                id: fileName.replace(/\.md$/, ''),
            },
        };
    }
    );
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    //gray-matter to parse metadata
    const matterResult = matter(fileContents);

    //use remark to convert markdown to html string
    const processedContent = await remark()
                                .use(html)
                                .process(matterResult.content);
    const contentHtml = processedContent.toString();


    //combine with id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}