import {
  FaHome,
 
  FaCogs,
  FaCoffee,
  FaIndustry,
  FaUserFriends,
  FaComment
} from "react-icons/fa";
export const getIcon = (iconName) => {
  switch (iconName) {
    case "Dashboard":
      return <FaHome />;

    case "Feedbacks":
      return <FaComment />;

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
