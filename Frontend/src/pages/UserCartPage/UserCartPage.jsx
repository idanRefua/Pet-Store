import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserCartPage() {
  const user = useSelector((state) => state.auth.userInfo);
  const [userCart, setUserCart] = useState([]);

  return (
    <div className="row">
      <h3 className="d-flex justify-content-center">
        hello,{user.name}, This is your cart
      </h3>
      <div className="products-cart col-sm-8">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse adipisci
          incidunt illum iure, dolorem aspernatur mollitia corporis est tempore,
          possimus assumenda accusantium porro molestias eveniet minus! Possimus
          magni, dolores eum non minus quae aspernatur consectetur sint nulla
          culpa soluta quasi corporis suscipit quis error explicabo dolore quos
          ea expedita. Sed, similique atque accusamus, iusto fugiat quibusdam
          distinctio consectetur ad aliquid facilis sequi consequatur asperiores
          ducimus, voluptate expedita laboriosam dolores labore unde pariatur
          vitae officia! Reprehenderit, quibusdam? Nihil totam atque ex
          aspernatur voluptatem enim blanditiis placeat laudantium debitis.
          Recusandae, natus exercitationem dolorem voluptas sapiente dolorum
          dolores aliquam voluptatum velit nulla fugit!
        </p>
      </div>

      <div className="cart-user-box col-sm-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi pariatur
        eligendi corporis sunt, incidunt laboriosam omnis facere, asperiores
        ducimus labore eaque iste quis molestiae fugiat placeat dolorum
        accusantium quibusdam sed rem nisi veniam culpa. Velit asperiores,
        provident libero distinctio voluptates laboriosam odit hic magni culpa
        minima ipsa consequatur accusamus, tenetur ratione vitae corporis iste
        et. Tempore pariatur laboriosam numquam inventore impedit laborum?
        Doloremque pariatur quidem quis nostrum suscipit sit! Ex ea laborum id
        optio maiores iure cupiditate perferendis odio! At!
      </div>
    </div>
  );
}
