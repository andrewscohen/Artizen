import "./Home.css";
import splashImage from "./Header_Dragon_Skeleton.jpg"
import modalImage from "./Header_Hair_Blowing.jpg"

export default function Home({display}) {
  return (
    <>
    {display && <div className="splash-container vertical-center">
        <h1 className="title header">Connecting Communities Through Public Art</h1>
        <div className="subtitle">
          <h3 className="subtitle1">in Austin, <span className="subtitle2">Texas</span></h3>
        </div>
    </div>
    }
    <div className="main home_main">
      {display &&

      <img className="header__img" src={splashImage} alt="Colorful mural with dragon"/>
    }
      {!display &&
      <img className="header__img" src={modalImage} alt="Colorful mural with woman's hair blowing in wind"/>
    }
    </div>
    </>
  );
}
