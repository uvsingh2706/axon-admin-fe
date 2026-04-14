import { useRoutes } from "react-router-dom";
import { assetRoutes } from "./components/Routes";

const AssetManagement = () => {
  const element = useRoutes(assetRoutes);
  return element;
};

export default AssetManagement;
