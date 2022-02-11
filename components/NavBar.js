import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav>
      {/* Link 에는 className, style등이 적용되지 않는다. 단지 웹사이트 리로딩을 막는 용도로 href만 사용을 하며 나머지 모든 속성은 a tag를 통해서 적용한다. */}
      <Link href="/">
        <a style={{ color: router.pathname === "/" ? "red" : "blue" }}>Home</a>
      </Link>
      <Link href="/about">
        <a style={{ color: router.pathname === "/about" ? "red" : "blue" }}>About</a>
      </Link>
    </nav>
  );
};

export default NavBar;
