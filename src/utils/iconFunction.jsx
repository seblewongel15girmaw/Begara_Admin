import {
  FaHome,
  FaShoppingCart,
  FaBox,
  FaGift,
  FaFileAlt,
  FaCogs,
  FaCoffee,
  FaIndustry,
  FaUserFriends,
  FaLock
} from "react-icons/fa";
export const getIcon = (iconName) => {
  switch (iconName) {
    case "Dashboard":
      return <FaHome />;
   
    case "Order":
      return <FaShoppingCart />;
    case "Package":
      return <FaBox />;
    case "Gift Bag":
      return <FaGift />;
    case "Sticker":
      return <FaFileAlt />;
    case "Coffee":
      return <FaCoffee />;

    case "Setting":
      return <FaCogs />;
    case "ManageBrokers":
      return <FaUserFriends />;
      case "User":
        return <FaUserFriends />;
    case "Admins":
      return <FaIndustry />;
  
    default:
      return null;
  }
};
