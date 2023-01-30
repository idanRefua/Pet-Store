import { useSelector } from "react-redux";
import MyProductsComponent from "../../components/MyProductsComponent/MyProductsComponent";
const data = [];

export default function MyProductsPage() {
  const user = useSelector((state) => state.auth.userInfo);
  return (
    <div>
      <h3 className="">Hello,{user.email},This are all your products</h3>
      <br />
      <MyProductsComponent products={data} />
    </div>
  );
}
