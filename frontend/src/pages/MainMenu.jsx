import Card from "../components/Card/Card";
import { useState, useEffect } from "react";

function MainMenu(){
    const [menuItem, setMenuItem] = useState([])
    useEffect(() => {
      const data = JSON.parse(atob(localStorage.getItem("menuList")));
        setMenuItem(data)
    }, [])
    
    return(
        <div>
            {menuItem.map((item) => (<Card key={item.menu_label} menu_label={item.menu_label} menu_path={item.menu_path} />))}
        </div>
    )
}

export default MainMenu;