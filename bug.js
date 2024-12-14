In Next.js 15, an uncommon bug can occur when using the new `app` directory and server components with dynamic routes and data fetching.  If your server component attempts to access the `request` object (e.g., for headers or cookies) within a function that's called asynchronously (like within a `Promise` or `async` function) and after the initial response has been sent, it might cause unpredictable behavior or errors.  This is because the `request` object may no longer be available in that context.

```javascript
// pages/api/data.js (server component)
export async function GET(request) {
  const headers = request.headers;
  // ...async operation that takes time...
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log(headers); // May be undefined or throw an error 
  // ...rest of the code...
}
```