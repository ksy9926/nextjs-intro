1. NextJS 프로젝트 만들기

- typescript를 사용하지 않는 경우 --typescript 를 빼고 입력하면 된다.

```bash
npx create-next-app@latest <project-name> --typescript
```

2. pages

- pages 폴더 안에 생성하는 파일이 곧 페이지가 된다.
- 예를 들어 about.js 파일을 만들어 주면 http://localhost:3000/about 페이지에 해당 파일의 코드가 렌더링된다.
- 이때 파일안의 컴포넌트 이름이 about일 필요는 없으나 반드시 default로 export 해주어야 한다.
- 예외로, index.js 의 경우 기본 페이지로 설정이 된다.

3. routing

- `<a>` 태그를 `<Link>` 태그로 감싸 주어야 한다. href 속성은 Link 태그 안에 들어가며 나머지 스타일이나 속성 등은 a 태그 안에 들어간다.
- useRouter를 이용하여 routing 정보를 얻을 수 있다.

4. styles

- NavBar.module.css 와 같이 css module을 만들어 className을 줄 수 있다.
- 또는, 컴포넌트 내에 ` <style jsx>{``}</style> ` 태그를 만들어 내부에 style을 줄 수도 있다.
- global로 주고 싶은경우 ` <style jsx global>{``}</style> `과 같이 global 속성을 주면 되지만 page별로 적용되기 때문에 전체 페이지에 style을 주기에는 부적절하다.

5. App Component

- global로 style을 주고 싶은 경우 pages 폴더에 \_app.js 파일을 만들면 된다.
- 다른 page를 보기전에 next는 \_app.js를 먼저 확인하고 index.js의 내용물을 렌더링하게 된다.
- 즉 \_app.js 는 하나의 blueprint(청사진)와 같다.
- app.js는 기본적으로 Component, pageProps를 가진다.
- styles 폴더의 globals.css는 다른 곳에서는 import가 불가능하고 오직 \_app.js에서만 가능하다.

6. Patterns

- next/Head 에서 Head를 가져와 쓸 수 있다. Seo.js 등의 파일을 통해 원하는 값을 넣어주면 된다.
- 보통 \_app.js에 많은 코드가 들어가는 것을 좋아하지 않기 때문에 children props를 통해 Layout 등의 컴포넌트로 감싸주게 된다.

7. Redirects

- next.config.js 안에 작성. config 파일을 수정한 경우 다시 재시작해야 적용이 된다.
- 유저가 source로 들어오면 destination으로 보낸다.
- :path를 붙이면 해당 path를 그대로 destination에 보낸다. (ex. /contact/30321 -> /form/30321)
- :path\*를 붙이면 뒤에 오는 모든것을 catch한다. (ex. /contact/123/detail/12 -> /form/123/detail/12)
- permanent: 브라우저나 검색엔진이 이 정보를 기억하는지 여부 결정
- 여러개의 redirect를 사용하고 싶다면 배열안에 새로운 객체를 추가하면 된다.

```js
async redirects() {
  return [
    {
      source: '/contact/:path',
      destination: '/form/:path',
      permanent: false
    }
  ]
}
```

8. Rewrites

- 유저를 redirect 시키긴 하지만 url이 바뀌지는 않는다.
- API_KEY 등 보안상의 이유로 숨기고 싶은 정보가 있을 때 사용한다.

9. Server Side Rendering

- 로딩 인디케이터가 있는 경우 처음 가져오는 html에는 데이터가 들어있지 않은 loading 표시가 나올 것이다. 그러나 누군가는 data가 표시된 이후 렌더링을 원할 수 있다. 그럴때는 getServerSideProps라는 함수를 만들어주면 된다(이름 고정). 이 함수 안의 코드는 client쪽이 아니라 server쪽에서만 작동되는 코드이다.
- 이 함수는 object를 리턴하게 되고 object에는 props라는 key가 들어있다. props에는 원하는 데이터를 아무것이나 넣을 수 있다.
- props에 넣은 데이터는 컴포넌트의 매개변수란에 넣어주면 된다.
- 이를 활용하면 API_KEY 등도 rewrites를 쓰지 않아도 server에서 처리할 수 있게 된다.

10. Dynamic Routes

- 만약 /movies 라는 페이지를 만들고 싶다면 pages 안에 movies.js 라는 파일을 만들어주면 된다.
- 만약 /movies/all 이라는 페이지를 만들고 싶은 경우에는 pages 안에 movies 라는 폴더를 만들고 movies 폴더 안에 all.js 라는 파일을 만들어주면 된다.
- 그리고 /movies 를 movies 폴더 안에 index.js를 만들어주어 나타나게 할 수도 있다.
- 만약 /movies/:id 형태의 페이지를 만들고 싶다면 movies 폴더 안에 [id].js 형태의 파일을 만들면 된다. 이때 id는 원하는 값을 아무거나 넣을 수 있다.
- 만약 /:id 를 포함하는 모든 url을 catch하고 싶다면 [...id].js 형태의 파일을 만들면 된다. 이 경우 id는 이름이 조금 부적절 할 수 있으므로 [...params].js 등의 이름을 써주면 된다.

11. router push masking

- 새로운 페이지로 navigating을 할 때 `<Link>`태그를 사용하는 것 이외에 router.push()를 사용할 수 있다.
- 이 때, 원한다면 url을 숨길 수 있는데 두 번째 인자인 as에 해당 url을 보내면 된다. `<Link>`태그에도 마찬가지로 as 속성을 이용해 url을 masking할 수 있다.

```js
router.push(
  {
    pathname: `/movies/${id}`,
    query: {
      title,
    },
  },
  `/movies/${id}`
);

<Link
  href={{
    pathname: `/movies/${movie.id}`,
    query: {
      title: movie.original_title,
    },
  }}
  as={`/movies/${movie.id}`}
>
  <a>{movie.original_title}</a>
</Link>;
```

### 참고

- [영화 API_KEY](https://www.themoviedb.org/)
- [영화 api](https://developers.themoviedb.org/3/getting-started/introduction)
