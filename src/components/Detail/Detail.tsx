import React from "react";
import { Outlet } from "react-router-dom";

export const Detail = () => {
    return (
        <div>
            <h1>Detail</h1>
            <Outlet />
        </div>
    )
}