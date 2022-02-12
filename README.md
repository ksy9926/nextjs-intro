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

7. Redirect

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

### 참고

- [영화 API_KEY](https://www.themoviedb.org/)
- [영화 api](https://developers.themoviedb.org/3/getting-started/introduction)
