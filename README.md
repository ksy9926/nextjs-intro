1. NextJS 프로젝트 만들기

- typescript를 사용하지 않는 경우 --typescript 를 빼고 입력하면 된다.

```bash
npx create-next-app@latest <project-name> --typescript
```

2. NextJS 에서 page 만들기

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
