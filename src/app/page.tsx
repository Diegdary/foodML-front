import HomePage from './home-page';

// async function getPosts() {
//   const res = await fetch('https://...');
//   const posts = await res.json();
//   return posts
// }
 
export default function Page() {
  // const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  // return <HomePage recentPosts={recentPosts} />
  return <HomePage/>
}