import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Components.css";
//import Search from "./Search";
function Layout() {

    return (
        <div className="container">
            <nav>
                <NavLink className={({ isActive }) => "navLink" + (isActive ? " active" : " inactive")} to="/competitions">Competitions</NavLink>
                <NavLink className={({ isActive }) => "navLink" + (isActive ? " active" : " inactive")} to="/teams">Teams</NavLink>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;