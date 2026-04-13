import { useRoutes } from "react-router-dom";
import { assetRoutes } from "./Components/Routes";

const AssetManagement = () => {
  const element = useRoutes(assetRoutes);
  return element;
};

export default AssetManagement;